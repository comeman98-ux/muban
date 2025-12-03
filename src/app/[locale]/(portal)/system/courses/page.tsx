import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function SystemCoursesPage() {
  const { t } = useLanguage();

  // 这里先做一个占位课程列表，后续可以按需求扩展
  const courses = [
    {
      id: 1,
      titleKey: "system.courses.module1.title",
      descKey: "system.courses.module1.desc",
      levelKey: "system.courses.level.basic",
      statusKey: "system.courses.status.inProgress",
    },
    {
      id: 2,
      titleKey: "system.courses.module2.title",
      descKey: "system.courses.module2.desc",
      levelKey: "system.courses.level.intermediate",
      statusKey: "system.courses.status.locked",
    },
    {
      id: 3,
      titleKey: "system.courses.module3.title",
      descKey: "system.courses.module3.desc",
      levelKey: "system.courses.level.advanced",
      statusKey: "system.courses.status.locked",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black px-4 py-24">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10">
          <div className="inline-flex items-center px-4 py-1 rounded-full border border-gray-700 bg-black/60 text-xs tracking-wide text-gray-300 mb-4">
            {t("system.courses.badge")}
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
            {t("system.courses.title")}
          </h1>
          <p className="text-sm md:text-base text-gray-400 max-w-2xl">
            {t("system.courses.subtitle")}
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          {courses.map((course) => (
            <div
              key={course.id}
              className="flex flex-col bg-black/70 border border-gray-700 rounded-xl p-5"
            >
              <div className="flex items-baseline justify-between mb-3">
                <span className="text-xs text-gray-500">
                  {t(course.levelKey)}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full border border-gray-600 text-gray-200">
                  {t(course.statusKey)}
                </span>
              </div>
              <h2 className="text-lg font-semibold text-white mb-2">
                {t(course.titleKey)}
              </h2>
              <p className="text-sm text-gray-400 flex-1">
                {t(course.descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
