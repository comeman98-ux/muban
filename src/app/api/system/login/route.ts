import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import bcrypt from "bcryptjs";

const SESSION_COOKIE_NAME = "fx_system_session";

export async function POST(request: NextRequest) {
  const { identityId, password } = await request.json();

  if (!identityId || !password) {
    return NextResponse.json(
      { error: "Missing credentials" },
      { status: 400 },
    );
  }

  // 从数据库中查找对应的内部账号
  const { rows } =
    await sql`SELECT password_hash, is_active FROM system_users WHERE identity_id = ${identityId}`;

  if (rows.length === 0 || !rows[0].is_active) {
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 },
    );
  }

  const user = rows[0];

  const ok = await bcrypt.compare(password, user.password_hash);
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
