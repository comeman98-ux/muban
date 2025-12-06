import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createSupabaseServerClient } from "@/lib/supabaseServer";

const SESSION_COOKIE_NAME = "fx_system_session";

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
    .select("id, identity_id, password_hash, is_active")
    .eq("identity_id", identityId)
    .eq("is_active", true)
    .maybeSingle();

  if (error || !data) {
    console.error("[system/login] Supabase query error:", error);
    return NextResponse.json(
      { success: false, message: "ID 或密码错误" },
      { status: 401 },
    );
  }

  const ok = await bcrypt.compare(password, data.password_hash);

  if (!ok) {
    return NextResponse.json(
      { success: false, message: "ID 或密码错误" },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ success: true });

  // 可选：设置一个简单的 session cookie，后续可扩展为真正的会话管理
  response.cookies.set(SESSION_COOKIE_NAME, "active", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 4, // 4 hours
  });

  return response;
}
