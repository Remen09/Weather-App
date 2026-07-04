"use server";

import type { WeatherData } from "@/lib/weather";

export async function getWeatherData(
  lat: number,
  lon: number,
): Promise<{ data?: WeatherData; error?: string }> {
  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`,
    );

    if (!res.ok) {
      return { error: "Failed to fetch weather data" };
    }

    const raw = await res.json();
    const { temperature_2m, relative_humidity_2m, wind_speed_10m } = raw.current;

    return { data: { temperature_2m, relative_humidity_2m, wind_speed_10m } };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Failed to fetch" };
  }
}
