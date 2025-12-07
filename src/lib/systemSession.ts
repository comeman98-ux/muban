export const SYSTEM_SESSION_COOKIE_NAME = "fx_system_session";

export type SystemSession = {
  userId: number;
  identityId: string;
  canAccessDocs: boolean;
  canAccessCourses: boolean;
  /**
   * Whether this user is considered an administrator for
   * accessing management and audit-log features.
   */
  isAdmin?: boolean;
};

export function serializeSystemSession(session: SystemSession): string {
  return JSON.stringify(session);
}

export function parseSystemSession(
  raw: string | undefined | null,
): SystemSession | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (
      typeof parsed !== "object" ||
      parsed === null ||
      typeof parsed.userId !== "number" ||
      typeof parsed.identityId !== "string"
    ) {
      return null;
    }

   return {
  userId: parsed.userId,
  identityId: parsed.identityId,
  canAccessDocs: Boolean(parsed.canAccessDocs),
  canAccessCourses: Boolean(parsed.canAccessCourses),
  // 注意：这里要读的是 isAdmin（和登录时写入的字段一致）
  isAdmin: Boolean(parsed.isAdmin),
};

  } catch {
    return null;
  }
}

/**
 * Simple helper for determining whether an identity is treated as admin.
 * This is intentionally minimal and can be replaced by a real role system later.
 */
export function isAdminIdentity(identityId: string): boolean {
  return identityId === "Fulizhe";
}
/**
 * 从 cookie 里的值生成前端用的 currentUser
 * rawCookieValue 是没有名字的那一半，例如 "xxxxxx"
 */
export function makeCurrentUser(
  rawCookieValue: string | undefined | null,
): { identityId: string; isAdmin: boolean } | null {
  if (!rawCookieValue) return null;

  try {
    // cookie 里的值是 URL 编码过的，要先解码
    const decoded = decodeURIComponent(rawCookieValue);
    const session = parseSystemSession(decoded);
    if (!session) return null;

    return {
      identityId: session.identityId,
      isAdmin: Boolean(session.isAdmin),
    };
  } catch {
    return null;
  }
}
