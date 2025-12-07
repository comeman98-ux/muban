import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabaseServer";
import {
  SYSTEM_SESSION_COOKIE_NAME,
  parseSystemSession,
  type SystemSession,
} from "@/lib/systemSession";

type LogsPageProps = {
  params: { locale: string };
};

type AuditRow = {
  id: number;
  created_at: string;
  operator_id: number;
  target_user_id: number | null;
  action: string;
  detail: unknown;
};

export default async function SystemAuditLogsPage({ params }: LogsPageProps) {
  const cookieStore = await cookies();
  const rawSession = cookieStore.get(SYSTEM_SESSION_COOKIE_NAME)?.value ?? null;
  const session: SystemSession | null = parseSystemSession(rawSession);

  if (!session || !session.isAdmin) {
    redirect(`/${params.locale}/system`);
  }

  const supabase = createSupabaseServerClient();

  const { data: logs, error } = await supabase
    .from("system_audit_logs")
    .select(
      "id, created_at, operator_id, target_user_id, action, detail",
    )
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) {
    console.error("[system/logs] Failed to load audit logs:", error);
  }

  const userIds = new Set<number>();
  for (const row of logs ?? []) {
    userIds.add(row.operator_id);
    if (row.target_user_id != null) {
      userIds.add(row.target_user_id);
    }
  }

  const idArray = Array.from(userIds);
  const identityMap = new Map<number, string>();

  if (idArray.length > 0) {
    const { data: users } = await supabase
      .from("system_users")
      .select("id, identity_id")
      .in("id", idArray);

    for (const u of users ?? []) {
      identityMap.set(u.id as number, u.identity_id as string);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black px-4 py-24">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <div className="inline-flex items-center px-4 py-1 rounded-full border border-yellow-500/80 bg-yellow-500/10 text-[11px] font-semibold tracking-[0.25em] text-yellow-400 uppercase mb-3">
            内部系统 · 操作日志
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white mb-2">
            审计日志（最近 200 条）
          </h1>
          <p className="text-sm text-gray-400">
            记录所有登录、创建用户、删除用户、重置密码与权限变更操作，仅管理员可见。
          </p>
        </header>

        <div className="rounded-3xl border border-gray-700 bg-black/80 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs md:text-sm text-gray-200">
              <thead className="bg-black/80 border-b border-gray-800">
                <tr className="text-gray-400">
                  <th className="px-4 py-3 text-left whitespace-nowrap">
                    时间
                  </th>
                  <th className="px-4 py-3 text-left whitespace-nowrap">
                    操作人
                  </th>
                  <th className="px-4 py-3 text-left whitespace-nowrap">
                    目标用户
                  </th>
                  <th className="px-4 py-3 text-left whitespace-nowrap">
                    操作类型
                  </th>
                  <th className="px-4 py-3 text-left">详情</th>
                </tr>
              </thead>
              <tbody>
                {(logs ?? []).map((row) => {
                  const operator =
                    identityMap.get(row.operator_id) ??
                    `#${row.operator_id.toString()}`;
                  const target =
                    row.target_user_id == null
                      ? "-"
                      : identityMap.get(row.target_user_id) ??
                        `#${row.target_user_id.toString()}`;

                  const detailText =
                    typeof row.detail === "string"
                      ? row.detail
                      : JSON.stringify(row.detail ?? {});

                  const created = new Date(row.created_at).toLocaleString(
                    "zh-CN",
                    {
                      hour12: false,
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    },
                  );

                  return (
                    <tr
                      key={row.id}
                      className="border-b border-gray-800 last:border-transparent"
                    >
                      <td className="px-4 py-2 align-top whitespace-nowrap text-gray-300">
                        {created}
                      </td>
                      <td className="px-4 py-2 align-top whitespace-nowrap">
                        {operator}
                      </td>
                      <td className="px-4 py-2 align-top whitespace-nowrap">
                        {target}
                      </td>
                      <td className="px-4 py-2 align-top whitespace-nowrap">
                        {row.action}
                      </td>
                      <td className="px-4 py-2 align-top">
                        <pre className="whitespace-pre-wrap break-words text-[11px] md:text-xs text-gray-400">
                          {detailText}
                        </pre>
                      </td>
                    </tr>
                  );
                })}
                {logs?.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-6 text-center text-gray-500"
                    >
                      暂无日志记录。
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
