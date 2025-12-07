import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createSupabaseServerClient } from "@/lib/supabaseServer";
import {
  SYSTEM_SESSION_COOKIE_NAME,
  parseSystemSession,
} from "@/lib/systemSession";
import { logAuditEvent } from "@/lib/systemAudit";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const supabase = createSupabaseServerClient();
  const rawSession =
    request.cookies.get(SYSTEM_SESSION_COOKIE_NAME)?.value ?? null;
  const session = parseSystemSession(rawSession);

  if (!session || !session.isAdmin) {
    return NextResponse.json(
      { success: false, message: "仅管理员可以重置密码" },
      { status: 403 },
    );
  }

  const userId = Number(id);
  if (!Number.isFinite(userId)) {
    return NextResponse.json(
      { success: false, message: "无效的用户 ID" },
      { status: 400 },
    );
  }

  const { password } = await request.json();
  if (!password) {
    return NextResponse.json(
      { success: false, message: "缺少新密码" },
      { status: 400 },
    );
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const { data, error } = await supabase
    .from("system_users")
    .update({ password_hash: passwordHash })
    .eq("id", userId)
    .select("id, identity_id")
    .maybeSingle();

  if (error || !data) {
    console.error("[system/users] Failed to reset password:", error);
    return NextResponse.json(
      { success: false, message: "重置密码失败，请稍后重试" },
      { status: 500 },
    );
  }

  await logAuditEvent(supabase, {
    operatorId: session.userId,
    targetUserId: data.id,
    action: "reset_password",
    detail: {
      identity_id: data.identity_id,
      note: "密码已被重置",
    },
  });

  return NextResponse.json({ success: true });
}
