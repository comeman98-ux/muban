"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

type TabKey = "resources" | "courses" | "satellite";

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
  { id: 4, title: "第 4 课 · 技术", phase: "第一阶段 · 基础课程", locked: true },
  { id: 5, title: "第 5 课 · 精进", phase: "第一阶段 · 基础课程", locked: true },
];

export default function InternalSystemPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabKey>("courses");
  const [activeCourseId, setActiveCourseId] = useState<number>(1);

  const activeCourse =
    courseLessons.find((l) => l.id === activeCourseId) ?? courseLessons[0];

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
              好好学习，天天向上。这里统一完成资料阅读、课程训练和卫星系统对接。
            </p>
          </div>
          <div className="flex gap-3 md:justify-end">
            <button className="px-4 py-2 text-sm font-semibold rounded-md bg-yellow-500 text-black hover:bg-yellow-400 border border-yellow-500/80">
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
                          onClick={() => !lesson.locked && setActiveCourseId(lesson.id)}
                          className={[
                            "w-full flex items-center justify-between rounded-xl border px-3 py-2 text-sm transition-colors",
                            selected
                              ? "border-yellow-500 bg-yellow-500/10 text-yellow-50"
                              : "border-gray-700 bg-black text-gray-200 hover:border-yellow-500/60 hover:bg-gray-900",
                            lesson.locked ? "opacity-60 cursor-not-allowed" : "cursor-pointer",
                          ].join(" ")}
                        >
                          <span>{lesson.title}</span>
                          {lesson.locked && (
                            <span className="text-xs text-yellow-400">预览</span>
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
                  这里可以嵌入内部视频、图文或作业说明（占位区域）
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
          <main className="rounded-[32px] border border-gray-700 bg-black/60 px-4 py-6 md:px-8 md:py-8 mt-4">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 text-center">
              资料系统 · 规则与文档中心
            </h2>
            <p className="text-sm text-gray-400 mb-6 text-center">
              请在开始课程训练前，完整阅读以下资料。它们决定你在实战中的边界与底线。
            </p>
            <div className="grid gap-6 md:grid-cols-3">
              <InfoCard
                title="内部规则总纲"
                desc="涵盖纪律红线、止损底线与违规处理流程，是所有训练的基础。"
              />
              <InfoCard
                title="资金与风险说明"
                desc="解释训练期间的风险提示、资金安排与可能出现的情绪波动。"
              />
              <InfoCard
                title="训练流程地图"
                desc="用一张图帮助你看清从报名到进入矩阵的完整路径。"
              />
            </div>
          </main>
        )}

        {/* Satellite tab */}
        {activeTab === "satellite" && (
          <main className="rounded-[32px] border border-gray-700 bg-black/60 px-4 py-6 md:px-8 md:py-8 mt-4">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 text-center">
              卫星系统 · 实战辅助工具
            </h2>
            <p className="text-sm text-gray-400 mb-6 text-center">
              卫星系统仅向通过考核的预备交易员开放，用于提升执行效率，而不是替代你的判断。
            </p>
            <div className="grid gap-6 md:grid-cols-3">
              <InfoCard
                title="信号卫星面板"
                desc="统一查看核心品种的趋势信号与关键价位提示。"
              />
              <InfoCard
                title="天气晴雨表"
                desc="帮助你感知整体市场风险情绪，避免在极端环境中冲动操作。"
              />
              <InfoCard
                title="执行与复盘仪表"
                desc="集中展示执行记录与错误统计，辅助你进行量化复盘。"
              />
            </div>
          </main>
        )}
      </div>
    </div>
  );
}

interface InfoCardProps {
  title: string;
  desc: string;
}

function InfoCard({ title, desc }: InfoCardProps) {
  return (
    <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-950 border border-gray-700 rounded-2xl p-6 hover:border-yellow-500/80 hover:shadow-[0_0_30px_rgba(234,179,8,0.3)] transition-all">
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
    </div>
  );
}

