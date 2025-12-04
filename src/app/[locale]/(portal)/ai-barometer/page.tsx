"use client";

import React from "react";
import AIBarometerSection from "@/components/custom/AIBarometerSection";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AIBarometerPage() {
  const { language } = useLanguage();
  const isZh = language === "zh";

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-20 flex flex-col">
      <AIBarometerSection />
      <div className="mt-8 mb-12 px-6">
        <p className="text-xs md:text-sm text-center text-gray-500 dark:text-gray-500 max-w-5xl mx-auto">
          {isZh
            ? "注：AI 晴雨表仅用于市场状态分析，不构成投资建议"
            : "Note: The AI Barometer is for market state analysis only and does not constitute investment advice."}
        </p>
      </div>
    </div>
  );
}

