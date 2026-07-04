"use client"

import { cambodianProvinces } from "@/lib/provinces"
import type { City } from "@/lib/weather"

export default function ProvinceSelect({
  onSelect,
}: {
  onSelect: (city: City) => void
}) {
  return (
    <select
      onChange={(e) => {
        const city = cambodianProvinces.find((p) => p.name === e.target.value)
        if (city) onSelect(city)
      }}
      defaultValue=""
      className="w-full bg-white/90 rounded-md border border-gray-300 px-4 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
    >
      <option value="" disabled>
        Select a province...
      </option>
      {cambodianProvinces.map((p) => (
        <option key={p.name} value={p.name}>
          {p.state ? `${p.name} (${p.state})` : p.name}
        </option>
      ))}
    </select>
  )
}
