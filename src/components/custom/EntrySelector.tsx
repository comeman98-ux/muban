"use client";

import React from "react";

interface EntrySelectorProps {
  onStandardClick: () => void;
  onEliteClick: () => void;
  onPremiumClick: () => void;
}

const EntrySelector: React.FC<EntrySelectorProps> = ({
  onStandardClick,
  onEliteClick,
  onPremiumClick,
}) => {
  return (
    <section className="bg-black dark:bg-black py-20 border-y-2 border-gray-800 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4 text-white border-b-4 border-black dark:border-white inline-block pb-2 w-full">
          富利者科学训练通道选择器
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 text-lg">
          根据你的现状与目标，从三个清晰的入营路径中选择最适合你的训练计划。
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 标准通道（核心入口） */}
          <div className="relative group bg-white dark:bg-white border-2 border-black dark:border-black shadow-xl rounded-xl overflow-hidden transform transition-transform transition-shadow hover:-translate-y-2 hover:shadow-2xl">
            <div className="absolute top-2 left-1/2 -translate-x-1/2">
              <span className="px-3 py-1 text-xs font-bold rounded-full bg-black text-white dark:bg-white dark:text-black">
                推荐
              </span>
            </div>
            <div className="p-8 pt-10 h-full flex flex-col">
              <div className="flex-1 flex flex-col">
                <div className="mb-4">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-2xl font-bold text-black">
                    标准通道
                  </h3>
                  <span className="text-xl font-extrabold text-yellow-400">
                    98<span className="text-base ml-1">元</span>
                  </span>
                </div>
                <p className="mt-3 text-sm text-gray-700">
                  支付诚意金，立即解锁全部线上训练内容。
                </p>
              </div>
              <ul className="space-y-2 text-sm text-gray-800 mb-4">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-green-500">✔</span>
                    <span>完整的45天科学化线上训练课程</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-green-500">✔</span>
                    <span>专属数据化交易日志与绩效分析系统使用权</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-green-500">✔</span>
                    <span>教练社群答疑与每日复盘会议参与资格</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-green-500">✔</span>
                    <span>完成训练并通过考核，可申请交易资金账户</span>
                  </li>
                </ul>
                <p className="text-xs text-gray-600">
                  适合决心系统化学习、从零开始构建交易体系的学员。
                </p>
              </div>
              <button
                type="button"
                onClick={onStandardClick}
                className="mt-6 w-full py-3 text-center text-sm font-bold bg-blue-600 text-white border-2 border-blue-700 hover:bg-white hover:text-blue-700 transition-colors"
              >
                立即支付，锁定席位
              </button>
            </div>
          </div>

          {/* 精英通道（免费筛选入口） */}
          <div className="group bg-gray-800 dark:bg-gray-800 border-2 border-dashed border-gray-600 dark:border-gray-600 rounded-xl p-8 flex flex-col transform transition-transform transition-shadow hover:-translate-y-2 hover:shadow-2xl">
            <div className="flex-1 flex flex-col">
              <div className="mb-4">
                <div className="flex items-baseline justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-bold text-white">
                      精英通道
                    </h3>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-purple-600 text-white">
                      挑战
                    </span>
                  </div>
                  <span className="text-xl font-extrabold text-purple-600 dark:text-purple-400">
                    免费
                  </span>
                </div>
                <p className="mt-3 text-sm text-gray-200">
                  通过精英潜力评估，证明你的卓越，免费解锁未来。
                </p>
              </div>
              <ul className="space-y-2 text-sm text-gray-100 mb-4">
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-green-500">✔</span>
                  <span>免学费（价值98元）</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-green-500">✔</span>
                  <span>与顶尖潜力学员共同进入“快车道”</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-green-500">✔</span>
                  <span>获得“精英学员”专属身份标识</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-green-500">✔</span>
                  <span>享有标准通道全部权益</span>
                </li>
              </ul>
              <div className="text-[11px] text-gray-400 space-y-1">
                <p>测评共 30 题（风控意识 / 稳定盈利思维 / 成功者特质）。</p>
                <p>得分 ≥ 90分（满分120）自动获得免费入学资格。</p>
                <p>得分 &lt; 90分 将引导你转向【标准通道】入学。</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onEliteClick}
              className="mt-6 w-full py-3 text-center text-sm font-bold bg-blue-600 text-white border-2 border-blue-700 hover:bg-white hover:text-blue-700 transition-colors"
            >
              挑战精英测评
            </button>
          </div>

          {/* 巅峰通道（高端入口） */}
          <div className="group bg-black dark:bg-gray-950 border-2 border-yellow-500 rounded-xl p-8 text-white flex flex-col transform transition-transform transition-shadow hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(0,0,0,0.7)]">
            <div className="flex-1 flex flex-col">
              <div className="mb-4">
                <div className="flex items-baseline justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-bold">
                      巅峰通道
                    </h3>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-yellow-400 text-black">
                      尊享
                    </span>
                  </div>
                  <span className="text-xl font-extrabold text-yellow-400">
                    38,000<span className="text-base ml-1">元</span>
                  </span>
                </div>
                <p className="mt-3 text-sm text-gray-200">
                  线下沉浸，直面大师，30天直达职业巅峰。
                </p>
              </div>
              <ul className="space-y-2 text-sm text-gray-100 mb-4">
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-yellow-400">★</span>
                  <span>30天线下封闭式集训（位于一线城市基地）</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-yellow-400">★</span>
                  <span>基金经理与投资总监面对面大师课</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-yellow-400">★</span>
                  <span>在导师指导下进行真实资金实战演练</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-yellow-400">★</span>
                  <span>强度极高的极端行情情景模拟</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-yellow-400">★</span>
                  <span>接入顶级交易员职业资源网络</span>
                </li>
              </ul>
              <div className="text-[11px] text-gray-200 space-y-1">
                <p>入学条件：</p>
                <p>条件一：线上特训营优秀毕业生。</p>
                <p>条件二：通过巅峰通道特别评估（适合有经验者）。</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onPremiumClick}
              className="mt-6 w-full py-3 text-center text-sm font-bold bg-blue-600 text-white border-2 border-blue-700 hover:bg-black hover:text-blue-300 transition-colors"
            >
              咨询巅峰计划
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EntrySelector;
