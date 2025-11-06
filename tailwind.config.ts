import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 主色：专业蓝（默认对齐到蓝 600 / 700 档位）
        primary: {
          DEFAULT: '#2563eb', // 蓝 600
          foreground: '#ffffff',
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb', // 指定色
          700: '#1d4ed8', // 指定色（偏深）
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        // 辅助色：橙色（对齐到琥珀/橙 500/600 档位）
        secondary: {
          DEFAULT: '#f59e0b', // 橙/琥珀 500
          foreground: '#111827',
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b', // 指定色
          600: '#d97706', // 指定色（偏深）
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
        // 背景与表面
        background: {
          DEFAULT: '#f8fafc', // 浅灰背景
          dark: '#0b1220',
        },
        surface: {
          DEFAULT: '#ffffff',
          dark: '#111827',
        },
        // 文本
        text: {
          DEFAULT: '#1f2937', // 深灰正文
          muted: '#4b5563',
          inverted: '#ffffff',
        },
        // 边框/分割线
        border: {
          DEFAULT: '#e5e7eb',
          dark: '#1f2937',
        },
        // 次要背景（卡片、块）
        muted: {
          DEFAULT: '#f1f5f9', // slate-100 近似
          dark: '#374151',
        },
        // 交互态颜色（焦点环等）
        ring: {
          DEFAULT: '#2563eb',
          offset: '#ffffff',
        },
        // 成功/警告/危险（可选，常用在营销页表单与提示）
        success: {
          DEFAULT: '#16a34a',
          foreground: '#ffffff',
        },
        warning: {
          DEFAULT: '#f59e0b',
          foreground: '#111827',
        },
        danger: {
          DEFAULT: '#dc2626',
          foreground: '#ffffff',
        },
      },
    },
  },
};

export default config;
