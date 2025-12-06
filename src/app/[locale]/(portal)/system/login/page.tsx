"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { useLanguage } from "@/contexts/LanguageContext";
import LocaleLink from "@/components/navigation/LocaleLink";

export default function SystemLoginPage() {
  const { t, language } = useLanguage();
  const router = useRouter();
  const [identityId, setIdentityId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/system/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identityId, password }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.success) {
        setError(
          data?.message || t("system.login.error"),
        );
        return;
      }

      router.push(`/${language}/system`);
    } catch {
      setError(t("system.login.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black flex items-center justify-center px-4 py-24">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/80 border border-gray-700 rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="px-8 pt-8 pb-6 border-b border-gray-800">
            <div className="inline-flex items-center px-4 py-1 rounded-full border border-gray-700 bg-black/60 text-xs tracking-wide text-gray-300 mb-4">
              {t("system.login.badge")}
            </div>
            <h1 className="text-3xl font-black text-white mb-2">
              {t("system.login.title")}
            </h1>
            <p className="text-sm text-gray-400">
              {t("system.login.subtitle")}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="px-8 pt-6 pb-8 space-y-5">
            {error && (
              <div className="text-sm text-red-400 bg-red-900/20 border border-red-500/60 rounded-md px-3 py-2">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-200">
                {t("system.login.identityLabel")}
              </label>
              <input
                type="text"
                value={identityId}
                onChange={(e) => setIdentityId(e.target.value.trim())}
                placeholder={t("system.login.identityPlaceholder")}
                className="w-full px-3 py-2 bg-black border border-gray-700 rounded-md text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-200">
                {t("system.login.passwordLabel")}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t("system.login.passwordPlaceholder")}
                className="w-full px-3 py-2 bg-black border border-gray-700 rounded-md text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded-md text-sm font-semibold bg-yellow-500 text-black hover:bg-yellow-400 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? t("system.login.loading") : t("system.login.submit")}
              </button>
              <LocaleLink
                href="/"
                className="flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded-md text-sm font-semibold border border-gray-600 text-gray-100 hover:bg-gray-900 transition-colors"
              >
                {t("system.login.backHome")}
              </LocaleLink>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
