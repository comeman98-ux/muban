"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type TabKey = "resources" | "courses" | "satellite";
type MainView = "system" | "identity";

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
  { id: 1, title: "第 1 讲 · 常识", phase: "第一阶段 · 基础课程" },
  { id: 2, title: "第 2 讲 · 路径", phase: "第一阶段 · 基础课程", locked: true },
  { id: 3, title: "第 3 讲 · 法门", phase: "第一阶段 · 基础课程", locked: true },
  { id: 4, title: "第 4 讲 · 技巧", phase: "第一阶段 · 基础课程", locked: true },
  { id: 5, title: "第 5 讲 · 精进", phase: "第一阶段 · 基础课程", locked: true },
];

interface IdentityRecord {
  id: string;
  note: string;
  role: string;
  enabled: boolean;
  createdAt: string;
  lastLogin: string;
}

const initialIdentities: IdentityRecord[] = [
  {
    id: "QVPD6E7EZ",
    note: "test",
    role: "正式学员",
    enabled: true,
    createdAt: "2025/11/21 20:10:20",
    lastLogin: "2025/11/21 20:15:25",
  },
  {
    id: "0MCD5K0V4M",
    note: "备注 / 姓名",
    role: "管理员",
    enabled: true,
    createdAt: "2025/11/21 20:08:21",
    lastLogin: "2025/11/21 22:02:13",
  },
  {
    id: "515S1PFDBH",
    note: "王嘉麒",
    role: "正式学员",
    enabled: true,
    createdAt: "2025/11/21 20:02:11",
    lastLogin: "-",
  },
  {
    id: "89NY4X3FQ9",
    note: "张浩波",
    role: "预备役学员",
    enabled: true,
    createdAt: "2025/11/21 20:01:28",
    lastLogin: "2025/11/24 13:03:21",
  },
  {
    id: "markyang00001",
    note: "杨港",
    role: "管理员",
    enabled: true,
    createdAt: "2025/11/20 19:26:20",
    lastLogin: "2025/11/21 20:16:44",
  },
  {
    id: "ADMIN00001",
    note: "Super Admin",
    role: "管理员",
    enabled: false,
    createdAt: "2025/11/19 23:30:00",
    lastLogin: "2025/11/24 14:04:35",
  },
];

