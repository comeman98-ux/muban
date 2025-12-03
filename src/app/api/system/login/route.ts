import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createClient } from "@supabase/supabase-js";

const SESSION_COOKIE_NAME = "fx_system_session";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error(
    "[system/login] Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars",
  );
}

const supabase =
  supabaseUrl && supabaseServiceRoleKey
    ? createClient(supabaseUrl, supabaseServiceRoleKey)
    : null;

export async function POST(request: NextRequest) {
  const { identityId, password } = await request.json();

  if (!identityId || !password) {
    return NextResponse.json(
      { error: "Missing credentials" },
      { status: 400 },
    );
  }

  if (!supabase) {
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 },
    );
  }

  // 从数据库中查找对应的内部账号
  const { data, error } = await supabase
    .from("system_users")
    .select("password_hash, is_active")
    .eq("identity_id", identityId)
    .maybeSingle();

  if (error) {
    console.error("[system/login] Supabase query error:", error);
    return NextResponse.json(
      { error: "Database error" },
      { status: 500 },
    );
  }

  if (!data || !data.is_active) {
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 },
    );
  }

  const ok = await bcrypt.compare(password, data.password_hash);
  if (!ok) {
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ ok: true });

  response.cookies.set(SESSION_COOKIE_NAME, "active", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 4, // 4 hours
  });

  return response;
}
