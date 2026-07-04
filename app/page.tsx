"use client";

import { Droplets, Thermometer, Wind } from "lucide-react";
import { getWeatherData } from "@/lib/action";
import { useState } from "react";
import type { City, WeatherData } from "@/lib/weather";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import ProvinceSelect from "@/components/province-select";

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [cityName, setCityName] = useState("");
  const [error, setError] = useState("");

  const handleSelect = async (city: City) => {
    setError("");
    setCityName(city.name);

    const { data, error: weatherError } = await getWeatherData(city.lat, city.lon);

    if (weatherError) {
      setError(weatherError);
      setWeather(null);
    } else if (data) {
      setWeather(data);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 to-blue-500 p-4 flex items-center justify-center">
      <div className="w-full max-w-md space-y-4">
        <ProvinceSelect onSelect={handleSelect} />

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center text-red-200 bg-red-500/20 rounded-md p-2"
          >
            {error}
          </motion.div>
        )}

        {weather && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-white/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <motion.h2
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    className="text-2xl font-bold"
                  >
                    {cityName}
                  </motion.h2>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-5xl font-bold"
                    >
                      {Math.round(weather.temperature_2m)}°C
                    </motion.div>
                  </div>
                </div>

                <motion.div
                  className="grid grid-cols-3 gap-4 mt-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.div className="text-center" whileHover={{ scale: 1.05 }}>
                    <Thermometer className="w-6 h-6 mx-auto text-orange-500" />
                    <div className="mt-2 text-sm text-gray-500">Temperature</div>
                    <div className="font-semibold">
                      {Math.round(weather.temperature_2m)}°C
                    </div>
                  </motion.div>
                  <motion.div className="text-center" whileHover={{ scale: 1.05 }}>
                    <Droplets className="w-6 h-6 mx-auto text-blue-500" />
                    <div className="mt-2 text-sm text-gray-500">Humidity</div>
                    <div className="font-semibold">
                      {weather.relative_humidity_2m}%
                    </div>
                  </motion.div>
                  <motion.div className="text-center" whileHover={{ scale: 1.05 }}>
                    <Wind className="w-6 h-6 mx-auto text-teal-500" />
                    <div className="mt-2 text-sm text-gray-500">Wind</div>
                    <div className="font-semibold">
                      {Math.round(weather.wind_speed_10m)} km/h
                    </div>
                  </motion.div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
