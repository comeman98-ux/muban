"use client";
import { Code, Flex, Text } from "@radix-ui/themes";
import { LinkPreview } from "@/components/ui/link-preview";
import { SparklesCore } from "@/components/ui/sparkles";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import EmailContactModal from '@/components/custom/EmailContactModal';
import BrandName from '@/components/custom/BrandName';
import BrandSlogans from '@/components/custom/BrandSlogans';
import { FadeInSlide, ScaleFadeIn, HoverCard, PulseButton, FloatingBadge, StaggeredFadeIn } from '@/components/custom/AnimatedSection';
import Testimonials from '@/components/custom/Testimonials';
import InterviewCTA from '@/components/custom/InterviewCTA';
import CandlestickChart from '@/components/custom/CandlestickChart';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import ShineButton from '@/components/custom/ShineButton';
import EntrySelector from '@/components/custom/EntrySelector';

const DummyContent = () => {
  const router = useRouter();
  const { t, language } = useLanguage();
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 收益图片列表 (1-15)
  const profitImages = [
    '/profits/1.png',
    '/profits/2.png',
    '/profits/3.png',
    '/profits/4.png',
    '/profits/5.png',
    '/profits/6.png',
    '/profits/7.png',
    '/profits/8.png',
    '/profits/9.png',
    '/profits/10.png',
    '/profits/11.png',
    '/profits/12.jpg',
    '/profits/13.png',
    '/profits/14.png',
    '/profits/15.png',
  ];

  // 自动滚动图片 - 每次显示3张
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => {
        const nextIndex = prev + 3;
        // 如果超出范围，回到开头
        return nextIndex >= profitImages.length ? 0 : nextIndex;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [profitImages.length]);

  return (
    <div className="w-full -mt-20 bg-black dark:bg-black text-white dark:text-white">
      {/* Hero Section - Full Width K-line Background */}
      <div className="relative bg-white dark:bg-black overflow-hidden h-screen">
        {/* K-line Chart Background */}
        <div className="absolute inset-0 w-full h-full">
          <CandlestickChart />
        </div>

        {/* Gradient Overlay - from left (opaque) to right (transparent) */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            background: 'linear-gradient(to right, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 30%, rgba(255, 255, 255, 0.3) 60%, rgba(255, 255, 255, 0) 100%)'
          }}
        />
        <div
          className="absolute inset-0 w-full h-full pointer-events-none dark:block hidden"
          style={{
            background: 'linear-gradient(to right, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.85) 30%, rgba(0, 0, 0, 0.3) 60%, rgba(0, 0, 0, 0) 100%)'
          }}
        />

        {/* Content Overlay - Centered in viewport */}
        <div className="relative z-10 flex items-center h-full">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-3xl flex flex-col space-y-10">
            {/* Main Title */}
            <ScaleFadeIn delay={0.2}>
              <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-black dark:text-white tracking-tight leading-none">
                <BrandName />
              </h1>
            </ScaleFadeIn>

            {/* Subtitle */}
            <FadeInSlide direction="right" delay={0.4}>
              <p className="text-2xl md:text-3xl lg:text-4xl text-black dark:text-white font-bold leading-tight">
                {t('hero.subtitle')}
              </p>
            </FadeInSlide>

            {/* CTAs */}
            <FadeInSlide direction="right" delay={0.6}>
              <div className="flex flex-col sm:flex-row gap-6">
                <PulseButton>
                  <ShineButton
                    onClick={() => router.push(`/${language}/splan/join-us`)}
                    className="px-12 py-6 bg-black dark:bg-white text-white dark:text-black text-xl font-black border-2 border-black dark:border-white hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition-all shadow-lg"
                  >
                    {t('hero.cta.learn')}
                  </ShineButton>
                </PulseButton>
                <button
                  onClick={() => router.push(`/${language}/dashboard`)}
                  className="px-12 py-6 bg-white dark:bg-black text-black dark:text-white text-xl font-black border-2 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
                >
                  {t('hero.cta.dashboard')}
                </button>
              </div>
            </FadeInSlide>

            {/* Hero Note */}
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-3xl">
              {t('hero.note')}
            </p>
            </div>
          </div>
        </div>
      </div>

           {/* 我是谁 · 发起人自述 + 排名 */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* 左侧：自我介绍 */}
          <div className="bg-black dark:bg-black text-white border border-gray-800 rounded-3xl p-8 md:p-10 lg:p-12">
            <p className="text-sm font-semibold text-yellow-400 mb-4">
              我是谁 · 发起人自述
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-8">
              我叫 <span className="text-yellow-400">富利者</span>
              <br />
              二级市场最科学的 <span className="text-yellow-400">训练总教练</span>
            </h2>

            <div className="space-y-4 text-base md:text-lg text-gray-300 leading-relaxed border-l border-gray-600 pl-4">
              <p>我不是老师，也不是喊单员</p>
              <p>
                我只做一件事：让交易可以像运动训练一样，被拆解、被反复练习、被量化评估
                
              </p>
      
            
              <p>
                如果你想通过交易过上自由的生活，并且愿意服从训练纪律、敢于面对自己，欢迎加入富利者训练营。
              </p>
            </div>
          </div>

          {/* 右侧：我的职业故事 */}
          <div className="bg-black dark:bg-black text-white border border-gray-800 rounded-3xl p-8 md:p-10 lg:p-12">
            <p className="text-sm font-semibold text-yellow-400 mb-4">
              我的职业故事
            </p>
            <div className="space-y-3 text-base md:text-lg text-gray-300 leading-relaxed">
              <p>
                2020年我离开华尔街量化基金，带着50万刀和量化思维回国；
                
              </p>
              <p>
                用了三年时间打造出了现在的训练体系和量化策略
          
              </p>
              
             
              <p>
                 因为见过太多交易员有行情就满仓上，没计划只靠感觉；账面盈亏像过山车，复盘只停留在“下次不能这样”
              </p>
              <p>所以，我做了这件事：
                把交易当做一项“科学训练工程”，而不是一场情绪赌博</p>
                 <p>我希望通过科学，系统性的训练模式，让每一位学员能快速上战场，先赚钱，后学习！</p>
                  <p>过去的两年里，每年送 1,000 名毕业生上岗位，劝退 100,000 名赌徒</p>
                  <p>这是我的科学训练体系，也可能是你在二级市场翻身的机会
                </p>
            </div>
          </div>
        </div>

        {/* 底部排名数据 */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-black dark:bg-black text-white border border-gray-800 rounded-3xl p-6 text-center">
            <p className="text-sm text-gray-400 mb-2">资产管理规模</p>
            <p className="text-3xl md:text-4xl font-black">150M+</p>
          </div>
          <div className="bg-black dark:bg-black text-white border border-gray-800 rounded-3xl p-6 text-center">
            <p className="text-sm text-gray-400 mb-2">已参与训练训练人数</p>
            <p className="text-3xl md:text-4xl font-black">13000+</p>
          </div>
          <div className="bg-black dark:bg-black text-white border border-gray-800 rounded-3xl p-6 text-center">
            <p className="text-sm text-gray-400 mb-2">长期在训学员</p>
            <p className="text-3xl md:text-4xl font-black">500+</p>
          </div>
          <div className="bg-black dark:bg-black text-white border border-gray-800 rounded-3xl p-6 text-center">
            <p className="text-sm text-gray-400 mb-2">职业交易员</p>
            <p className="text-3xl md:text-4xl font-black">100+</p>
          </div>
        </div>
      </div>

      {/* 职业发展路径 - 改为武器/军令双卡片 */}
      <div className="bg-black dark:bg-black py-20 border-y-2 border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* 左侧：三大独家法门 */}
            <div className="bg-black dark:bg-black text-white border border-gray-800 rounded-3xl p-8 md:p-10 lg:p-12">
              <p className="text-sm font-semibold text-yellow-400 mb-4">
                三大独家法门
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-8">
                一套方法不够 · 我们给你三大训练引擎
              </h2>

              <div className="space-y-6">
                {/* 武器 1 */}
                <div className="border border-gray-800 rounded-2xl px-6 py-5 flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full border border-yellow-400 flex items-center justify-center flex-shrink-0">
                    <span className="text-yellow-400 font-bold">1</span>
                  </div>
                  <div>
                    <p className="text-lg font-bold mb-1 text-white">华尔街未公开技术</p>
                    <p className="text-sm text-gray-300">
                      独家技术理论+量化交指标系统+流程化训练引擎，从”认知—方法—执行—复盘“拆解整个交易闭环，最终形成标准化
                    </p>
                  </div>
                </div>

                {/* 武器 2 */}
                <div className="border border-gray-800 rounded-2xl px-6 py-5 flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full border border-yellow-400 flex items-center justify-center flex-shrink-0">
                    <span className="text-yellow-400 font-bold">2</span>
                  </div>
                  <div>
                    <p className="text-lg font-bold mb-1 text-white">全球卫星系统</p>
                    <p className="text-sm text-gray-300">
                      AI 实时监控全球品种走势，推送专属策略信号，通过量化帮助真正形成人机结合的交易系统，让服从纪律大于主观判断
                    </p>
                  </div>
                </div>

                {/* 武器 3 */}
                <div className="border border-gray-800 rounded-2xl px-6 py-5 flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full border border-yellow-400 flex items-center justify-center flex-shrink-0">
                    <span className="text-yellow-400 font-bold">3</span>
                  </div>
                  <div>
                    <p className="text-lg font-bold mb-1 text-white">团队矩阵作战</p>
                    <p className="text-sm text-gray-300">
                      所有交易员纳入矩阵实行并肩作战，一人回撤由全队纠偏，实现风险对冲，稳定放大盈利结果
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 右侧：三句军令 */}
            <div className="bg-black dark:bg-black text-white border border-gray-800 rounded-3xl p-8 md:p-10 lg:p-12">
              <p className="text-sm font-semibold text-yellow-400 mb-4">
                三大铁律 · 永不更改
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-8">
                纪律刻在血液里 · 肩负起自己的使命
              </h2>

              <div className="space-y-6">
                {/* 军令 1 */}
                <div className="border border-gray-800 rounded-2xl px-6 py-5 flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full border border-yellow-400 flex items-center justify-center flex-shrink-0">
                    <span className="text-yellow-400 font-bold">1</span>
                  </div>
                  <div>
                    <p className="text-lg font-bold mb-1 text-white">纪律至上</p>
                    <p className="text-sm text-gray-300">
                      所有决策都围绕交易纪律和科学交易系统执行，情绪化自动出局
                    </p>
                  </div>
                </div>

                {/* 军令 2 */}
                <div className="border border-gray-800 rounded-2xl px-6 py-5 flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full border border-yellow-400 flex items中心 justify-center flex-shrink-0">
                    <span className="text-yellow-400 font-bold">2</span>
                  </div>
                  <div>
                    <p className="text-lg font-bold mb-1 text白">集体作战</p>
                    <p className="text-sm text-gray-300">
                      一人亏损全队承受；全队盈利全员共享收益，盈亏荣辱与共，每个交易员都要尽职尽责
                    </p>
                  </div>
                </div>

                {/* 军令 3 */}
                <div className="border border-gray-800 rounded-2xl px-6 py-5 flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full border border-yellow-400 flex items-center justify-center flex-shrink-0">
                    <span className="text-yellow-400 font-bold">3</span>
                  </div>
                  <div>
                    <p className="text-lg font-bold mb-1 text-white">战功晋升</p>
                    <p className="text-sm text-gray-300">
                      凭借可追踪的战功晋升权益，包括不限于解锁更高资金、更高权重，成为团队管理者等等
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

        {/* 成长路径 / 晋升体系 */}
      <div className="bg-black dark:bg-black py-20 border-y-2 border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-center mb-4 text-white">
            明确考核标准与权益 · 保证你走得快、走得稳、走得远
          </h2>
          <p className="text-center text-gray-400 mb-12 text-sm md:text-base">
            每一个等级，都对应清晰的「权益」与「考核标准」，你只需按要求完成，剩下交给系统和团队。
          </p>

          <div className="overflow-hidden rounded-3xl border border-gray-800 bg-gradient-to-b from-gray-950 to-black">
            {/* 表头 */}
            <div className="grid grid-cols-12 px-6 py-4 border-b border-gray-800 text-xs md:text-sm text-gray-400 uppercase tracking-[0.2em]">
              <div className="col-span-3 md:col-span-3">RANK</div>
              <div className="col-span-5 md:col-span-5">权益</div>
              <div className="col-span-4 md:col-span-4 text-right md:text-left">考核标准</div>
            </div>

            <div className="divide-y divide-gray-800">
              {/* 1 入门新人（学员） */}
              <div className="grid grid-cols-12 px-6 py-6 gap-4 text-sm md:text-base">
                <div className="col-span-3 md:col-span-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-yellow-400 flex items-center justify-center">
                    <span className="text-yellow-400 font-bold text-base">1</span>
                  </div>
                  <div>
                    <p className="font-bold text-white">入门学员</p>
                    <p className="text-xs text-yellow-500">RANK</p>
                  </div>
                </div>
                <div className="col-span-5 md:col-span-5 flex items-center">
                  <p className="text-gray-300">
                    解锁交易系统，熟悉科学交易动作，完成基础训练，固化交易策略
                  </p>
                </div>
                <div className="col-span-4 md:col-span-4 flex items-center md:justify-start justify-end">
                  <p className="text-gray-400 text-right md:text-left">
                    连续 10 日练习，每日 ≥ 8 笔，按要求记录与复盘。
                  </p>
                </div>
              </div>

              {/* 2 预备交易员 */}
              <div className="grid grid-cols-12 px-6 py-6 gap-4 text-sm md:text-base">
                <div className="col-span-3 md:col-span-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-yellow-400 flex items-center justify-center">
                    <span className="text-yellow-400 font-bold text-base">2</span>
                  </div>
                  <div>
                    <p className="font-bold text-white">预备交易员</p>
                    <p className="text-xs text-yellow-500">RANK</p>
                  </div>
                </div>
                <div className="col-span-5 md:col-span-5 flex items-center">
                  <p className="text-gray-300">
                    解锁全球卫星系统（AI 监控），获得实时策略信号
                  </p>
                </div>
                <div className="col-span-4 md:col-span-4 flex items-center md:justify-start justify-end">
                  <p className="text-gray-400 text-right md:text-left">
                    连续 4 周实盘（团队提供），每周 ≥ 200 美元收益，回撤 ≤ 25%
                  </p>
                </div>
              </div>

              {/* 3 初级交易员 */}
              <div className="grid grid-cols-12 px-6 py-6 gap-4 text-sm md:text-base">
                <div className="col-span-3 md:col-span-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-yellow-400 flex items-center justify-center">
                    <span className="text黄色-400 font-bold text-base">3</span>
                  </div>
                  <div>
                    <p className="font-bold text-white">初级交易员</p>
                    <p className="text-xs text-yellow-500">RANK</p>
                  </div>
                </div>
                <div className="col-span-5 md:col-span-5 flex items-center">
                  <p className="text-gray-300">
                    加入矩阵，个人盈利 60%-90% + 矩阵季度分润。
                  </p>
                </div>
                <div className="col-span-4 md:col-span-4 flex items-center md:justify-start justify-end">
                  <p className="text-gray-400 text-right md:text-left">
                    保持周盈利，日回撤 ≤ 15%，周回撤 ≤ 25%。
                  </p>
                </div>
              </div>

              {/* 4 中级交易员 */}
              <div className="grid grid-cols-12 px-6 py-6 gap-4 text-sm md:text-base">
                <div className="col-span-3 md:col-span-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-yellow-400 flex items-center justify-center">
                    <span className="text-yellow-400 font-bold text-base">4</span>
                  </div>
                  <div>
                    <p className="font-bold text-white">中级交易员</p>
                    <p className="text-xs text-yellow-500">RANK</p>
                  </div>
                </div>
                <div className="col-span-5 md:col-span-5 flex items-center">
                  <p className="text-gray-300">
                    解锁更全体系技术理论，进入核心资金池
                  </p>
                </div>
                <div className="col-span-4 md:col-span-4 flex items-center md:justify-start justify-end">
                  <p className="text-gray-400 text-right md:text-left">
                    实盘两年以上或贡献 2 万美元利润。
                  </p>
                </div>
              </div>

              {/* 5 高级交易员 */}
              <div className="grid grid-cols-12 px-6 py-6 gap-4 text-sm md:text-base">
                <div className="col-span-3 md:col-span-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border黄色-400 flex items-center justify-center">
                    <span className="text-yellow-400 font-bold text-base">5</span>
                  </div>
                  <div>
                    <p className="font-bold text-white">高级交易员</p>
                    <p className="text-xs text-yellow-500">RANK</p>
                  </div>
                </div>
                <div className="col-span-5 md:col-span-5 flex items-center">
                  <p className="text-gray-300">
                    解锁稳定高额度资金权限，解锁基金经理雏形
                  </p>
                </div>
                <div className="col-span-4 md:col-span-4 flex items中心 md:justify-start justify-end">
                  <p className="text-gray-400 text-right md:text-left">
                    实盘五年以上或贡献 10 万美元利润。
                  </p>
                </div>
              </div>

              {/* 6 团队长 */}
              <div className="grid grid-cols-12 px-6 py-6 gap-4 text-sm md:text-base">
                <div className="col-span-3 md:col-span-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-yellow-400 flex items-center justify-center">
                    <span className="text-yellow-400 font-bold text-base">6</span>
                  </div>
                  <div>
                    <p className="font-bold text-white">团队长</p>
                    <p className="text-xs text-yellow-500">RANK</p>
                  </div>
                </div>
                <div className="col-span-5 md:col-span-5 flex items-center">
                  <p className="text-gray-300">
                    享每位士兵盈利 20% 分成，根据战绩共享盈利
                  </p>
                </div>
                <div className="col-span-4 md:col-span-4 flex items-center md:justify-start justify-end">
                  <p className="text-gray-400 text-right md:text-left">
                    3 个作战小组，每组 3 人，统计综合数据
                  </p>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


     

            {/* 富利者特训营入营通道选择器 */}
      <EntrySelector
        onStandardClick={() => router.push(`/${language}/splan/join-us`)}
        onEliteClick={() => router.push(`/${language}/splan/elite-evaluation`)}
        onPremiumClick={() => setIsEmailModalOpen(true)}
      />

             {/* Comparison – 用竞品对比替代“了解交易员职业” */}
        <section className="bg-black dark:bg-black text-white rounded-3xl border border-gray-800 px-6 py-14">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-10">
            富利者 vs 其它 · 差距不仅在技术战术而且在理念
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Column 1 – 富利者训练营 */}
            <div className="bg-gradient-to-b from-yellow-900/40 to-black border border-yellow-500/70 rounded-3xl p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-lg font-bold text-yellow-400">富利者训练营</p>
                <span className="text-xs px-3 py-1 border border-yellow-400 rounded-full">核心</span>
              </div>

              <div className="space-y-3 text-sm">
                <div className="bg-black/40 rounded-2xl px-4 py-3 flex justify-between">
                  <span className="text-gray-400">定位</span>
                  <span className="font-semibold text-white">科学训练系统</span>
                </div>
                <div className="bg-black/40 rounded-2xl px-4 py-3 flex justify-between">
                  <span className="text-gray-400">价格</span>
                  <span className="font-semibold text-white">98</span>
                </div>
                <div className="bg-black/40 rounded-2xl px-4 py-3 flex justify-between">
                  <span className="text-gray-400">实盘机制</span>
                  <span className="font-semibold text-white">提供实盘资金</span>
                </div>
                <div className="bg-black/40 rounded-2xl px-4 py-3 flex justify-between">
                  <span className="text-gray-400">核心特点</span>
                  <span className="font-semibold text-white text-right">
                    简单易复制盈利，团队作战
                  </span>
                </div>
                <div className="bg-black/40 rounded-2xl px-4 py-3 flex justify-between">
                  <span className="text-gray-400">晋升</span>
                  <span className="font-semibold text-white text-right">
                    发展前途全面，路径透明
                  </span>
                </div>
                <div className="bg-black/40 rounded-2xl px-4 py-3 flex justify-between">
                  <span className="text-gray-400">退款</span>
                  <span className="font-semibold text-white text-right">
                    7天内可全额退
                  </span>
                </div>
              </div>
            </div>

            {/* Column 2 – 某十交易 */}
            <div className="bg-black border border-gray-800 rounded-3xl p-6 flex flex-col gap-4">
              <p className="text-lg font-bold text-white mb-2">某十交易课程</p>
              <div className="space-y-3 text-sm">
                <div className="bg-white/5 rounded-2xl px-4 py-3 flex justify-between">
                  <span className="text-gray-400">定位</span>
                  <span className="font-semibold">课程</span>
                </div>
                <div className="bg-white/5 rounded-2xl px-4 py-3 flex justify-between">
                  <span className="text-gray-400">价格</span>
                  <span className="font-semibold">49,998</span>
                </div>
                <div className="bg-white/5 rounded-2xl px-4 py-3 flex justify-between">
                  <span className="text-gray-400">实盘机制</span>
                  <span className="font-semibold">自负盈亏</span>
                </div>
                <div className="bg-white/5 rounded-2xl px-4 py-3 flex justify-between">
                  <span className="text-gray-400">核心特点</span>
                  <span className="font-semibold text-right">
                    课程内容多，但很难真正落地盈利
                  </span>
                </div>
                <div className="bg-white/5 rounded-2xl px-4 py-3 flex justify-between">
                  <span className="text-gray-400">晋升</span>
                  <span className="font-semibold">无</span>
                </div>
                <div className="bg-white/5 rounded-2xl px-4 py-3 flex justify-between">
                  <span className="text-gray-400">退款</span>
                  <span className="font-semibold">不退款</span>
                </div>
              </div>
            </div>

            {/* Column 3 – 跟单社区 VIP */}
            <div className="bg-black border border-gray-800 rounded-3xl p-6 flex flex-col gap-4">
              <p className="text-lg font-bold text-white mb-2"> 某跟单社区VIP</p>
              <div className="space-y-3 text-sm">
                <div className="bg-white/5 rounded-2xl px-4 py-3 flex justify-between">
                  <span className="text-gray-400">定位</span>
                  <span className="font-semibold">社群</span>
                </div>
                <div className="bg白/5 rounded-2xl px-4 py-3 flex justify-between">
                  <span className="text-gray-400">价格</span>
                  <span className="font-semibold">18888 / 年</span>
                </div>
                <div className="bg白/5 rounded-2xl px-4 py-3 flex justify-between">
                  <span className="text-gray-400">实盘机制</span>
                  <span className="font-semibold">自负盈亏</span>
                </div>
                <div className="bg白/5 rounded-2xl px-4 py-3 flex justify-between">
                  <span className="text-gray-400">核心特点</span>
                  <span className="font-semibold text-right">
                    只能被动跟单，难以稳定盈利
                  </span>
                </div>
                <div className="bg白/5 rounded-2xl px-4 py-3 flex justify-between">
                  <span className="text-gray-400">晋升</span>
                  <span className="font-semibold">无</span>
                </div>
                <div className="bg白/5 rounded-2xl px-4 py-3 flex justify-between">
                  <span className="text-gray-400">退款</span>
                  <span className="font-semibold">不退款</span>
                </div>
              </div>
            </div>

            {/* Column 4 – 某量化策略 */} 
            <div className="bg黑 border border-gray-800 rounded-3xl p-6 flex flex-col gap-4">
              <p className="text-lg font-bold text-white mb-2">某量化策略</p>
              <div className="space-y-3 text-sm">
                <div className="bg白/5 rounded-2xl px-4 py-3 flex justify-between">
                  <span className="text-gray-400">定位</span>
                  <span className="font-semibold">自动化交易</span>
                </div>
                <div className="bg白/5 rounded-2xl px-4 py-3 flex justify-between">
                  <span className="text-gray-400">价格</span>
                  <span className="font-semibold">29,800</span>
                </div>
                <div className="bg白/5 rounded-2xl px-4 py-3 flex justify-between">
                  <span className="text-gray-400">实盘机制</span>
                  <span className="font-semibold">自负盈亏</span>
                </div>
                <div className="bg白/5 rounded-2xl px-4 py-3 flex justify-between">
                  <span className="text-gray-400">核心特点</span>
                  <span className="font-semibold text-right">
                    人工高频，可短期盈利，但容易被 EA 替代
                  </span>
                </div>
                <div className="bg白/5 rounded-2xl px-4 py-3 flex justify-between">
                  <span className="text-gray-400">晋升</span>
                  <span className="font-semibold">无</span>
                </div>
                <div className="bg白/5 rounded-2xl px-4 py-3 flex justify-between">
                  <span className="text-gray-400">退款</span>
                  <span className="font-semibold">不退款</span>
                </div>
              </div>
            </div>
          </div>
        </section>


      {/* 学员展示 - 收益滚动 */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-4 text-black dark:text-white border-b-4 border-black dark:border-white inline-block pb-2 w-full">
          {t('showcase.title')}
        </h2>

        {/* 收益统计 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 p-6 border-2 border-gray-200 dark:border-gray-700 text-center">
            <div className="text-4xl font-black text-black dark:text-white mb-2">{t('showcase.junior')}</div>
            <p className="text-2xl font-bold text-black dark:text-white">¥10,000 - ¥30,000</p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">{t('showcase.income.range')}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 border-2 border-black dark:border-white text-center">
            <div className="text-4xl font-black text-black dark:text-white mb-2">{t('showcase.intermediate')}</div>
            <p className="text-2xl font-bold text-black dark:text-white">¥30,000 - ¥60,000</p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">{t('showcase.income.range')}</p>
          </div>
          <div className="bg-black dark:bg-white p-6 border-2 border-black dark:border-white text-center">
            <div className="text-4xl font-black text-white dark:text-black mb-2">{t('showcase.senior')}</div>
            <p className="text-2xl font-bold text-white dark:text-black">¥60,000 - ¥100,000+</p>
            <p className="text-sm text-gray-400 dark:text-gray-600 mt-2">{t('showcase.income.range')}</p>
          </div>
        </div>

        {/* 收益图片滚动展示 - 每次显示3张 */}
        <div className="bg-gray-100 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 p-8">
          <h3 className="text-2xl font-bold text-center mb-6 text-black dark:text-white">
            {t('showcase.screenshots.title')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[0, 1, 2].map((offset) => {
              const imageIndex = currentImageIndex + offset;
              const image = profitImages[imageIndex < profitImages.length ? imageIndex : imageIndex - profitImages.length];
              return (
                <div key={offset} className="relative h-80 overflow-hidden bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600">
                  <div className="relative w-full h-full flex items-center justify-center p-4">
                    <img
                      src={image}
                      alt={`学员收益 ${imageIndex + 1}`}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('showcase.screenshots.note')}
            </p>
          </div>
        </div>
      </div>

  

      {/* Email Contact Modal */}
      {/* Testimonials */}
      <Testimonials />

      {/* Interview CTA */}
      <InterviewCTA />

      <EmailContactModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        title="职业交易员面试"
      />
    </div>
  );
};

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="w-full bg-black dark:bg-black text-white dark:text-white">
      <DummyContent />
    </div>
  );
}
