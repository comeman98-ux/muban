import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabaseServer";

export async function POST(request: NextRequest) {
  const { identityId } = await request.json();

  if (!identityId) {
    return NextResponse.json(
      { success: false, message: "缺少 identityId 参数" },
      { status: 400 },
    );
  }

  let supabase;
  try {
    supabase = createSupabaseServerClient();
  } catch (error) {
    console.error("[system/users/delete] Failed to create Supabase client:", error);
    return NextResponse.json(
      { success: false, message: "服务器配置错误" },
      { status: 500 },
    );
  }

  // 先根据 identity_id 找到用户
  const { data: user, error: fetchError } = await supabase
    .from("system_users")
    .select("id, identity_id")
    .eq("identity_id", identityId)
    .maybeSingle();

  if (fetchError) {
    console.error("[system/users/delete] Supabase query error:", fetchError);
    return NextResponse.json(
      { success: false, message: "查询用户失败" },
      { status: 500 },
    );
  }

  if (!user) {
    return NextResponse.json(
      { success: false, message: "未找到该身份" },
      { status: 404 },
    );
  }

  // 执行删除
  const { error: deleteError } = await supabase
    .from("system_users")
    .delete()
    .eq("id", user.id);

  if (deleteError) {
    console.error("[system/users/delete] Supabase delete error:", deleteError);
    return NextResponse.json(
      { success: false, message: "删除数据库失败" },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}
