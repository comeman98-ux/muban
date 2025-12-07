"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import type { SystemSession } from "@/lib/systemSession";

type TabKey = "resources" | "courses" | "satellite";
type MainView = "system" | "identity";

type SystemUserLite = {
  id: number;
  identity_id: string;
  is_active: boolean;
  created_at: string;
  last_login_at: string | null;
  can_access_docs: boolean;
  can_access_courses: boolean;
  role: string | null;
  is_admin: boolean;
};

type InternalSystemClientProps = {
  locale: string;
  users: SystemUserLite[] | null;
  currentUser: SystemSession;
};

const tabs: { key: TabKey; label: string }[] = [
  { key: "resources", label: "资料系统" },
  { key: "courses", label: "课程系统" },
  { key: "satellite", label: "卫星系统" },
];

interface Lesson {
  id: number;
  title: string;
  phase: string;
  locked?: boolean;
}

const courseLessons: Lesson[] = [
  { id: 1, title: "第 1 课 · 常识", phase: "第一阶段 · 基础课程" },
  { id: 2, title: "第 2 课 · 路径", phase: "第一阶段 · 基础课程", locked: true },
  { id: 3, title: "第 3 课 · 法门", phase: "第一阶段 · 基础课程", locked: true },
  { id: 4, title: "第 4 课 · 技巧", phase: "第一阶段 · 基础课程", locked: true },
  { id: 5, title: "第 5 课 · 精进", phase: "第一阶段 · 基础课程", locked: true },
];

interface IdentityRecord {
  id: number;
  identityId: string;
  note: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  lastLoginAt: string | null;
  canAccessDocs: boolean;
  canAccessCourses: boolean;
}

function formatDate(value: string | null | undefined) {
  if (!value) return "-";
  return dayjs(value).format("YYYY/MM/DD HH:mm:ss");
}

