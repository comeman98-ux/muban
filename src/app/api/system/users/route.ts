import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createSupabaseServerClient } from "@/lib/supabaseServer";
import {
  SYSTEM_SESSION_COOKIE_NAME,
  parseSystemSession,
} from "@/lib/systemSession";
import { logAuditEvent } from "@/lib/systemAudit";

export async function POST(request: NextRequest) {
  const supabase = createSupabaseServerClient();
  const rawSession =
    request.cookies.get(SYSTEM_SESSION_COOKIE_NAME)?.value ?? null;
  const session = parseSystemSession(rawSession);

  if (!session || !session.isAdmin) {
    return NextResponse.json(
      { success: false, message: "仅管理员可以新增身份" },
      { status: 403 },
    );
  }

  const { identityId, password } = await request.json();

  if (!identityId || !password) {
    return NextResponse.json(
      { success: false, message: "缺少身份 ID 或密码" },
      { status: 400 },
    );
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const { data, error } = await supabase
    .from("system_users")
    .insert({
      identity_id: identityId,
      password_hash: passwordHash,
      is_active: true,
      can_access_docs: false,
      can_access_courses: false,
    })
    .select(
      "id, identity_id, is_active, created_at, last_login_at, can_access_docs, can_access_courses",
    )
    .maybeSingle();

  if (error || !data) {
    console.error("[system/users] Failed to create user:", error);
    return NextResponse.json(
      { success: false, message: "创建身份失败，请检查是否重复或稍后重试" },
      { status: 500 },
    );
  }

  await logAuditEvent(supabase, {
    operatorId: session.userId,
    targetUserId: data.id,
    action: "create_user",
    detail: {
      identity_id: data.identity_id,
      can_access_docs: data.can_access_docs,
      can_access_courses: data.can_access_courses,
    },
  });

  return NextResponse.json({ success: true, user: data });
}

