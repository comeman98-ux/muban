// SystemSession.ts
// 用来描述“当前登录用户”的结构，以及从数据库数据生成 currentUser

export type SystemSession = {
  id: string;              // 身份 ID
  identityId: string;      // identity_id
  isActive: boolean;       // 是否启用
  canAccessDocs: boolean;  // 资料权限
  canAccessCourses: boolean; // 课程权限
  isAdmin: boolean;        // ⭐ 管理员标记（关键）
};

// data 一般就是 Supabase 查询返回的那一行
export function makeCurrentUser(data: any): SystemSession {
  return {
    id: String(data.identity_id ?? ""),
    identityId: data.identity_id ?? "",
    isActive: Boolean(data.is_active),
    canAccessDocs: Boolean(data.can_access_docs),
    canAccessCourses: Boolean(data.can_access_courses),
    isAdmin: Boolean(data.is_admin),   // ⭐ 从 is_admin 转成布尔值
  };
}