export default function InternalSystemClient({
  locale,
  users,
  currentUser,
}: InternalSystemClientProps) {
  const router = useRouter();

  const [view, setView] = useState<MainView>("system");
  const [activeTab, setActiveTab] = useState<TabKey>("courses");
  const [activeCourseId, setActiveCourseId] = useState<number>(1);
  const [now, setNow] = useState<Date>(() => new Date());
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [ytKey, setYtKey] = useState(0);
  const [identities, setIdentities] = useState<IdentityRecord[]>(() =>
    (users ?? []).map((user) => ({
      id: user.id,
      identityId: user.identity_id,
      note: "",
      role: user.role ?? "在训人员",
      isActive: user.is_active,
      createdAt: user.created_at,
      lastLoginAt: user.last_login_at,
      canAccessDocs: user.can_access_docs,
      canAccessCourses: user.can_access_courses,
    })),
  );

  const isAdmin = Boolean(currentUser.isAdmin);

  const handleOpenIdentityManagement = () => {
    if (!isAdmin) {
      alert("仅管理员可以访问身份管理。");
      return;
    }
    setView("identity");
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!autoRefresh) return;
    const id = setInterval(() => {
      setYtKey((k) => k + 1);
    }, 30000);
    return () => clearInterval(id);
  }, [autoRefresh]);

  const activeCourse =
    courseLessons.find((l) => l.id === activeCourseId) ?? courseLessons[0];

  const updateIdentity = (id: number, patch: Partial<IdentityRecord>) => {
    setIdentities((prev) =>
      prev.map((row) => (row.id === id ? { ...row, ...patch } : row)),
    );
  };

  const handleAddIdentity = async () => {
    const identityId = window.prompt("请输入新身份 ID");
    if (!identityId) return;

    const password = window.prompt("请输入初始密码");
    if (!password) return;

    try {
      const res = await fetch("/api/system/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identityId, password }),
      });

      const data = await res.json();
      if (!res.ok || !data?.success) {
        alert(data?.message || "新增身份失败，请稍后重试。");
        return;
      }

      const user = data.user as SystemUserLite;
      setIdentities((prev) => [
        ...prev,
        {
          id: user.id,
          identityId: user.identity_id,
          note: "",
          role: user.role ?? "在训人员",
          isActive: user.is_active,
          createdAt: user.created_at,
          lastLoginAt: user.last_login_at,
          canAccessDocs: user.can_access_docs,
          canAccessCourses: user.can_access_courses,
        },
      ]);
    } catch {
      alert("新增身份失败，请检查网络后重试。");
    }
  };

  const handleToggleField = async (
    row: IdentityRecord,
    field: "isActive" | "canAccessDocs" | "canAccessCourses",
    value: boolean,
  ) => {
    const previous = { ...row };
    updateIdentity(row.id, { [field]: value } as Partial<IdentityRecord>);

    try {
      const res = await fetch(`/api/system/users/${row.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          isActive: field === "isActive" ? value : undefined,
          canAccessDocs: field === "canAccessDocs" ? value : undefined,
          canAccessCourses: field === "canAccessCourses" ? value : undefined,
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.success) {
        updateIdentity(row.id, previous);
        alert(data?.message || "更新失败，请稍后重试。");
      }
    } catch {
      updateIdentity(row.id, previous);
      alert("更新失败，请检查网络后重试。");
    }
  };

  const handleDeleteIdentity = async (row: IdentityRecord) => {
    if (!window.confirm(`确定要删除身份 ${row.identityId} 吗？该操作不可恢复。`)) {
      return;
    }

    const previous = identities;
    setIdentities((prev) => prev.filter((x) => x.id !== row.id));

    try {
      const res = await fetch(`/api/system/users/${row.id}`, {
        method: "DELETE",
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.success) {
        setIdentities(previous);
        alert(data?.message || "删除失败，请稍后重试。");
      }
    } catch {
      setIdentities(previous);
      alert("删除失败，请检查网络后重试。");
    }
  };

  const handleResetPassword = async (row: IdentityRecord) => {
    const newPassword = window.prompt(
      `请为身份 ${row.identityId} 输入新的密码（不会在日志中记录明文）：`,
    );
    if (!newPassword) return;

    try {
      const res = await fetch(`/api/system/users/${row.id}/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: newPassword }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.success) {
        alert(data?.message || "重置密码失败，请稍后重试。");
        return;
      }
      alert("密码已重置，请妥善通知该学员新的登录密码。");
    } catch {
      alert("重置密码失败，请检查网络后重试。");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black px-4 py-24">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center px-5 py-1 rounded-full border border-yellow-500/70 bg-yellow-500/10 text-xs tracking-[0.2em] uppercase text-yellow-400 mb-4">
              利来者训练计划 · 内部系统
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-2">
              内部训练系统
            </h1>
            <p className="text-sm md:text-base text-gray-400 max-w-xl">
              好好学习，天天向上。在这里统一完成资料阅读、课程训练和卫星系统对接。
            </p>
          </div>
          <div className="flex flex-col items-end gap-2 text-xs text-gray-400">
            <div>
              当前身份：
              <span className="font-mono text-yellow-300">
                {currentUser.identityId}
              </span>
              {currentUser.isAdmin && (
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full border border-yellow-500/60 text-[10px] text-yellow-300">
                  管理员
                </span>
              )}
            </div>
            <div className="flex gap-3 md:justify-end">
              <button
                type="button"
                onClick={handleOpenIdentityManagement}
                disabled={!isAdmin}
                className={[
                  "px-4 py-2 text-sm font-semibold rounded-md border border-yellow-500/80",
                  view === "identity"
                    ? "bg-yellow-500 text-black hover:bg-yellow-400"
                    : "bg-yellow-500/10 text-yellow-300 hover:bg-yellow-400 hover:text-black",
                  !isAdmin ? "opacity-60 cursor-not-allowed" : "",
                ].join(" ")}
              >
                身份管理
              </button>
              <button
                className="px-4 py-2 text-sm font-semibold rounded-md border border-gray-600 text-gray-100 hover:bg-gray-900"
                onClick={() => router.push(`/${locale}/system/login`)}
              >
                退出登录
              </button>
            </div>
          </div>
        </header>

        {view === "system" && (
          <>
            <div className="flex justify-center mb-8">
              <div className="inline-flex rounded-full bg-black border border-gray-700 px-1 py-1 w-full max-w-3xl">
                {tabs.map((tab) => {
                  const selected = activeTab === tab.key;
                  return (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={() => setActiveTab(tab.key)}
                      className={[
                        "flex-1 px-4 py-2 text-sm md:text-base font-semibold rounded-full transition-colors whitespace-nowrap",
                        selected
                          ? "bg-yellow-500 text-black shadow-[0_0_25px_rgba(234,179,8,0.6)]"
                          : "bg-transparent text-gray-400 hover:text-white hover:bg-gray-900",
                      ].join(" ")}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {activeTab === "resources" && (
              <main className="rounded-[32px] border border-gray-700 bg-black/60 px-4 py-6 md:px-8 md:py-8 space-y-6">
                {!(isAdmin || currentUser.canAccessDocs) ? (
                  <div className="rounded-2xl border border-red-500/60 bg-red-500/10 px-4 py-4 text-sm text-red-200">
                    当前身份暂无访问「资料系统」的权限，请联系管理员为你开通
                    can_access_docs 权限。
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      资料系统 · 学习路径
                    </h2>
                    <p className="text-sm text-gray-400 mb-6">
                      按照步骤逐个完成，系统会在课程和评估环节中用到这些资料中的内容。
                    </p>
                    <div className="grid gap-4 md:grid-cols-2">
                      <ResourceStepCard
                        stepLabel="STEP 01"
                        title="系统结构图与规则总览"
                        items={[
                          "完整阅读系统结构图与规则文档。",
                          "标出看不懂的地方，准备在答疑时提问。",
                          "用一段话总结你理解的“系统核心”。",
                        ]}
                      />
                      <ResourceStepCard
                        stepLabel="STEP 02"
                        title="风险与资金管理手册"
                        items={[
                          "梳理所有风险参数：单笔风险、日内风险、回撤上限。",
                          "根据自己的资金情况，写出一份个人风险配置。",
                        ]}
                      />
                    </div>
                  </>
                )}
              </main>
            )}

            {activeTab === "courses" && (
              <main className="rounded-[32px] border border-gray-700 bg-black/60 px-4 py-6 md:px-8 md:py-8">
                <header className="text-center mb-8">
                  <p className="text-xs font-semibold tracking-[0.3em] text-yellow-400 mb-2">
                    内部课程
                  </p>
                  <h2 className="text-2xl md:text-3xl font-black text-white mb-2">
                    请按顺序完成内部课程学习并按时提交作业
                  </h2>
                  <p className="text-sm text-gray-400">
                    先完成基础规则，再进入进阶与高级模块。切勿跳课或跨阶段训练。
                  </p>
                </header>

                <div className="grid gap-6 md:grid-cols-[260px,minmax(0,1fr)] items-start">
                  <aside className="space-y-4">
                    <div className="rounded-2xl border border-gray-700 bg-black/60 p-4">
                      <p className="text-xs text-yellow-400 font-semibold mb-2">
                        第一阶段 · 基础课程
                      </p>
                      <div className="space-y-2">
                        {courseLessons.map((lesson) => {
                          const selected = lesson.id === activeCourseId;
                          return (
                            <button
                              key={lesson.id}
                              type="button"
                              disabled={lesson.locked}
                              onClick={() =>
                                !lesson.locked && setActiveCourseId(lesson.id)
                              }
                              className={[
                                "w-full flex items-center justify-between rounded-xl border px-3 py-2 text-sm transition-colors",
                                selected
                                  ? "border-yellow-500 bg-yellow-500/10 text-yellow-50"
                                  : "border-gray-700 bg-black/60 hover:border-yellow-500/60 hover:bg-yellow-500/5",
                                lesson.locked ? "opacity-50 cursor-not-allowed" : "",
                              ].join(" ")}
                            >
                              <span className="text-gray-100">
                                {lesson.title}
                              </span>
                              <span className="text-xs text-gray-400">
                                {lesson.locked ? "尚未解锁" : "进行中"}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </aside>

                  <section className="rounded-2xl border border-gray-700 bg-black/60 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg md:text-xl font-bold text-white">
                          当前课程 · {activeCourse.title}
                        </h3>
                        <p className="text-xs text-gray-400 mt-1">
                          根据当前训练进度，完成对应课时的阅读与思考任务。
                        </p>
                      </div>
                      <div className="hidden md:block text-xs text-gray-400">
                        北京时间：
                        <span className="font-mono text-yellow-300">
                          {now.toLocaleString("zh-CN", {
                            hour12: false,
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-200 space-y-3 leading-relaxed">
                      <p>
                        本课从「系统观」出发，帮助你建立对交易训练的整体认知框架。我们不会讨论任何具体的“买卖点技巧”，而是聚焦在：你究竟要成为什么样的交易者。
                      </p>
                      <p>
                        请在阅读后，用 10–15 分钟写下你目前对“职业交易”的想象，包括：你的日常生活节奏、收入结构、心理状态，以及你愿意为此付出的代价。
                      </p>
                    </div>
                  </section>
                </div>
              </main>
            )}

            {activeTab === "satellite" && (
              <main className="grid gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.1fr)]">
                <section className="rounded-3xl border border-gray-700 bg-black/80 p-6 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="inline-flex items-center px-4 py-1 rounded-full border border-yellow-500/80 bg-yellow-500/10 text-[11px] font-semibold tracking-[0.25em] text-yellow-400 uppercase mb-2">
                        内部卫星系统
                      </div>
                      <h2 className="text-xl md:text-2xl font-bold text-white">
                        实时数据 · 卫星对接
                      </h2>
                      <p className="text-sm text-gray-400 mt-1 max-w-md">
                        通过内部卫星系统，实时监控市场波动与策略表现。请仅在训练计划允许的时间段内使用。
                      </p>
                    </div>
                    <label className="inline-flex items-center gap-2 text-xs text-gray-300">
                      <span>自动刷新</span>
                      <input
                        type="checkbox"
                        checked={autoRefresh}
                        onChange={(e) => setAutoRefresh(e.target.checked)}
                        className="h-4 w-4 rounded border-gray-600 bg-black text-yellow-400 focus:ring-yellow-500/80"
                      />
                    </label>
                  </div>
                  <div className="flex-1 rounded-2xl border border-gray-800 bg-black/60 overflow-hidden">
                    <iframe
                      key={ytKey}
                      src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&mute=1"
                      title="内部卫星系统 · 实时监控"
                      className="w-full aspect-video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                </section>

                <section className="rounded-3xl border border-gray-700 bg-black/80 p-6 flex flex-col">
                  <h3 className="text-lg md:text-xl font-bold text-white mb-3">
                    卫星系统 · 使用守则
                  </h3>
                  <div className="flex-1 rounded-2xl border border-gray-800 bg-black/60 p-4 text-sm text-gray-200 leading-relaxed space-y-3">
                    <p>
                      卫星系统仅作为训练与监控工具，不构成任何形式的交易建议。所有实际下单行为必须符合你的资金管理规则与风险承受能力。
                    </p>
                    <p>
                      请避免长时间盯盘导致的情绪过度波动。建议每次使用时设置固定的时间窗口，例如：30
                      分钟或 60 分钟，结束后必须离开屏幕休息。
                    </p>
                  </div>
                </section>
              </main>
            )}
          </>
        )}

        {view === "identity" && (
          <main className="space-y-6">
            <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-4">
              <div>
                <div className="inline-flex items-center px-4 py-1 rounded-full border border-yellow-500/80 bg-yellow-500/10 text-[11px] font-semibold tracking-[0.25em] text-yellow-400 uppercase mb-2">
                  内部系统 · 身份管理
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-white mb-1">
                  学员身份与权限管理
                </h2>
                <p className="text-sm md:text-base text-gray-400 max-w-2xl">
                  管理内部身份 ID、启用状态以及资料 / 课程权限。所有操作会记录到审计日志。
                </p>
              </div>
              <div className="flex flex-col items-start md:items-end gap-2 text-xs text-gray-400">
                <div>
                  当前时间（北京时间）：{" "}
                  <span className="font-mono text-yellow-300">
                    {now.toLocaleString("zh-CN", {
                      hour12: false,
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </header>

            <section className="rounded-3xl border border-gray-700 bg-black/80 overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
                <span className="text-xs md:text-sm text-gray-400">
                  共 {identities.length} 条身份记录
                </span>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => router.push(`/${locale}/system/logs`)}
                    className="px-4 py-2 text-xs md:text-sm font-semibold rounded-full border border-yellow-500/80 bg-yellow-500/10 text-yellow-300 hover:bg-yellow-500/30"
                  >
                    操作日志
                  </button>
                  <button
                    type="button"
                    onClick={() => setView("system")}
                    className="px-4 py-2 text-xs md:text-sm font-semibold rounded-full border border-gray-500 bg-black text-gray-100 hover:bg-gray-900"
                  >
                    返回系统
                  </button>
                  {currentUser.isAdmin && (
                    <button
                      type="button"
                      onClick={handleAddIdentity}
                      className="px-4 py-2 text-xs md:text-sm font-semibold rounded-full border border-yellow-500/80 bg-yellow-500 text-black hover:bg-yellow-400"
                    >
                      新增身份
                    </button>
                  )}
                </div>
              </div>

              <div className="px-4 md:px-6 pb-4">
                <div className="hidden md:flex items-center text-xs text-gray-400 py-3 border-b border-gray-800">
                  <div className="flex-[1.4]">身份 ID</div>
                  <div className="flex-[1.2]">备注</div>
                  <div className="flex-[0.8]">启用</div>
                  <div className="flex-[1.0]">资料权限</div>
                  <div className="flex-[1.0]">课程权限</div>
                  <div className="flex-[1.2]">创建时间</div>
                  <div className="flex-[1.2]">最后登录</div>
                  <div className="flex-[1.2] text-right">操作</div>
                </div>

                <div className="divide-y divide-gray-800">
                  {identities.map((row) => (
                    <div
                      key={row.id}
                      className="py-3 flex flex-col md:flex-row md:items-center gap-3 text-xs md:text-sm text-gray-100"
                    >
                      <div className="md:flex-[1.4] font-mono break-all">
                        <span className="md:hidden mr-2 text-gray-400">
                          身份 ID
                        </span>
                        {row.identityId}
                      </div>

                      <div className="md:flex-[1.2]">
                        <span className="md:hidden block text-[11px] text-gray-400 mb-1">
                          备注
                        </span>
                        <input
                          value={row.note}
                          onChange={(e) =>
                            updateIdentity(row.id, { note: e.target.value })
                          }
                          className="w-full rounded-full border border-gray-700 bg-black px-3 py-1.5 text-xs md:text-sm focus:outline-none focus:border-yellow-500/80"
                        />
                      </div>

                      <div className="md:flex-[0.8] flex items-center">
                        <span className="md:hidden mr-2 text-[11px] text-gray-400">
                          启用
                        </span>
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={row.isActive}
                            onChange={(e) =>
                              handleToggleField(row, "isActive", e.target.checked)
                            }
                            className="h-4 w-4 rounded border-gray-600 bg-black text-yellow-400 focus:ring-yellow-500/80"
                          />
                        </label>
                      </div>

                      <div className="md:flex-[1.0] flex items-center">
                        <span className="md:hidden mr-2 text-[11px] text-gray-400">
                          资料权限
                        </span>
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={row.canAccessDocs}
                            onChange={(e) =>
                              handleToggleField(
                                row,
                                "canAccessDocs",
                                e.target.checked,
                              )
                            }
                            className="h-4 w-4 rounded border-gray-600 bg-black text-yellow-400 focus:ring-yellow-500/80"
                          />
                        </label>
                      </div>

                      <div className="md:flex-[1.0] flex items-center">
                        <span className="md:hidden mr-2 text-[11px] text-gray-400">
                          课程权限
                        </span>
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={row.canAccessCourses}
                            onChange={(e) =>
                              handleToggleField(
                                row,
                                "canAccessCourses",
                                e.target.checked,
                              )
                            }
                            className="h-4 w-4 rounded border-gray-600 bg-black text-yellow-400 focus:ring-yellow-500/80"
                          />
                        </label>
                      </div>

                      <div className="md:flex-[1.2] text-gray-400">
                        <span className="md:hidden block text-[11px] text-gray-400 mb-1">
                          创建时间
                        </span>
                        {formatDate(row.createdAt)}
                      </div>

                      <div className="md:flex-[1.2] text-gray-400">
                        <span className="md:hidden block text-[11px] text-gray-400 mb-1">
                          最后登录
                        </span>
                        {formatDate(row.lastLoginAt)}
                      </div>

                      <div className="md:flex-[1.2] flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleResetPassword(row)}
                          className="px-3 py-1 rounded-full border border-yellow-500/80 bg-yellow-500/10 text-xs text-yellow-300 hover:bg-yellow-500/30"
                        >
                          重置密码
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteIdentity(row)}
                          className="px-3 py-1 rounded-full border border-red-500/70 bg-red-500/10 text-xs text-red-300 hover:bg-red-500/30"
                        >
                          删除
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </main>
        )}
      </div>
    </div>
  );
}

interface ResourceStepCardProps {
  stepLabel: string;
  title: string;
  items: string[];
  note?: string;
}

function ResourceStepCard({
  stepLabel,
  title,
  items,
  note,
}: ResourceStepCardProps) {
  return (
    <section className="rounded-[28px] border border-gray-700 bg-black/80 px-4 py-5 md:px-8 md:py-6">
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="inline-flex items-center px-4 py-1 rounded-full border border-yellow-500/80 bg-yellow-500/10 text-[11px] font-semibold tracking-[0.25em] text-yellow-400 uppercase">
          {stepLabel}
        </div>
      </div>
      <h3 className="text-lg md:text-xl font-bold text-white mb-3">{title}</h3>
      <ol className="list-decimal list-inside space-y-1 text-sm text-gray-200 leading-relaxed">
        {items.map((line, idx) => (
          <li key={idx}>{line}</li>
        ))}
      </ol>
      {note && (
        <p className="mt-3 text-xs text-gray-500 border-t border-gray-800 pt-2">
          注：{note}
        </p>
      )}
    </section>
  );
}
