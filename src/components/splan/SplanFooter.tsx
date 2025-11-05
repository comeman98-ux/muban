"use client";

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { ShineLinkButton } from '@/components/custom/ShineButton';

export default function SplanFooter() {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-black dark:bg-gray-950 text-white py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <div className="flex items-center mb-4">
              <span className="text-xl font-black text-white">
                {language === 'zh' ? '汇' : 'FX'}
              </span>
              <span className="text-xl font-normal text-gray-400 ml-1">
                {language === 'zh' ? '刃' : 'Killer'}
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t('footer.about')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">{t('footer.nav.title')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/splan/join-us" className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.training')}
                </Link>
              </li>
              <li>
                <Link href="/splan/faq" className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.faq')}
                </Link>
              </li>
              <li>
                <Link href="/splan/psychology-test" className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.psychology')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold mb-4">{t('footer.resources.title')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.dashboard')}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  {language === 'zh' ? '隐私政策' : 'Privacy Policy'}
                </Link>
              </li>
              <li>
                <a href="https://www.bilibili.com/video/BV19a411X7eY" target="_blank" rel="noopener noreferrer"
                   className="text-gray-400 hover:text-white transition-colors">
                  {t('video.doc1.title')}
                </a>
              </li>
              <li>
                <a href="https://www.bilibili.com/video/BV1FZ4y1o734" target="_blank" rel="noopener noreferrer"
                   className="text-gray-400 hover:text-white transition-colors">
                  {t('video.doc2.title')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">{t('footer.contact.title')}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>{t('footer.contact.focus')}</li>
              <li>{t('footer.contact.cultivate')}</li>
              <li className="pt-2">
                <ShineLinkButton
                  href="/splan/join-us"
                  className="inline-block px-4 py-2 bg-black dark:bg-white text-white dark:text-black">
                  {t('footer.contact.apply')}
                </ShineLinkButton>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media & Contact */}
        <div className="border-t border-gray-800 pt-8 pb-8">
          <div className="text-center mb-4">
            <h4 className="font-bold text-white mb-6">{language === 'zh' ? '关注我们' : 'Follow Us'}</h4>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-6">
            {/* Telegram */}
            <a
              href="https://t.me/binance_cashcontrol"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <div className="w-12 h-12 border-2 border-gray-700 group-hover:border-white flex items-center justify-center transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                </svg>
              </div>
              <span className="text-xs">@binance_cashcontrol</span>
            </a>

            {/* X (Twitter) */}
            <a
              href="https://x.com/RealFXkiller"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <div className="w-12 h-12 border-2 border-gray-700 group-hover:border-white flex items-center justify-center transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </div>
              <span className="text-xs">@RealFXkiller</span>
            </a>

            {/* YouTube */}
            <a
              href="https://www.youtube.com/@FX-Killer-Trader"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <div className="w-12 h-12 border-2 border-gray-700 group-hover:border-white flex items-center justify-center transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
              <span className="text-xs">FX Killer Trader</span>
            </a>

            {/* WeChat */}
            <div className="group flex flex-col items-center gap-2 text-gray-400">
              <div className="w-12 h-12 border-2 border-gray-700 group-hover:border-white flex items-center justify-center transition-colors cursor-pointer">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 6.025-1.31-.452-3.79-4.214-6.876-8.768-6.876zm-2.924 5.232a.72.72 0 0 1 .717-.72.72.72 0 0 1 .718.72.72.72 0 0 1-.718.72.72.72 0 0 1-.717-.72zm5.674 0a.72.72 0 0 1 .717-.72.72.72 0 0 1 .717.72.72.72 0 0 1-.717.72.72.72 0 0 1-.717-.72zm7.735 4.55c0-3.564-3.51-6.446-7.835-6.446-4.325 0-7.835 2.882-7.835 6.446 0 1.948 1.03 3.703 2.646 4.895a.52.52 0 0 1 .188.586l-.344 1.304a.488.488 0 0 0-.042.188c0 .144.115.26.255.26a.289.289 0 0 0 .148-.047l1.677-.982a.762.762 0 0 1 .632-.086c.784.19 1.61.295 2.475.295 4.325 0 7.835-2.882 7.835-6.446zm-9.606-1.31a.635.635 0 0 1-.633-.634c0-.35.283-.633.633-.633.35 0 .634.283.634.633a.635.635 0 0 1-.634.633zm3.81 0a.635.635 0 0 1-.633-.634c0-.35.283-.633.633-.633.35 0 .634.283.634.633a.635.635 0 0 1-.634.633z"/>
                </svg>
              </div>
              <span className="text-xs">DerrenX</span>
            </div>

            {/* Email */}
            <a
              href="mailto:x.stark.dylan@gmail.com"
              className="group flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <div className="w-12 h-12 border-2 border-gray-700 group-hover:border-white flex items-center justify-center transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <span className="text-xs">x.stark.dylan@gmail.com</span>
            </a>
          </div>
        </div>

        {/* Partners Section */}
        <div className="border-t border-gray-800 pt-12 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Brokers */}
            <div className="bg-gray-900 dark:bg-gray-950 border border-gray-800 p-6 hover:border-gray-700 transition-colors">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
                <h5 className="font-bold text-white">{t('footer.partners.brokers')}</h5>
              </div>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://i.ecmarkets.com/api/client/pm/2/99R9C"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between text-gray-400 hover:text-white transition-colors"
                  >
                    <span className="font-medium">EC Markets</span>
                    <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="https://my.tickmill.com?utm_campaign=ib_link&utm_content=IB47958600&utm_medium=Open+Account&utm_source=link&lp=https%3A%2F%2Fmy.tickmill.com%2Fzh%2Fsign-up%2F"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between text-gray-400 hover:text-white transition-colors"
                  >
                    <span className="font-medium">TickMill</span>
                    <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>

            {/* Prop Firms */}
            <div className="bg-gray-900 dark:bg-gray-950 border border-gray-800 p-6 hover:border-gray-700 transition-colors">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <h5 className="font-bold text-white">{t('footer.partners.propfirms')}</h5>
              </div>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://ftmo.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between text-gray-400 hover:text-white transition-colors"
                  >
                    <span className="font-medium">FTMO</span>
                    <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="https://fundednext.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between text-gray-400 hover:text-white transition-colors"
                  >
                    <span className="font-medium">FundedNext</span>
                    <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>

            {/* Platforms & Tools */}
            <div className="bg-gray-900 dark:bg-gray-950 border border-gray-800 p-6 hover:border-gray-700 transition-colors md:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
                <h5 className="font-bold text-white">{t('footer.partners.platforms')}</h5>
              </div>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://metaapi.cloud/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block text-gray-400 hover:text-white transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">MetaAPI</span>
                      <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                    <div className="text-xs mt-1 text-gray-500">{t('footer.partners.copytrading')}</div>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.metatrader4.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block text-gray-400 hover:text-white transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">MetaTrader 4/5</span>
                      <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                    <div className="text-xs mt-1 text-gray-500">{t('footer.partners.tools')}</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>2024-2025 {t('footer.copyright')}</p>
          <p className="mt-2 text-xs">
            {t('footer.disclaimer')}
          </p>
        </div>
      </div>
    </footer>
  );
}
