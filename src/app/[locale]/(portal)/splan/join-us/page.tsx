"use client";

import React, { useState } from "react";
import EmailContactModal from "@/components/custom/EmailContactModal";
import { useLanguage } from "@/contexts/LanguageContext";
import ShineButton from "@/components/custom/ShineButton";
import LocaleLink from "@/components/navigation/LocaleLink";
import InterviewCTA from "@/components/custom/InterviewCTA";

export default function JoinUsPage() {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const { t, language } = useLanguage();

  const isZh = language === "zh";

  const handleApply = () => {
    setIsEmailModalOpen(true);
  };

  const heroMainTitle = isZh
    ? "98 元入伍 · 45 天科学训练"
    : "¥98 ENTRY · 45-DAY BOOT CAMP";

  const heroSubTitle = isZh
    ? "不是课程，也不是社群，而是一套为交易员设计的科学系统化训练营"
    : "Not a course or chat group, but a structured, data‑driven trader boot camp.";

  const stat2Value = isZh ? "45 天" : "45 DAYS";
  const stat2Label = isZh ? "线上科学化训练" : "Boot Camp Training";
  const stat3Value = isZh ? "7 天" : "3 DAYS";
  const stat3Label = isZh ? "无理由全退" : "Full Refund Window";

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-black via-gray-900 to-black text-white border-b-2 border-gray-800 overflow-hidden">
        {/* 背景光斑 */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-24 text-center">
          <div className="inline-block px-6 py-2 bg-white/10 border border-white/20 backdrop-blur-sm mb-6">
            <span className="text-sm font-semibold tracking-wider">
              {t("joinus.hero.badge")}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
            {heroMainTitle}
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-6">
            {heroSubTitle}
          </p>

          <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto">
            {t("joinus.hero.subtitle")}
          </p>

          {/* 核心数据 */}
          <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm md:text-base">
            <div className="min-w-[170px] px-6 py-4 bg-black/60 border border-white/20 rounded-lg">
              <div className="text-2xl md:text-3xl font-black text-yellow-400 mb-1">
                {t("joinus.hero.stat1.value")}
              </div>
              <div className="text-gray-200 font-semibold">
                {t("joinus.hero.stat1")}
              </div>
            </div>

            <div className="min-w-[170px] px-6 py-4 bg-black/60 border border-white/20 rounded-lg">
              <div className="text-2xl md:text-3xl font-black text-yellow-400 mb-1">
                {stat2Value}
              </div>
              <div className="text-gray-200 font-semibold">
                {stat2Label}
              </div>
            </div>

            <div className="min-w-[170px] px-6 py-4 bg-black/60 border border-white/20 rounded-lg">
              <div className="text-2xl md:text-3xl font-black text-yellow-400 mb-1">
                {stat3Value}
              </div>
              <div className="text-gray-200 font-semibold">
                {stat3Label}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <ShineButton
              onClick={handleApply}
              className="px-10 py-4 bg-yellow-400 text-black text-base md:text-lg font-bold border-2 border-yellow-500 hover:bg-black hover:text-yellow-400 hover:border-yellow-400 transition-colors"
            >
              {isZh ? "立即入营" : "Join the Boot Camp"}
            </ShineButton>
            <LocaleLink
              href="/splan/psychology-test"
              className="px-8 py-3 border-2 border-white/70 text-sm md:text-base font-semibold text-white hover:bg-white hover:text-black transition-colors inline-flex items-center justify-center"
            >
              {isZh ? "先做心理测评" : "Take Psychology Test First"}
            </LocaleLink>
          </div>
        </div>
      </section>

      {/* 主体内容 */}
      <div className="max-w-6xl mx-auto px-6 py-20 space-y-24">
        {/* 首先恭喜你 */}
        <section className="bg-black text-white py-16 border-y border-gray-800">
          <div className="max-w-5xl mx-auto px-6">
            <div className="rounded-3xl border border-gray-600 bg-black/80 px-8 py-10 md:px-12 md:py-12">
              <p className="text-xs md:text-sm font-semibold tracking-[0.25em] text-yellow-400 mb-4 uppercase">
                HELLO
              </p>

              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                {t("joinus.welcome.title")}
              </h2>

              <p className="text-base md:text-lg font-semibold text-yellow-400 mb-6 leading-relaxed">
                {t("joinus.welcome.warning")}
              </p>

              <div className="space-y-4 text-sm md:text-base leading-relaxed text-gray-200">
                <p>{t("joinus.welcome.intro")}</p>
                <p>{t("joinus.welcome.desc")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 我们在找的人 */}
        <section className="bg-black text-white py-16 border-y border-gray-800">
          <div className="max-w-5xl mx-auto px-6">
            <div className="rounded-3xl border border-gray-600 bg-black/80 px-8 py-10 md:px-12 md:py-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-8">
                {t("joinus.profile.title")}
              </h2>

              {/* 性格要求 */}
              <div className="mb-10">
                <h3 className="text-xl font-bold text-yellow-400 mb-3">
                  {isZh ? "性格要求" : "Personality Requirements"}
                </h3>
                <p className="text-sm md:text-base text-gray-200 leading-relaxed">
                  {t("joinus.profile.unsuited")}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                {/* 基本条件 */}
                <div className="border border-gray-700 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-yellow-400 mb-4">
                    {t("joinus.profile.basic.title")}
                  </h3>
                  <ul className="space-y-2 text-sm md:text-base text-gray-200 list-disc list-inside">
                    <li>{t("joinus.profile.basic.1")}</li>
                    <li>{t("joinus.profile.basic.2")}</li>
                    <li>{t("joinus.profile.basic.3")}</li>
                    <li>{t("joinus.profile.basic.4")}</li>
                  </ul>
                </div>

                {/* 时间要求 */}
                <div className="border border-gray-700 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-yellow-400 mb-4">
                    {t("joinus.profile.time.title")}
                  </h3>
                  <ul className="space-y-2 text-sm md:text-base text-gray-200 list-disc list-inside">
                    <li>{t("joinus.profile.time.1")}</li>
                    <li>{t("joinus.profile.time.2")}</li>
                  </ul>
                </div>
              </div>

              {/* 关于底薪 / 收入结构 */}
              <div>
                <h3 className="text-xl font-bold text-yellow-400 mb-3">
                  {t("joinus.profile.income.title")}
                </h3>
                <p className="text-sm md:text-base text-gray-200 leading-relaxed">
                  {t("joinus.profile.income.desc")}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 训练大纲 + 内部课程概括 + 规则铁律 + 我们的理念 */}
      <section className="bg-black text-white py-16 border-y border-gray-800">
        <div className="max-w-5xl mx-auto px-6">
          <div className="rounded-3xl border border-gray-600 bg-black/80 px-8 py-10 md:px-12 md:py-12">
            <div className="text-center text-xs md:text-sm text-yellow-400 mb-2">
              {isZh ? "训练大纲" : "Training Outline"}
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-2">
              {isZh
                ? "45 天（30 个交易日）线上军规训练"
                : "45 Days · 30 Trading Sessions Online Boot Camp"}
            </h2>
            <p className="text-sm md:text-base text-center text-gray-300 mb-8">
              {isZh
                ? "阶段清晰 · 任务明确 · 每一天都知道该做什么"
                : "Clear stages and concrete tasks so you know what to do each day."}
            </p>

            {/* Day & Week Outline */}
            <div className="space-y-6">
              {/* Day 1 */}
              <div className="border border-gray-700 rounded-2xl px-6 py-5">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <p className="text-xs md:text-sm text-yellow-400 font-semibold mb-1">
                      {isZh ? "DAY 1 · 预备阶段" : "DAY 1 · Preparation"}
                    </p>
                    <h3 className="text-xl font-bold mb-1">
                      {isZh ? "准备阶段" : "Setup & Orientation"}
                    </h3>
                    <p className="text-sm text-gray-300">
                      {isZh
                        ? "完成账号、软件与环境搭建，为正式训练打好基础。"
                        : "Set up accounts, platforms and environment to be ready for training."}
                    </p>
                  </div>
                  <ul className="text-sm text-gray-300 list-disc list-inside md:w-1/2">
                    <li>{isZh ? "安装并熟悉必要软件与工具" : "Install and get familiar with required tools"}</li>
                    <li>{isZh ? "学习基础下单与图表操作" : "Learn basic order placement and chart handling"}</li>
                    <li>{isZh ? "理解训练营纪律与考核规则" : "Understand rules and evaluation standards"}</li>
                  </ul>
                </div>
              </div>

              {/* Week 1 */}
              <div className="border border-gray-700 rounded-2xl px-6 py-5">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <p className="text-xs md:text-sm text-yellow-400 font-semibold mb-1">
                      {isZh ? "WEEK 1 · 阶段一" : "WEEK 1 · Stage 1"}
                    </p>
                    <h3 className="text-xl font-bold mb-1">
                      {isZh ? "思维钢印" : "Mindset & Framework"}
                    </h3>
                    <p className="text-sm text-gray-300">
                      {isZh
                        ? "建立正确的交易认知，明白自己在市场中的角色与边界。"
                        : "Build a correct trading mindset and know your role and limits in the market."}
                    </p>
                  </div>
                  <ul className="text-sm text-gray-300 list-disc list-inside md:w-1/2">
                    <li>{isZh ? "理解趋势、波动与风险报酬" : "Understand trend, volatility and risk‑reward"}</li>
                    <li>{isZh ? "搭建个人交易日志与复盘模板" : "Set up journal and review templates"}</li>
                    <li>{isZh ? "完成至少 5 天规则化模拟记录" : "Log at least 5 days of rule‑based practice"}</li>
                  </ul>
                </div>
              </div>

              {/* Week 2 */}
              <div className="border border-gray-700 rounded-2xl px-6 py-5">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <p className="text-xs md:text-sm text-yellow-400 font-semibold mb-1">
                      {isZh ? "WEEK 2 · 阶段二" : "WEEK 2 · Stage 2"}
                    </p>
                    <h3 className="text-xl font-bold mb-1">
                      {isZh ? "知行合一" : "Execution & Discipline"}
                    </h3>
                    <p className="text-sm text-gray-300">
                      {isZh
                        ? "把规则真正落地到每一笔订单，练习稳定执行。"
                        : "Turn rules into consistent execution on every order."}
                    </p>
                  </div>
                  <ul className="text-sm text-gray-300 list-disc list-inside md:w-1/2">
                    <li>{isZh ? "统一进出场标准与仓位规则" : "Standardize entries, exits and position sizing"}</li>
                    <li>{isZh ? "日复盘：记录每一笔决策原因" : "Daily reviews with reasons for each trade"}</li>
                    <li>{isZh ? "控制单日与单周最大回撤" : "Respect daily and weekly drawdown limits"}</li>
                  </ul>
                </div>
              </div>

              {/* Week 3+ */}
              <div className="border border-gray-700 rounded-2xl px-6 py-5">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <p className="text-xs md:text-sm text-yellow-400 font-semibold mb-1">
                      {isZh ? "WEEK 3+ · 阶段三" : "WEEK 3+ · Stage 3"}
                    </p>
                    <h3 className="text-xl font-bold mb-1">
                      {isZh ? "连续考核" : "Consistent Evaluation"}
                    </h3>
                    <p className="text-sm text-gray-300">
                      {isZh
                        ? "在连续交易日内达成“不出错、不漏单、不情绪化”的考核标准。"
                        : "Meet the standard of no mistakes, no missing trades and no emotional decisions across consecutive days."}
                    </p>
                  </div>
                  <ul className="text-sm text-gray-300 list-disc list-inside md:w-1/2">
                    <li>{isZh ? "完成连续 10 个交易日稳定执行" : "Complete 10 consecutive sessions of stable execution"}</li>
                    <li>{isZh ? "统计盈亏曲线与胜率、盈亏比" : "Analyse P/L curve, win‑rate and risk‑reward"}</li>
                    <li>{isZh ? "准备进入小额实盘或资金考核" : "Prepare for small live capital or funded evaluation"}</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 内部课程概括 */}
            <div className="mt-10">
              <p className="text-center text-xs md:text-sm text-yellow-400 mb-3">
                {isZh ? "内部课程概括" : "Course Overview"}
              </p>
              <h3 className="text-2xl md:text-3xl font-extrabold text-center mb-6">
                {isZh
                  ? "两大阶段帮助你建立盈利心态"
                  : "Two Core Phases to Build a Profitable Mindset"}
              </h3>

              <div className="rounded-2xl border border-gray-700 bg-black px-6 py-8 md:px-10 md:py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {/* WEEK 1 */}
                  <div>
                    <h4 className="text-lg md:text-xl font-extrabold text-yellow-400 mb-4">
                      {isZh ? "WEEK 1 · 基础框架" : "WEEK 1 · Foundation"}
                    </h4>
                    <ul className="space-y-2 text-sm md:text-base text-gray-200 list-disc list-inside">
                      <li>
                        {isZh
                          ? "《常识》：熟悉规则、清楚系统标准，建立对市场的基本敬畏"
                          : "\"Basics\": understand rules, system standards and basic respect for the market."}
                      </li>
                      <li>
                        {isZh
                          ? "《路径》：职业发展图与案例，知道交易这条路可以走到哪里"
                          : "\"Path\": professional roadmap and cases so you know where this road can lead."}
                      </li>
                      <li>
                        {isZh
                          ? "《法门》：在不确定中保持冷静，而不是情绪化追涨杀跌"
                          : "\"Method\": stay calm in uncertainty instead of chasing moves emotionally."}
                      </li>
                      <li>
                        {isZh
                          ? "《系统》：交易系统构成、进出场的选择，进场 K 线原则"
                          : "\"System\": system components and clear entry/exit candle principles."}
                      </li>
                      <li>
                        {isZh
                          ? "《固化》：逐渐形成系统框架，做到每一笔交易都是执行量化好的策略"
                          : "\"Solidify\": turn the framework into rules so every trade follows a quantified plan."}
                      </li>
                    </ul>
                  </div>

                  {/* WEEK 2 */}
                  <div>
                    <h4 className="text-lg md:text-xl font-extrabold text-yellow-400 mb-4">
                      {isZh ? "WEEK 2 · 知行合一" : "WEEK 2 · Execution"}
                    </h4>
                    <ul className="space-y-2 text-sm md:text-base text-gray-200 list-disc list-inside">
                      <li>
                        {isZh
                          ? "《量化操作》：遵守交易系统纪律，执行简单可复制的高胜率模式"
                          : "\"Quantified Execution\": follow system rules and run simple, repeatable high‑probability patterns."}
                      </li>
                      <li>
                        {isZh
                          ? "《不冒风险》：分散风险、控制回撤，任何时候都把风控放在第一位"
                          : "\"No Excess Risk\": diversify, manage drawdowns and always put risk first."}
                      </li>
                      <li>
                        {isZh
                          ? "《理性对待》：系统内的亏损平淡接受，拒绝扛单，果断离场"
                          : "\"Rational Loss\": accept system‑based losses, never hold and exit decisively."}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 规则铁律 */}
            <div className="mt-12">
              <p className="text-center text-xs md:text-sm text-yellow-400 mb-3">
                {isZh ? "规则铁律" : "Non‑Negotiable Rules"}
              </p>
              <h3 className="text-2xl md:text-3xl font-extrabold text-center mb-6">
                {isZh
                  ? "触碰一次红线，即刻失去信任"
                  : "Cross the Red Line Once, Lose Trust Immediately"}
              </h3>

              <div className="rounded-2xl border border-gray-700 bg-black px-6 py-8 md:px-10 md:py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {/* 交易规则红线 */}
                  <div>
                    <h4 className="text-lg md:text-xl font-extrabold text-yellow-400 mb-4">
                      {isZh ? "交易规则红线" : "Trading Red Lines"}
                    </h4>
                    <ul className="space-y-2 text-sm md:text-base text-gray-200 list-disc list-inside">
                      <li>
                        {isZh
                          ? "硬止损线不能移动，位置必须设置正确"
                          : "Hard stop‑loss never moves once set, and must be placed correctly."}
                      </li>
                      <li>
                        {isZh
                          ? "只有标准和激进两种进场方式"
                          : "Only two entry modes are allowed: standard and aggressive."}
                      </li>
                      <li>
                        {isZh
                          ? "不得跨越红线折线持仓"
                          : "Never hold positions once a predefined red‑line is broken."}
                      </li>
                      <li>
                        {isZh
                          ? "止损和出场必须满足规则条件"
                          : "All exits and stops must follow predefined rules."}
                      </li>
                      <li>
                        {isZh
                          ? "5 倍以上利润才能使用止盈线"
                          : "Use take‑profit only when reward is at least 5× the risk."}
                      </li>
                    </ul>
                  </div>

                  {/* 会议纪律红线 */}
                  <div>
                    <h4 className="text-lg md:text-xl font-extrabold text-yellow-400 mb-4">
                      {isZh ? "会议纪律红线" : "Discipline in Sessions"}
                    </h4>
                    <ul className="space-y-2 text-sm md:text-base text-gray-200 list-disc list-inside">
                      <li>
                        {isZh
                          ? "学员之间不得私加微信或电话"
                          : "Participants may not privately add each other on social media or phone."}
                      </li>
                      <li>
                        {isZh
                          ? "会议室内保持严肃，不得谈论除交易外的其它话题"
                          : "Session rooms stay strictly focused on trading, no off‑topic chatting."}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 我们的理念 */}
            <div className="mt-12">
              <div className="rounded-2xl border border-gray-700 bg-black px-6 py-10 md:px-12 md:py-12 text-center">
                <p className="text-xs md:text-sm text-yellow-400 mb-4">
                  {isZh ? "给准备认真对待交易的你" : "Our Philosophy"}
                </p>
                <div className="space-y-3 text-sm md:text-base text-gray-200 leading-relaxed max-w-3xl mx-auto">
                  <p>
                    {isZh
                      ? "这里没有“稳赚秘籍”，也没有任何形式的喊单，我们不承诺你在某个时间段内赚到多少钱，也不会用夸张收益截图来刺激你"
                      : "We cultivate those truly suited for trading, keeping the few and advising most to step away."}
                  </p>
                  <p>
                    {isZh
                      ? "我们能给你的，是一套严肃认真的训练体系，让你把交易拆解成清晰的步骤，让你学会用数据而不是情绪做决策，让你在长期中看到自己的真实优势与短板"
                      : "This is a trader boot camp, using military‑style management to shape professional traders."}
                  </p>
                  <p>
                    {isZh
                      ? "那笔 98 元的标准通道费用，不是“学费”，也不是所谓的“门票”，而是你对自己说的一句：我愿意认真对待这一次训练，而不是再随便试一试"
                      : "Once you pass the evaluation, we provide the capital so you can fight on the front line and share the profits."}
                  </p>
                  <p>
                    {isZh
                      ? "如果你只是想听几句安慰、期待一夜翻倍、那这里不适合你"
                      : "We train you rigorously, because no commander wants to spend effort on the wrong soldier."}
                  </p>
                  <p>
                    {isZh
                      ? "如果你愿意把交易当成一项需要反复练习的技能，那么欢迎你来到科学训练计划里，一起把这件事做完整"
                      : "After you pass, we become partners in profit — you act as an independent entrepreneur, not as an employee."}
                  </p>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 预约面谈 CTA */}
      <InterviewCTA />

      {/* 联系邮箱弹窗 */}
      <EmailContactModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
      />
    </div>
  );
}
