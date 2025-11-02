"use client";

import React, { useEffect, useRef } from 'react';

interface LiveTradingChartProps {
  symbol: string;
  interval: string;
}

export default function LiveTradingChart({ symbol, interval }: LiveTradingChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear existing content
    containerRef.current.innerHTML = '';

    // Create TradingView widget script
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => {
      if (containerRef.current && (window as any).TradingView) {
        new (window as any).TradingView.widget({
          autosize: true,
          symbol: `BINANCE:${symbol}`,
          interval: mapInterval(interval),
          timezone: 'Asia/Shanghai',
          theme: 'light',
          style: '1',
          locale: 'zh_CN',
          toolbar_bg: '#f1f3f6',
          enable_publishing: false,
          hide_side_toolbar: false,
          allow_symbol_change: true,
          container_id: containerRef.current.id,
          studies: [
            'BB@tv-basicstudies', // Bollinger Bands
            'MASimple@tv-basicstudies', // Moving Average
          ],
          disabled_features: ['use_localstorage_for_settings'],
          enabled_features: ['study_templates'],
        });
      }
    };

    // Generate unique ID
    const widgetId = `tradingview_${Math.random().toString(36).substring(7)}`;
    containerRef.current.id = widgetId;

    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [symbol, interval]);

  return (
    <div className="w-full bg-white dark:bg-gray-900 border-2 border-black dark:border-white">
      <div
        ref={containerRef}
        className="tradingview-widget-container"
        style={{ height: '600px', width: '100%' }}
      />
    </div>
  );
}

// Map our interval format to TradingView format
function mapInterval(interval: string): string {
  const mapping: Record<string, string> = {
    '1m': '1',
    '5m': '5',
    '15m': '15',
    '1h': '60',
    '4h': '240',
    '1d': 'D',
  };
  return mapping[interval] || '15';
}
