"use client";

import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AIBarometerSection() {
  const { language } = useLanguage();
  const isZh = language === "zh";

  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);

  const featureGroups = isZh
    ? [
        {
          icon: "☀️",
          title: "AI 市场气候识别",
          items: ["晴 / 阴 / 雨 / 暴风雨情绪等级", "周期强弱分析"],
        },
        {
          icon: "📈",
          title: "趋势与信号系统",
          items: ["实时趋势判断", "AI 多空信号标注"],
        },
        {
          icon: "🛡️",
          title: "风险提示系统",
          items: ["风险区间识别", "波动率过滤"],
        },
        {
          icon: "⚙️",
          title: "适用范围",
          items: ["适合短线 / 波段 / 长线", "适配所有 TradingView 账户"],
        },
      ]
    : [
        {
          icon: "☀️",
          title: "AI Market Regime Detection",
          items: [
            "Clear / Cloudy / Rain / Storm sentiment levels",
            "Timeframe strength analysis",
          ],
        },
        {
          icon: "📈",
          title: "Trend & Signal Engine",
          items: ["Real-time trend assessment", "AI long / short signal tagging"],
        },
        {
          icon: "🛡️",
          title: "Risk Alert System",
          items: ["Risk zone identification", "Volatility-based filtering"],
        },
        {
          icon: "⚙️",
          title: "Applicability",
          items: [
            "Works for scalping / swing / position",
            "Compatible with all TradingView accounts",
          ],
        },
      ];

  const pricing = isZh
    ? [
        { label: "月度版", price: "$99 / 月", recommended: false },
        { label: "季度版", price: "$269 / 3 月", recommended: true },
        { label: "半年版", price: "$509 / 6 月", recommended: false },
        { label: "年度版", price: "$999 / 年", recommended: false },
      ]
    : [
        { label: "Monthly", price: "$99 / month", recommended: false },
        {
          label: "Quarterly",
          price: "$269 / 3 months",
          recommended: true,
        },
        { label: "Half-Year", price: "$509 / 6 months", recommended: false },
        { label: "Annual", price: "$999 / year", recommended: false },
      ];

  return (
    <section className="bg-white text-black dark:bg-gray-950 dark:text-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* 标题区域 */}
        <div className="text-center mb-12">
          <p className="text-xs md:text-sm font-medium tracking-wide text-gray-500 dark:text-gray-400 uppercase mb-3">
            {isZh
              ? "专业级趋势判断 · 多空信号 · 市场结构可视化"
              : "Pro‑grade trend detection · Long/short signals · Visual market structure"}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4">
            {isZh
              ? "AI 市场晴雨表™（TradingView 实时版）"
              : "AI Market Barometer™ (TradingView Live)"}
          </h2>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">
            {isZh
              ? "让你的交易从『凭感觉』变成『有依据』。"
              : "Turn trading from pure feeling into evidence‑based decisions."}
          </p>
        </div>

        {/* 上半部分：图表 + 功能 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          {/* 左侧：TradingView 图表占位 */}
          <div className="flex flex-col gap-3">
            <div className="bg-gray-100 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-3xl p-4 flex items-center justify-center">
              <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden bg-black">
                <div className="w-full h-full flex items-center justify-center text-xs md:text-sm text-gray-400">
                  {isZh
                    ? "TradingView 实时图表嵌入区域（待替换为真实 Chart 代码）"
                    : "TradingView live chart embed placeholder (replace with real chart code)."}
                </div>
              </div>
            </div>
            <p className="text-[11px] md:text-xs leading-relaxed text-gray-500 dark:text-gray-400 text-left md:text-center whitespace-pre-line">
              {isZh
                ? "示例：黄金（XAUUSD）· 1 小时周期\n图中展示：AI 趋势箭头、多空带、风险区间\n数据与 TradingView 实时同步"
                : "Example: Gold (XAUUSD) · 1‑hour timeframe\nVisuals: AI trend arrows, long/short bands, risk zones\nData stays in sync with TradingView in real time."}
            </p>
          </div>

          {/* 右侧：功能卡片 */}
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {featureGroups.map((group) => (
                <div
                  key={group.title}
                  className="border border-gray-200 dark:border-gray-800 rounded-2xl p-4 bg-white/60 dark:bg-black/40 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{group.icon}</span>
                    <h3 className="text-sm font-bold">{group.title}</h3>
                  </div>
                  <ul className="text-xs md:text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    {group.items.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* 订阅按钮 */}
            <div className="mt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => setIsSubscribeModalOpen(true)}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-black text-white text-sm font-bold hover:bg-gray-900"
              >
                {isZh ? "立即申请订阅 AI 市场晴雨表" : "Request AI Barometer Subscription"}
              </button>
            </div>
          </div>
        </div>

        {/* 订阅方案 */}
        <div className="mt-16 max-w-5xl mx-auto">
          <h3 className="text-lg font-bold mb-3">
            {isZh ? "订阅方案" : "Subscription Plans"}
          </h3>
          <p className="text-sm md:text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-6">
            {isZh
              ? "支持所有 TradingView 账户类型，订阅期间内可不限次数使用 AI 市场晴雨表™ 指标。"
              : "Works with all TradingView accounts. Use the AI Market Barometer™ indicator freely during your subscription."}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {pricing.map((plan) => (
              <div
                key={plan.label}
                className={`border rounded-2xl p-4 text-center ${
                  plan.recommended
                    ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-200 dark:border-gray-800"
                }`}
              >
                <p className="text-sm font-semibold mb-1">{plan.label}</p>
                <p className="text-base md:text-lg font-bold mb-3">{plan.price}</p>
                {plan.recommended && (
                  <p className="text-[11px] text-blue-600 dark:text-blue-300 mb-2">
                    {isZh ? "推荐" : "Recommended"}
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => setIsSubscribeModalOpen(true)}
                  className="w-full mt-1 px-4 py-2 rounded-full border border-black dark:border-white text-xs font-semibold hover:bg-gray-50 dark:hover:bg-white/10"
                >
                  {isZh ? "通过邮箱申请此方案" : "Request via email"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 订阅申请弹窗 */}
      {isSubscribeModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
          onClick={() => setIsSubscribeModalOpen(false)}
        >
          <div
            className="bg-white dark:bg-gray-900 max-w-lg w-full mx-auto rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="flex-1 text-lg md:text-xl font-black text-black dark:text-white leading-snug text-center">
                {isZh
                  ? "AI 市场晴雨表™ 订阅申请"
                  : "AI Market Barometer™ Subscription Request"}
              </h3>
              <button
                type="button"
                onClick={() => setIsSubscribeModalOpen(false)}
                className="ml-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                aria-label={isZh ? "关闭" : "Close"}
              >
                ×
              </button>
            </div>

            <div className="space-y-4 text-sm md:text-base text-gray-700 dark:text-gray-300 text-center">
              <p>
                {isZh
                  ? "为了为你开通 TradingView 的专属权限，请通过邮箱与我们联系。"
                  : "To enable your dedicated TradingView access, please contact us via email."}
              </p>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    if (typeof navigator !== "undefined" && navigator.clipboard) {
                      navigator.clipboard.writeText("fulizhe90@gmail.com");
                    }
                  }}
                  className="inline-flex w-full max-w-xs md:max-w-sm mx-auto items-center justify-center px-6 md:px-8 py-3 md:py-3.5 rounded-full bg-blue-600 text-white font-extrabold text-lg md:text-xl shadow-lg hover:bg-blue-500 transition-colors"
                >
                  🔵 fulizhe90@gmail.com
                </button>
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                  {isZh
                    ? "点击上方按钮自动复制邮箱地址"
                    : "Click the button above to copy the email address."}
                </p>
              </div>

              <div className="space-y-2">
                <p className="font-medium">
                  {isZh
                    ? "邮件标题：申请订阅 AI 市场晴雨表"
                    : "Email subject: Subscribe to AI Market Barometer"}
                </p>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                  {isZh
                    ? "邮件内容只需包含：TradingView 用户名；想订阅的时长（1 月 / 3 月 / 6 月 / 12 月）。"
                    : "Email body only needs to include: your TradingView username, and desired duration (1 / 3 / 6 / 12 months)."}
                </p>
              </div>

              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                {isZh
                  ? "我们会在 24 小时内回复你。"
                  : "We will reply within 24 hours."}
              </p>
            </div>

            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={() => setIsSubscribeModalOpen(false)}
                className="px-6 py-2 rounded-full border border-black dark:border-white text-sm font-semibold text-black dark:text-white bg-white dark:bg-transparent hover:bg-gray-100 dark:hover:bg-white/10"
              >
                {isZh ? "知道了" : "Got it"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
