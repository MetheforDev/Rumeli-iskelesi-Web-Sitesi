"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

type WeatherData = {
  tempC: number;
  feelsLikeC: number;
  humidity: number;
  windKmph: number;
  code: number;
};

const WEATHER_ICONS: Record<number, string> = {
  113: "☀️",
  116: "⛅",
  119: "☁️",
  122: "☁️",
  143: "🌫️",
  176: "🌦️",
  179: "🌨️",
  182: "🌧️",
  185: "🌧️",
  200: "⛈️",
  227: "❄️",
  230: "❄️",
  248: "🌫️",
  260: "🌫️",
  263: "🌦️",
  266: "🌧️",
  281: "🌧️",
  284: "🌧️",
  293: "🌦️",
  296: "🌧️",
  299: "🌧️",
  302: "🌧️",
  305: "🌧️",
  308: "🌧️",
  311: "🌧️",
  314: "🌧️",
  317: "🌨️",
  320: "🌨️",
  323: "🌨️",
  326: "🌨️",
  329: "❄️",
  332: "❄️",
  335: "❄️",
  338: "❄️",
  350: "🌧️",
  353: "🌦️",
  356: "🌧️",
  359: "🌧️",
  362: "🌨️",
  365: "🌨️",
  368: "🌨️",
  371: "❄️",
  374: "🌧️",
  377: "🌧️",
  386: "⛈️",
  389: "⛈️",
  392: "⛈️",
  395: "❄️",
};

function getWeatherIcon(code: number): string {
  return WEATHER_ICONS[code] ?? "🌤️";
}

export function WeatherWidget() {
  const t = useTranslations("weather");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("https://wttr.in/Tekirdag?format=j1")
      .then((r) => r.json())
      .then((data) => {
        const c = data.current_condition[0];
        setWeather({
          tempC: Number(c.temp_C),
          feelsLikeC: Number(c.FeelsLikeC),
          humidity: Number(c.humidity),
          windKmph: Number(c.windspeedKmph),
          code: Number(c.weatherCode),
        });
      })
      .catch(() => setError(true));
  }, []);

  if (error) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.1, duration: 0.5 }}
      className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-black/30 backdrop-blur-sm text-sm"
    >
      {weather ? (
        <>
          <span className="text-xl leading-none">{getWeatherIcon(weather.code)}</span>
          <div className="flex flex-col leading-none gap-0.5">
            <span className="text-white font-semibold">{weather.tempC}°C</span>
            <span className="text-zinc-500 text-[10px]">
              {t("feels_like")} {weather.feelsLikeC}°C · {t("wind")} {weather.windKmph} {t("wind_unit")}
            </span>
          </div>
          <div className="w-px h-7 bg-white/10" />
          <div className="flex items-center gap-1 text-zinc-400 text-[11px]">
            <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
            <span>{t("humidity")} {weather.humidity}%</span>
          </div>
        </>
      ) : (
        <span className="text-zinc-500 text-xs animate-pulse">{t("loading")}</span>
      )}
    </motion.div>
  );
}
