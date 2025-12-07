import type { SupabaseClient } from "@supabase/supabase-js";

type AuditAction =
  | "login"
  | "create_user"
  | "delete_user"
  | "reset_password"
  | "update_status"
  | "update_permission"
  | "update_role";

interface AuditEvent {
  operatorId: number;
  targetUserId?: number | null;
  action: AuditAction | (string & {});
  detail?: unknown;
}

export async function logAuditEvent(
  supabase: SupabaseClient,
  event: AuditEvent,
): Promise<void> {
  try {
    await supabase.from("system_audit_logs").insert({
      operator_id: event.operatorId,
      target_user_id: event.targetUserId ?? null,
      action: event.action,
      detail: event.detail ?? null,
    });
  } catch (error) {
    console.error("[system/audit] Failed to log audit event:", error);
  }
}
