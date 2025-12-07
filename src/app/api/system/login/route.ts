import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createSupabaseServerClient } from "@/lib/supabaseServer";
import {
  SYSTEM_SESSION_COOKIE_NAME,
  isAdminIdentity,
  serializeSystemSession,
} from "@/lib/systemSession";
import { logAuditEvent } from "@/lib/systemAudit";

export async function POST(request: NextRequest) {
  const { identityId, password } = await request.json();

  if (!identityId || !password) {
    return NextResponse.json(
      { success: false, message: "缺少参数" },
      { status: 400 },
    );
  }

  let supabase;
  try {
    supabase = createSupabaseServerClient();
  } catch (error) {
    console.error("[system/login] Failed to create Supabase client:", error);
    return NextResponse.json(
      { success: false, message: "服务器配置错误" },
      { status: 500 },
    );
  }

  const { data, error } = await supabase
    .from("system_users")
    .select(
      "id, identity_id, password_hash, is_active, can_access_docs, can_access_courses",
    )
    .eq("identity_id", identityId)
    .maybeSingle();

  if (error) {
    console.error("[system/login] Supabase query error:", error);
    return NextResponse.json(
      { success: false, message: "登录服务暂时不可用" },
      { status: 500 },
    );
  }

  if (!data) {
    return NextResponse.json(
      { success: false, message: "ID 或密码错误" },
      { status: 401 },
    );
  }

  if (!data.is_active) {
    return NextResponse.json(
      { success: false, message: "账号已被禁用" },
      { status: 403 },
    );
  }

  const ok = await bcrypt.compare(password, data.password_hash);

  if (!ok) {
    return NextResponse.json(
      { success: false, message: "ID 或密码错误" },
      { status: 401 },
    );
  }

  const ip =
    request.headers.get("x-forwarded-for") ||
    request.headers.get("x-real-ip") ||
    undefined;
  const userAgent = request.headers.get("user-agent") || undefined;

  const nowIso = new Date().toISOString();

  // 更新 last_login_at 与写入审计日志（失败时不阻断登录）
  void supabase
    .from("system_users")
    .update({ last_login_at: nowIso })
    .eq("id", data.id)
    .then(({ error: updateError }) => {
      if (updateError) {
        console.error(
          "[system/login] Failed to update last_login_at:",
          updateError,
        );
      }
    });

  void logAuditEvent(supabase, {
    operatorId: data.id,
    targetUserId: data.id,
    action: "login",
    detail: {
      identity_id: data.identity_id,
      ip,
      userAgent,
    },
  });

  const sessionPayload = {
    userId: data.id,
    identityId: data.identity_id,
    canAccessDocs: Boolean(data.can_access_docs),
    canAccessCourses: Boolean(data.can_access_courses),
    isAdmin: isAdminIdentity(data.identity_id),
  };

  const response = NextResponse.json({ success: true });

    response.cookies.set(
    SYSTEM_SESSION_COOKIE_NAME,
    serializeSystemSession(sessionPayload),
    {
      // 先不要 httpOnly，这样前端 document.cookie 能读到
      // httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 4, // 4 hours
    },
  );


  return response;
}
