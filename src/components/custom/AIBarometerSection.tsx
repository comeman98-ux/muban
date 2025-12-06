"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AIBarometerSection() {
  const { language } = useLanguage();
  const isZh = language === "zh";

  const router = useRouter();
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);


  const featureGroups = isZh
    ? [
        {
          icon: "☀️",
          title: "AI 市场气候识别",
          items: ["晴 / 阴 / 雨 / 暴风雨 情绪等级", "周期强弱分析"],
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
        { label: "月度版", price: "$99/月", recommended: false },
        { label: "季度版", price: "$269/3月", recommended: true },
        { label: "半年版", price: "$509/6月", recommended: false },
        { label: "年度版", price: "$999/年", recommended: false },
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
              ? "让你的交易从“靠感觉”变成“有依据”"
              : "Turn trading from pure feeling into evidence‑based decisions."}
          </p>
        </div>

                {/* 上半部分：左右双栏 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          {/* 左侧：BTC 实时图表 + 晴雨表截图 */}
          <div className="flex flex-col gap-3">
            <div className="rounded-3xl bg-black px-6 py-6 sm:px-10 sm:py-8 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
              {/* 上：TradingView BTC 1 日 实时图表 */}
              <div className="relative w-full overflow-hidden rounded-2xl bg-black">
                <div className="aspect-[16/9] w-full">
                  <iframe
                    src="https://s.tradingview.com/widgetembed/?symbol=BITSTAMP%3ABTCUSD&interval=1D&hidesidetoolbar=1&hidetoptoolbar=1&theme=light"
                    className="h-full w-full"
                    frameBorder="0"
                    allowTransparency
                    scrolling="no"
                  />
                </div>
              </div>

              {/* 下：AI 晴雨表 BTC 截图示例 */}
              <div className="mt-4 rounded-2xl border border-white/10 bg-black/80 p-3 backdrop-blur">
                <p className="mb-2 text-xs text-gray-300">
                  以下为基于 BTC 1 日周期的 AI 市场晴雨表信号示例截图：
                </p>
                <div className="overflow-hidden rounded-xl">
                  <Image
                    src="/images/BTC1D.png"
                    alt="BTC 1 日周期 AI 晴雨表示例图"
                    width={1200}
                    height={630}
                    className="h-auto w-full"
                  />
                </div>
              </div>
            </div>

            <p className="mt-3 text-center text-xs text-gray-400">
              示例：比特币（BTCUSD） · 1 日周期 · 图中展示：AI 趋势箭头、多空气候带、风险区域 · 数据实时同步自 TradingView
            </p>
          </div>


          {/* 右侧：核心功能 */}
          <div className="flex flex-col h-full">
            <div className="mt-6 mb-12">
              <h3 className="text-lg font-bold mb-4">
                {isZh ? "核心功能" : "Key Capabilities"}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm md:text-base">
                {featureGroups.map((group) => (
                  <div
                    key={group.title}
                    className="flex flex-col gap-2 rounded-3xl border border-gray-200/80 dark:border-gray-800 bg-white dark:bg-gray-900 px-5 py-4 shadow-sm shadow-gray-200/80 dark:shadow-black/40"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{group.icon}</span>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {group.title}
                      </p>
                    </div>
                    <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                      {group.items.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-black dark:bg-white flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
                        </div>

          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">
              {isZh ? "AI 晴雨表的逻辑" : "How the AI Barometer Works"}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {isZh
                ? "AI 市场晴雨表™ 基于价格结构、周期强弱、趋势斜率、波动率以及多维情绪等多方判断与信号，通过大量数据和独家技术训练后的模型对当前市场环境进行实时分类"
                : "The AI Market Barometer™ classifies the current market in real time using price structure, timeframe strength, trend slope, volatility and multi‑dimensional sentiment signals, powered by models trained on large datasets and proprietary techniques."}
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {isZh
                ? "它不会预测未来，而是明确告诉你当前市场处于晴、阴、雨、暴风雨中的哪一种状态，从而帮助你做出更稳健的进出场决策"
                : "It does not try to predict the future — instead it tells you whether the market is in a clear, cloudy, rainy or storm regime so you can make more robust entries and exits."}
            </p>
          </div>
        </div>
      </div>

        {/* 下半部分：全宽布局 */}
        <div className="mt-16 w-full">
        

          {/* 订阅方案 + 对比表 */}
          <div className="mt-12 max-w-5xl mx-auto">
            <div className="border-t border-gray-200 dark:border-gray-800 pt-8" />
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mb-2">
              {isZh
                ? "全球交易员都在使用的 AI 市场情绪工具（支持 TradingView Web & App）"
                : "AI market sentiment tool trusted by traders worldwide (supports TradingView Web & App)."}
            </p>
            <h3 className="text-lg font-bold mb-1">
              {isZh ? "订阅方案" : "Subscription Plans"}
            </h3>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mb-3">
              {isZh
                ? "全球发行 · 官方标准定价"
                : "Global release · Official standard pricing"}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-5 md:gap-6">
              {pricing.map((plan) => (
                <div
                  key={plan.label}
                  className={`rounded-2xl border px-4 py-5 flex flex-col items-stretch transition-transform ${
                    plan.recommended
                      ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black shadow-xl shadow-black/30 dark:shadow-white/30 scale-[1.02]"
                      : "border-gray-200 bg-white text-black dark:border-gray-800 dark:bg-gray-900 dark:text-white shadow-sm shadow-gray-200/80 dark:shadow-black/40"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold">{plan.label}</p>
                    {plan.recommended && (
                      <span className="text-xs px-2 py-1 rounded-full border border-current uppercase tracking-wide">
                        {isZh ? "推荐" : "Best"}
                      </span>
                    )}
                  </div>
                  <p className="text-xl font-black mb-4">{plan.price}</p>
                  <button
                    type="button"
                    className="mt-auto w-full px-4 py-2.5 text-sm font-bold bg-black text-white dark:bg-black dark:text-white hover:bg-gray-900 disabled:opacity-60 rounded-full"
                    onClick={() => setIsSubscribeModalOpen(true)}
                  >
                    {isZh ? "立即订阅" : "Subscribe Now"}
                  </button>
                </div>
              ))}
            </div>

            {/* 功能对比表 */}
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full text-xs md:text-sm border-separate border-spacing-y-1">
                <thead>
                  <tr className="bg-black text-white dark:bg-gray-900">
                    <th className="text-left px-3 py-2 font-semibold">
                      {isZh ? "功能" : "Feature"}
                    </th>
                    <th className="px-3 py-2 font-semibold">
                      {isZh ? "月度版" : "Monthly"}
                    </th>
                    <th className="px-3 py-2 font-semibold">
                      {isZh ? "季度版（推荐）" : "Quarterly (Recommended)"}
                    </th>
                    <th className="px-3 py-2 font-semibold">
                      {isZh ? "半年版" : "Half‑Year"}
                    </th>
                    <th className="px-3 py-2 font-semibold">
                      {isZh ? "年度版" : "Annual"}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-950 text-gray-100 divide-y divide-gray-900/80">
                  {[
                    isZh ? "AI 趋势信号" : "AI trend signals",
                    isZh ? "市场气候识别" : "Market climate detection",
                    isZh ? "多周期支持" : "Multi‑timeframe support",
                    isZh ? "新功能更新" : "New feature updates",
                    isZh ? "优先客服支持" : "Priority support",
                  ].map((rowLabel, rowIndex) => (
                    <tr
                      key={rowLabel}
                      className="odd:bg-gray-950 even:bg-gray-900/40"
                    >
                      <td className="px-3 py-2 text-left">{rowLabel}</td>
                      {[0, 1, 2, 3].map((col) => {
                        const enabled =
                          rowIndex <= 3 || (rowIndex === 4 && col >= 1);
                        return (
                          <td
                            key={col}
                            className="px-3 py-2 text-center align-middle"
                          >
                            {enabled ? (
                              <span className="text-purple-400 text-base leading-none">
                                ✓
                              </span>
                            ) : (
                              <span className="text-gray-500">-</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                  <tr className="odd:bg-gray-950 even:bg-gray-900/40">
                    <td className="px-3 py-2 text-left">
                      {isZh ? "节省金额" : "Savings"}
                    </td>
                    <td className="px-3 py-2 text-center text-gray-500">-</td>
                    <td className="px-3 py-2 text-center text-purple-300">
                      {isZh ? "省 $28" : "Save $28"}
                    </td>
                    <td className="px-3 py-2 text-center text-purple-300">
                      {isZh ? "省 $85" : "Save $85"}
                    </td>
                    <td className="px-3 py-2 text-center text-purple-300">
                      {isZh ? "省 $189" : "Save $189"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 space-y-1 text-xs md:text-sm text-gray-500 dark:text-gray-400 text-center">
              <p>
                {isZh
                  ? "所有订阅均包含未来功能更新"
                  : "All subscriptions include future feature updates."}
              </p>
              <p>
                {isZh
                  ? "支持 TradingView Web / App 全端使用"
                  : "Works with TradingView Web / App across devices."}
              </p>
            </div>
          </div>

          {/* 训练营联动区 */}
          <div className="mt-12 max-w-5xl mx-auto">
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mb-4">
              {isZh
                ? "如果你还没有成熟的交易系统，你会更适合训练营（赠送晴雨表）"
                : "If you don’t yet have a mature trading system, the bootcamp (with the Barometer included) is likely a better fit for you."}
            </p>
            <div className="border-t border-gray-200 dark:border-gray-800 mb-6" />
            <div className="border border-gray-200 dark:border-gray-800 rounded-[32px] p-6 md:p-7 bg-gray-200 dark:bg-black">
              <h3 className="text-lg md:text-xl font-black mb-2">
                {isZh
                  ? "加入训练营？你将获得："
                  : "Join the bootcamp and you get:"}
              </h3>
              <div className="text-sm md:text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-6 space-y-2">
                <p>
                  {isZh
                    ? "免费使用两个月（价值 $198） 的 AI 晴雨表工具。"
                    : "Free two‑month access to the AI Barometer (worth $198)."}
                </p>
                <p>
                  {isZh
                    ? "训练营不仅教你使用晴雨表，更教你建立自己的科学交易系统。"
                    : "The bootcamp doesn’t just teach you how to use the Barometer — it shows you how to build a scientific trading system."}
                </p>
                <p>
                  {isZh
                    ? "训练营是方法，晴雨表是工具 —— 你将同时拥有两者。"
                    : "The bootcamp is the method, the Barometer is the tool — you get both."}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
                <button
                  type="button"
                  className="w-full sm:w-auto px-6 py-3 bg-black text-white font-bold text-sm rounded-full hover:bg-gray-900"
                  onClick={() => router.push(`/${language}/splan/join-us`)}
                >
                  {isZh
                    ? "98 元加入训练营（赠送 AI 晴雨表使用权）"
                    : "Join bootcamp for ¥98 (AI Barometer included)"}
                </button>
                <button
                  type="button"
                  className="w-full sm:w-auto px-6 py-3 rounded-full border border-black text-sm font-bold text-black bg-white hover:bg-gray-100 dark:border-white dark:text-white dark:bg-transparent dark:hover:bg-white/10 sm:ml-auto"
                  onClick={() => setIsSubscribeModalOpen(true)}
                >
                  {isZh
                    ? "我只想订阅晴雨表 → 点击购买"
                    : "Just the Barometer → Purchase"}
                </button>
              </div>
            </div>
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
                  : "AI Market Barometer (TradingView Live) Subscription Request"}
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

            <div className="space-y-4 text-sm md:text-base text-gray-700 dark:text-gray-300">
              <p>
                {isZh
                  ? "为了为你开通 TradingView 的专属权限，请通过邮箱与我们联系："
                  : "To enable your dedicated TradingView access, please contact us via email:"}
              </p>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    if (typeof navigator !== "undefined" && navigator.clipboard) {
                      navigator.clipboard.writeText("fulizhe90@gmail.com");
                    }
                  }}
                  className="inline-flex items-center justify-center px-6 md:px-8 py-3 rounded-full bg-blue-600 text-white font-bold text-base md:text-lg shadow-md hover:bg-blue-500 transition-colors"
                >
                  fulizhe90@gmail.com
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
                    ? "内容只需包含：TradingView 用户名"
                    : "Optional details: your TradingView username, desired subscription period, main markets and trading experience."}
                </p>
              </div>

              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                {isZh
                  ? "想订阅的时长（1 月 / 3 月 / 6 月 / 12 月）"
                  : "We will reply within 24 hours with activation instructions and payment options."}
              </p>

              <div className="pt-3 border-t border-gray-200 dark:border-gray-800 space-y-1 text-xs md:text-sm text-gray-500 dark:text-gray-400">
                <p>
                  {isZh
                    ? "我们将在 24 小时内回复你"
                    : "Includes usage guide, TradingView setup steps and quick‑start tutorials."}
                </p>
              
              </div>
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




