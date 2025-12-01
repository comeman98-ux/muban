"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import EmailContactModal from "./EmailContactModal";
import ShineButton from "./ShineButton";

type Feature = {
  icon: string;
  text: string;
};

type CtaContent = {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  button: string;
  features: Feature[];
  note: string;
};

const content: Record<"zh" | "en", CtaContent> = {
  zh: {
    badge: "开始你的交易员之路",
    title: "如果你想有一次实现理想的机会",
    subtitle: "立即预约，开启你的职业交易员生涯",
    description:
      "我们会培养有潜力的交易员候选人，通过考核即可获得资金支持。",
    button: "立即预约加入",
    features: [
      { icon: "✅", text: "低成本、专注交易训练" },
      { icon: "✅", text: "30 天系统化学习与实战演练" },
      { icon: "✅", text: "通过考核即可获得实盘资金" },
      { icon: "✅", text: "60–90% 高比例分成" },
    ],
    note: "注意：每人只有一次机会，请确认自己符合条件，再提交申请。",
  },
  en: {
    badge: "Start Your Trader Journey",
    title: "Ready to Change Your Life?",
    subtitle: "Book now and start your professional trader career",
    description:
      "We are looking for high‑potential trader candidates. Join a completely free 30‑day training camp and receive funding once you pass the evaluation.",
    button: "Apply for Interview Now",
    features: [
      { icon: "✅", text: "Low‑cost, focused training" },
      { icon: "✅", text: "30‑day structured learning and practice" },
      { icon: "✅", text: "Get funded after passing evaluation" },
      { icon: "✅", text: "60–90% profit‑sharing model" },
    ],
    note: "Note: You only have one chance. Please make sure you meet all requirements before applying.",
  },
};

export default function InterviewCTA() {
  const { language } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const current =
    language === "en" ? content.en : content.zh;

  return (
    <>
      <section className="relative py-24 overflow-hidden bg-black dark:bg-black">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 50px, currentColor 50px, currentColor 51px), repeating-linear-gradient(90deg, transparent, transparent 50px, currentColor 50px, currentColor 51px)",
              color: "white",
            }}
          />
        </div>

        {/* Animated Borders */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute top-0 left-0 right-0 h-1 bg-white origin-left"
        />
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="absolute bottom-0 left-0 right-0 h-1 bg-white origin-right"
        />

        <div className="max-w-5xl mx-auto px-6 relative z-10 text-white">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6"
          >
            <span className="inline-block px-6 py-2 bg-black text-white text-sm font-bold tracking-wider border-2 border-white">
              {current.badge.toUpperCase()}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-center mb-4"
          >
            {current.title}
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-center mb-6 text-gray-300"
          >
            {current.subtitle}
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mb-12 text-gray-400 max-w-2xl mx-auto"
          >
            {current.description}
          </motion.p>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
          >
            {current.features.map((feature, index) => (
              <motion.div
                key={feature.text}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/20 p-4 text-center hover:bg-white/10 transition-colors"
              >
                <div className="text-3xl mb-2">{feature.icon}</div>
                <div className="text-sm font-bold text-white">{feature.text}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mb-6"
          >
            <ShineButton
              onClick={() => setIsModalOpen(true)}
              className="inline-block px-12 py-5 bg-white text-black text-xl font-bold border-4 border-white hover:bg-black hover:text-white transition-colors shadow-2xl"
            >
              {current.button}
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="inline-block ml-2"
              >
                →
              </motion.span>
            </ShineButton>
          </motion.div>

          {/* Note */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-center text-sm text-gray-500 italic"
          >
            {current.note}
          </motion.p>
        </div>
      </section>

      <EmailContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={language === "zh" ? "职业交易员面试预约" : "Professional Trader Interview"}
      />
    </>
  );
}

