import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabaseServer";
import {
  SYSTEM_SESSION_COOKIE_NAME,
  parseSystemSession,
} from "@/lib/systemSession";
import { logAuditEvent } from "@/lib/systemAudit";

export async function PATCH(
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
      { success: false, message: "仅管理员可以修改身份" },
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

  const body = await request.json();
  const updates: Record<string, unknown> = {};

  if (typeof body.isActive === "boolean") {
    updates.is_active = body.isActive;
  }
  if (typeof body.canAccessDocs === "boolean") {
    updates.can_access_docs = body.canAccessDocs;
  }
  if (typeof body.canAccessCourses === "boolean") {
    updates.can_access_courses = body.canAccessCourses;
  }
  if (typeof body.role === "string") {
    updates.role = body.role;
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json(
      { success: false, message: "没有需要更新的字段" },
      { status: 400 },
    );
  }

  const { data: before, error: beforeError } = await supabase
    .from("system_users")
    .select("id, identity_id, is_active, can_access_docs, can_access_courses, role")
    .eq("id", userId)
    .maybeSingle();

  if (beforeError || !before) {
    return NextResponse.json(
      { success: false, message: "找不到该用户" },
      { status: 404 },
    );
  }

  const { data, error } = await supabase
    .from("system_users")
    .update(updates)
    .eq("id", userId)
    .select(
      "id, identity_id, is_active, created_at, last_login_at, can_access_docs, can_access_courses",
    )
    .maybeSingle();

  if (error || !data) {
    console.error("[system/users] Failed to update user:", error);
    return NextResponse.json(
      { success: false, message: "更新失败，请稍后重试" },
      { status: 500 },
    );
  }

  const changes: Record<string, { from: unknown; to: unknown }> = {};
  if ("is_active" in updates) {
    changes.is_active = {
      from: before.is_active,
      to: updates.is_active,
    };
  }
  if ("can_access_docs" in updates) {
    changes.can_access_docs = {
      from: before.can_access_docs,
      to: updates.can_access_docs,
    };
  }
  if ("can_access_courses" in updates) {
    changes.can_access_courses = {
      from: before.can_access_courses,
      to: updates.can_access_courses,
    };
  }
  if ("role" in updates) {
    changes.role = {
      from: before.role,
      to: updates.role,
    };
  }

  await logAuditEvent(supabase, {
    operatorId: session.userId,
    targetUserId: data.id,
    action:
      "role" in updates
        ? "update_role"
        : "is_active" in updates
          ? "update_status"
          : "update_permission",
    detail: {
      identity_id: data.identity_id,
      changes,
    },
  });

  return NextResponse.json({ success: true, user: data });
}

export async function DELETE(
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
      { success: false, message: "仅管理员可以删除身份" },
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

  const { data: before, error: beforeError } = await supabase
    .from("system_users")
    .select(
      "id, identity_id, is_active, can_access_docs, can_access_courses",
    )
    .eq("id", userId)
    .maybeSingle();

  if (beforeError || !before) {
    return NextResponse.json(
      { success: false, message: "找不到该用户" },
      { status: 404 },
    );
  }

  const { error } = await supabase.from("system_users").delete().eq("id", userId);

  if (error) {
    console.error("[system/users] Failed to delete user:", error);
    return NextResponse.json(
      { success: false, message: "删除失败，请稍后重试" },
      { status: 500 },
    );
  }

  await logAuditEvent(supabase, {
    operatorId: session.userId,
    targetUserId: before.id,
    action: "delete_user",
    detail: {
      identity_id: before.identity_id,
      is_active: before.is_active,
      can_access_docs: before.can_access_docs,
      can_access_courses: before.can_access_courses,
    },
  });

  return NextResponse.json({ success: true });
}
