// src/app/api/system/users/reset-password/route.ts
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createSupabaseServerClient } from "@/lib/supabaseServer";

export async function POST(req: NextRequest) {
  const { identityId } = await req.json();

  if (!identityId) {
    return NextResponse.json({ success: false, message: "缺少 ID" }, { status: 400 });
  }

  const supabase = createSupabaseServerClient();

  // 生成新密码
  const newPassword = Math.random().toString(36).slice(-8);
  const hash = await bcrypt.hash(newPassword, 10);

  // 更新数据库
  const { error } = await supabase
    .from("system_users")
    .update({ password_hash: hash })
    .eq("identity_id", identityId);

  if (error) {
    return NextResponse.json({ success: false, message: "更新失败" }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    newPassword,
  });
}
