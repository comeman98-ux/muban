"use client";

import { useLanguage } from '@/contexts/LanguageContext';

export default function BrandName() {
  const { language } = useLanguage();

  if (language === 'zh') {
    return (
      <>
        <span className="font-black">富</span>
        <span className="font-normal text-gray-600 dark:text-gray-400">利者</span>
      </>
    );
  }

  return (
    <>
      <span className="font-black text-gray-600 dark:text-gray-400">Fulizhe</span>
    </>
  );
}