export default function InternalSystemPage() {
  const router = useRouter();

  const [view, setView] = useState<MainView>("system");
  const [activeTab, setActiveTab] = useState<TabKey>("courses");
  const [activeCourseId, setActiveCourseId] = useState<number>(1);
  const [now, setNow] = useState<Date>(() => new Date());
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [ytKey, setYtKey] = useState(0);
  const [identities, setIdentities] =
    useState<IdentityRecord[]>(initialIdentities);

  // 实时时间（北京时间）
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 自动刷新“卫星系统”的 iframe
  useEffect(() => {
    if (!autoRefresh) return;
    const id = setInterval(() => {
      setYtKey((k) => k + 1);
    }, 30000);
    return () => clearInterval(id);
  }, [autoRefresh]);

  const activeCourse =
    courseLessons.find((l) => l.id === activeCourseId) ?? courseLessons[0];

  const updateIdentity = (id: string, patch: Partial<IdentityRecord>) => {
    setIdentities((prev) =>
      prev.map((row) => (row.id === id ? { ...row, ...patch } : row)),
    );
  };

  const handleAddIdentity = () => {
    const index = identities.length + 1;
    const newId = `NEW${index.toString().padStart(4, "0")}`;
    setIdentities((prev) => [
      ...prev,
      {
        id: newId,
        note: "新身份备注",
        role: "正式学员",
        enabled: true,
        createdAt: now.toISOString().slice(0, 19).replace("T", " "),
        lastLogin: "-",
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black px-4 py-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center px-5 py-1 rounded-full border border-yellow-500/70 bg-yellow-500/10 text-xs tracking-[0.2em] uppercase text-yellow-400 mb-4">
              富利者训练计划 · 内部系统
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-2">
              内部训练系统
            </h1>
            <p className="text-sm md:text-base text-gray-400 max-w-xl">
              好好学习，天天向上。在这里统一完成资料阅读、课程训练和卫星系统对接。
            </p>
          </div>
          <div className="flex gap-3 md:justify-end">
            <button
              type="button"
              onClick={() => setView("identity")}
              className={[
                "px-4 py-2 text-sm font-semibold rounded-md border border-yellow-500/80",
                view === "identity"
                  ? "bg-yellow-500 text-black hover:bg-yellow-400"
                  : "bg-yellow-500/10 text-yellow-300 hover:bg-yellow-400 hover:text-black",
              ].join(" ")}
            >
              身份管理
            </button>
            <button
              className="px-4 py-2 text-sm font-semibold rounded-md border border-gray-600 text-gray-100 hover:bg-gray-900"
              onClick={() => router.push("/system/login")}
            >
              退出登录
            </button>
          </div>
        </header>

        {view === "system" && (
          <>
            {/* Tabs */}
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
                      {tab.key === "satellite" && (
                        <span className="ml-1 text-xs align-middle">🔒</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Courses tab */}
            {activeTab === "courses" && (
              <main className="rounded-[32px] border border-gray-700 bg-black/60 px-4 py-6 md:px-8 md:py-8">
                <header className="text-center mb-8">
                  <p className="text-xs font-semibold tracking-[0.3em] text-yellow-400 mb-2">
                    内部课程
                  </p>
                  <h2 className="text-2xl md:text-3xl font-black text-white mb-2">
                    请按照顺序完成内部课程学习并按时提交作业
                  </h2>
                  <p className="text-sm text-gray-400">
                    先完成基础规则，再进入进阶与高级模块。切勿跳课或跨阶段训练。
                  </p>
                </header>

                <div className="grid gap-6 md:grid-cols-[260px,minmax(0,1fr)] items-start">
                  {/* 左侧课程列表 */}
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
                                  : "border-gray-700 bg-black text-gray-200 hover:border-yellow-500/60 hover:bg-gray-900",
                                lesson.locked
                                  ? "opacity-60 cursor-not-allowed"
                                  : "cursor-pointer",
                              ].join(" ")}
                            >
                              <span>{lesson.title}</span>
                              {lesson.locked && (
                                <span className="text-xs text-yellow-400">
                                  预览
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </aside>

                  {/* 右侧课程内容区域 */}
                  <section className="rounded-3xl border border-gray-700 bg-gradient-to-b from-gray-900 to-black p-4 md:p-6 space-y-4">
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <div className="space-y-1">
                        <p className="text-xs text-yellow-400 font-semibold uppercase tracking-[0.25em]">
                          {activeCourse.phase}
                        </p>
                        <h3 className="text-xl md:text-2xl font-bold text-white">
                          {activeCourse.title}
                        </h3>
                      </div>
                      <span className="inline-flex items-center px-3 py-1 rounded-full border border-gray-600 text-xs text-gray-300">
                        预计学习时长 · 30 分钟
                      </span>
                    </div>

                    <div className="mt-2 rounded-2xl overflow-hidden border border-gray-700 bg-black/80 h-56 md:h-72 flex items-center justify-center text-gray-500 text-sm">
                      这里可以嵌入内部视频、图文或作业说明（占位区域）。
                    </div>

                    <div className="space-y-2 text-sm text-gray-300">
                      <p>
                        · 学习目标：理解内部对“好交易员”的定义，知道训练期内你需要达到的行为标准。
                      </p>
                      <p>
                        · 作业示例：用 3~5 句话写下你对“长期、稳定、可复制”的理解，并提交到指定作业通道。
                      </p>
                    </div>
                  </section>
                </div>
              </main>
            )}

            {/* Resources tab */}
            {activeTab === "resources" && (
              <main className="rounded-[32px] border border-gray-700 bg-black/60 px-4 py-6 md:px-8 md:py-8 mt-4 space-y-6">
                <header className="text-center mb-4">
                  <p className="text-xs font-semibold tracking-[0.3em] text-yellow-400 mb-2">
                    资料系统
                  </p>
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
                    请按顺序完成资料阅读和准备工作
                  </h2>
                  <p className="text-sm text-gray-400">
                    建议从上到下依次完成，每一步都为后续训练做铺垫。
                  </p>
                </header>

                <ResourceStepCard
                  stepLabel="STEP 1 · 教学视频"
                  title="先完成入门教学视频学习"
                  items={[
                    "网盘下载：通过网盘获取教学视频文件和系统安装包。",
                    "播放器安装：Windows 电脑可以直接安装，安卓手机直装，其他系统需安装模拟器。",
                    "密码获取：复制弹出「机器码」+ 你的姓名（示例：0103-1974-038D-00E8张三），发给教练。",
                    "视频学习：收到专属密码后，观看教学视频并完成基础概念的理解总结，通过文档形式发给教练。",
                  ]}
                  note="提示：初训练阶段只需要完成入门视频和观看指南整理，完成以上之后再安装系统软件。"
                  buttonLabel="下载教学视频"
                  buttonHref="https://pan.quark.cn/s/c5f68f8ecceb"
                />

                <ResourceStepCard
                  stepLabel="STEP 2 · 交易软件"
                  title="按照步骤安装与配置交易软件"
                  items={[
                    "解压安装包，双击 tickmill4setup.exe，全选默认安装。",
                    "安装完成后关闭客户端，双击「交易系统.exe」默认路径安装，填写全部个人信息（推荐『何队』），截图发给教练后点击“试用”。",
                    "打开 Tickmill 客户端，通过「文件 · 登录交易账户」，输入模拟账户+密码，选择注册账号的服务器（例：Tickmill-Demo）。",
                    "解压 sj.zip，复制 MQL4 和 templates 文件夹；客户端内通过「文件 · 打开数据文件夹」，粘贴文件并选择覆盖。",
                    "重启客户端，按视频指引加载「3号」「3号+」模板（初级交易员仅用这两个），检查是否显示三青线。",
                  ]}
                  note="若安装过程不顺利，请优先拍屏记录报错信息，再在训练群或邮箱联系教练。"
                  buttonLabel="下载交易软件"
                  buttonHref="https://pan.quark.cn/s/5d5688c463f1"
                />

                <ResourceStepCard
                  stepLabel="STEP 3 · 模拟账号"
                  title="注册并准备训练用模拟账户"
                  items={[
                    "准备好一个英文字母邮箱（纯数字邮箱可能无法注册）发送给教练。",
                    "查看邮箱中的邮件，把收到邮件中的账号密码登录到训练软件。",
                    "确认邮件提示的登录服务器，一般为 Tickmill-Demo 或 Tickmill-DemoUK。",
                    "登录没问题后告知教练已经准备好交易软件。",
                    "完成注册后妥善保存账号、密码与服务器信息，并提交给教练备案。",
                  ]}
                  note="注意：模拟账户只用于训练与记录，不建议自行进行任何真实投资行为。"
                />
              </main>
            )}

            {/* Satellite tab */}
            {activeTab === "satellite" && (
              <main className="rounded-[32px] border border-gray-700 bg-black/60 px-4 py-6 md:px-8 md:py-8 mt-4 space-y-6">
                <header className="text-center mb-4">
                  <p className="text-xs font-semibold tracking-[0.3em] text-yellow-400 mb-2">
                    天网系统
                  </p>
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
                    实时量化趋势分析数据
                  </h2>
                  <p className="text-sm text-gray-400">
                    卫星系统用于辅助你理解市场结构和趋势方向，自动与手动刷新仅在通过考核后开放。
                  </p>
                </header>

                <div className="flex justify-center gap-4 mb-4">
                  <button
                    type="button"
                    onClick={() => setAutoRefresh((v) => !v)}
                    className={[
                      "px-6 py-2 text-sm font-semibold rounded-md border",
                      autoRefresh
                        ? "bg-yellow-500 text黑 border-yellow-500 shadow-[0_0_18px_rgba(234,179,8,0.6)]"
                        : "bg-yellow-500/10 text-yellow-300 border-yellow-500/70 hover:bg-yellow-500/30",
                    ].join(" ")}
                  >
                    自动刷新（30 秒）
                  </button>
                  <button
                    type="button"
                    onClick={() => setYtKey((k) => k + 1)}
                    className="px-6 py-2 text-sm font-semibold rounded-md bg-yellow-500 text黑 hover:bg-yellow-400 border border-yellow-500/80"
                  >
                    手动刷新
                  </button>
                </div>

                <div className="relative rounded-[28px] border border-gray-700 bg-black/80 overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-8 bg-black/80 flex items-center px-4 text-xs text-yellow-300 z-10">
                    当前时间（北京时间）：
                    {now.toLocaleString("zh-CN", {
                      timeZone: "Asia/Shanghai",
                      hour12: false,
                    })}
                  </div>
                  <iframe
                    key={ytKey}
                    src="https://www.youtube.com/live/M1zGGUfDvu0"
                    title="卫星系统演示视频"
                    className="w-full h-[320px] md:h-[520px] mt-8"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </main>
            )}
          </>
        )}

        {/* 身份管理视图（本地数据版） */}
        {view === "identity" && (
          <main className="mt-4 rounded-[32px] border border-gray-700 bg-black/70 px-4 py-6 md:px-8 md:py-8 space-y-6">
            <header className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-black text-white">
                身份管理
              </h2>
              <p className="text-sm md:text-base text-gray-400 max-w-2xl">
                管理内部身份 ID、权限组与登录状态。请妥善保管系统生成的初始密码。
              </p>
            </header>

            <section className="rounded-3xl border border-gray-700 bg-black/80 overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
                <span className="text-xs md:text-sm text-gray-400">
                  共 {identities.length} 条身份记录
                </span>
                <div className="flex gap-3">
                  <button
                    type="button"
                    className="px-4 py-2 text-xs md:text-sm font-semibold rounded-full border border-yellow-500/80 bg-yellow-500/10 text黄色-300 hover:bg-yellow-500/30"
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
                  <button
                    type="button"
                    onClick={handleAddIdentity}
                    className="px-4 py-2 text-xs md:text-sm font-semibold rounded-full border border-yellow-500/80 bg-yellow-500 text黑 hover:bg-yellow-400"
                  >
                    新增身份
                  </button>
                </div>
              </div>

              <div className="px-4 md:px-6 pb-4">
                <div className="hidden md:flex items-center text-xs text-gray-400 py-3 border-b border-gray-800">
                  <div className="flex-[1.5]">身份 ID</div>
                  <div className="flex-[1.7]">备注</div>
                  <div className="flex-[1.1]">角色</div>
                  <div className="flex-[0.7]">启用</div>
                  <div className="flex-[1.4]">创建时间</div>
                  <div className="flex-[1.4]">最后登录</div>
                  <div className="flex-[1.1] text-right">操作</div>
                </div>

                <div className="divide-y divide-gray-800">
                  {identities.map((row) => (
                    <div
                      key={row.id}
                      className="py-3 flex flex-col md:flex-row md:items-center gap-3 text-xs md:text-sm text-gray-100"
                    >
                      <div className="md:flex-[1.5] font-mono break-all">
                        <span className="md:hidden mr-2 text-gray-400">
                          身份 ID
                        </span>
                        {row.id}
                      </div>

                      <div className="md:flex-[1.7]">
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

                      <div className="md:flex-[1.1]">
                        <span className="md:hidden block text-[11px] text-gray-400 mb-1">
                          角色
                        </span>
                        <select
                          value={row.role}
                          onChange={(e) =>
                            updateIdentity(row.id, { role: e.target.value })
                          }
                          className="w-full rounded-full border border-gray-700 bg-black px-3 py-1.5 text-xs md:text-sm text-gray-100 focus:outline-none focus:border-yellow-500/80"
                        >
                          <option value="正式学员">正式学员</option>
                          <option value="预备役学员">预备役学员</option>
                          <option value="管理员">管理员</option>
                          <option value="Super Admin">Super Admin</option>
                        </select>
                      </div>

                      <div className="md:flex-[0.7] flex items-center">
                        <span className="md:hidden mr-2 text-[11px] text-gray-400">
                          启用
                        </span>
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={row.enabled}
                            onChange={(e) =>
                              updateIdentity(row.id, {
                                enabled: e.target.checked,
                              })
                            }
                            className="h-4 w-4 rounded border-gray-600 bg-black text黄色-400 focus:ring-yellow-500/80"
                          />
                        </label>
                      </div>

                      <div className="md:flex-[1.4] text-gray-400">
                        <span className="md:hidden block text-[11px] text-gray-400 mb-1">
                          创建时间
                        </span>
                        {row.createdAt}
                      </div>

                      <div className="md:flex-[1.4] text-gray-400">
                        <span className="md:hidden block text-[11px] text-gray-400 mb-1">
                          最后登录
                        </span>
                        {row.lastLogin}
                      </div>

                      <div className="md:flex-[1.1] flex justify-end gap-2">
                        <button
                          type="button"
                          className="px-3 py-1 rounded-full border border-yellow-500/80 bg-yellow-500/10 text-xs text黄色-300 hover:bg-yellow-500/30"
                        >
                          重置密码
                        </button>
                        <button
                          type="button"
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
  buttonLabel?: string;
  buttonHref?: string;
}

function ResourceStepCard({
  stepLabel,
  title,
  items,
  note,
  buttonLabel,
  buttonHref,
}: ResourceStepCardProps) {
  return (
    <section className="rounded-[28px] border border-gray-700 bg-black/80 px-4 py-5 md:px-8 md:py-6">
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="inline-flex items-center px-4 py-1 rounded-full border border-yellow-500/80 bg-yellow-500/10 text-[11px] font-semibold tracking-[0.25em] text-yellow-400 uppercase">
          {stepLabel}
        </div>
        {buttonLabel &&
          (buttonHref ? (
            <a
              href={buttonHref}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-xs md:text-sm font-semibold rounded-md bg-yellow-500 text-black hover:bg-yellow-400 border border-yellow-500/80 whitespace-nowrap"
            >
              {buttonLabel}
            </a>
          ) : (
            <button
              type="button"
              className="px-4 py-2 text-xs md:text-sm font-semibold rounded-md bg-yellow-500 text-black hover:bg-yellow-400 border border-yellow-500/80 whitespace-nowrap"
            >
              {buttonLabel}
            </button>
          ))}
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
