"use client";

import React, { useState } from "react";

type TabKey = "resources" | "courses" | "satellite";

const tabs: { key: TabKey; label: string }[] = [
  { key: "resources", label: "资料系统" },
  { key: "courses", label: "课程系统" },
  { key: "satellite", label: "卫星系统" },
];

export default function InternalSystemPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("courses");

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black px-4 py-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-10 text-center">
          <div className="inline-flex items-center px-5 py-1 rounded-full border border-yellow-500/70 bg-yellow-500/10 text-xs tracking-[0.2em] uppercase text-yellow-400 mb-6">
            富利者训练计划 · 内部系统
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
            富利者内部训练系统
          </h1>
          <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto">
            登录后，你可以在这里统一访问资料库、内部课程系统以及卫星系统，
            按顺序完成训练并接入实战工具。
          </p>
        </header>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-full bg-gray-900 border border-gray-700 p-1">
            {tabs.map((tab) => {
              const selected = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={[
                    "px-6 py-2 text-sm md:text-base font-semibold rounded-full transition-colors whitespace-nowrap",
                    selected
                      ? "bg-yellow-500 text-black shadow-[0_0_20px_rgba(234,179,8,0.45)]"
                      : "bg-transparent text-gray-400 hover:text-white hover:bg-gray-800",
                  ].join(" ")}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        {activeTab === "resources" && <ResourcesSection />}
        {activeTab === "courses" && <CoursesSection />}
        {activeTab === "satellite" && <SatelliteSection />}
      </div>
    </div>
  );
}

function ResourcesSection() {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          资料系统 · 规则与文档中心
        </h2>
        <p className="text-gray-400 text-sm md:text-base max-w-2xl">
          在开始训练之前，请先系统阅读内部规则、训练流程与风险说明。
          资料系统是整个训练计划的“说明书”，帮助你在实战前建立统一的认知框架。
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <InfoCard
          title="训练规则手册"
          badge="必读"
          desc="完整梳理内部训练的纪律、规则与红线说明，是进入课程系统前的基础必修内容。"
        />
        <InfoCard
          title="风险与资金管理指引"
          desc="解释仓位控制、止损规则与最大回撤要求，帮助你在训练中始终活在场内。"
        />
        <InfoCard
          title="常见问题与案例"
          desc="整理历届学员在训练中遇到的问题与典型违规案例，提前避坑，提高学习效率。"
        />
      </div>
    </section>
  );
}

function CoursesSection() {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          课程系统 · 内部课程总览
        </h2>
        <p className="text-gray-400 text-sm md:text-base max-w-2xl">
          按顺序完成每个模块，系统化掌握内部训练流程和实战规则。
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <CourseCard
          tag="基础模块"
          status="进行中"
          title="规则与纪律基础"
          desc="从零开始理解内部规则框架、执行标准以及常见违规场景示例，为后续实战打下基础。"
        />
        <CourseCard
          tag="进阶模块"
          status="尚未解锁"
          title="交易系统执行流程"
          desc="学习如何把训练规则落实到每天的操作流程中，完成标准化复盘与记录。"
        />
        <CourseCard
          tag="高级模块"
          status="尚未解锁"
          title="风险与资金管理"
          desc="掌握多级别风险控制方法与资金管理节奏，确保长期稳定参与市场。"
        />
      </div>
    </section>
  );
}

function SatelliteSection() {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          卫星系统 · 实战辅助工具
        </h2>
        <p className="text-gray-400 text-sm md:text-base max-w-2xl">
          卫星系统是基于量化信号和 AI 构建的辅助决策工具，用于在合规前提下提升执行效率，
          并帮助你在不同品种、周期中识别高质量机会。
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <InfoCard
          title="信号卫星 · 多品种监控"
          desc="通过统一面板监控核心品种的趋势、波动与关键价位，筛选符合训练规则的潜在机会。"
        />
        <InfoCard
          title="天气晴雨表 · 市场情绪雷达"
          desc="从宏观角度评估市场风险情绪，辅助判断加仓、减仓或观望的节奏决策。"
        />
        <InfoCard
          title="执行仪表盘"
          desc="集中展示持仓、风险敞口与执行记录，帮助你对照训练标准进行自检与复盘。"
        />
      </div>
    </section>
  );
}

interface InfoCardProps {
  title: string;
  desc: string;
  badge?: string;
}

function InfoCard({ title, desc, badge }: InfoCardProps) {
  return (
    <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-950 border border-gray-700 rounded-2xl p-6 hover:border-yellow-500/80 hover:shadow-[0_0_30px_rgba(234,179,8,0.3)] transition-all">
      {badge && (
        <span className="inline-flex items-center px-3 py-0.5 rounded-full bg-yellow-500/10 border border-yellow-500/60 text-[11px] font-semibold tracking-wide text-yellow-400 mb-3">
          {badge}
        </span>
      )}
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
    </div>
  );
}

interface CourseCardProps {
  tag: string;
  status: string;
  title: string;
  desc: string;
}

function CourseCard({ tag, status, title, desc }: CourseCardProps) {
  return (
    <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-950 border border-gray-700 rounded-2xl p-6 flex flex-col">
      <div className="flex items-baseline justify-between mb-4">
        <span className="text-xs text-yellow-400 font-semibold uppercase tracking-wide">
          {tag}
        </span>
        <span className="text-[11px] px-3 py-0.5 rounded-full border border-gray-600 text-gray-300">
          {status}
        </span>
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-400 flex-1 mb-4 leading-relaxed">{desc}</p>
      <button
        type="button"
        className="mt-auto inline-flex items-center justify-center px-4 py-2 rounded-full text-xs font-semibold bg-yellow-500 text-black hover:bg-yellow-400 transition-colors"
      >
        查看详细要求
      </button>
    </div>
  );
}

