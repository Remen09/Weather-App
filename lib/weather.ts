export interface GeocodingResult {
  id: number
  name: string
  latitude: number
  longitude: number
  country: string
  country_code: string
  admin1?: string
}

export interface City {
  name: string
  lat: number
  lon: number
  country: string
  state?: string
}

export interface WeatherData {
  temperature_2m: number
  relative_humidity_2m: number
  wind_speed_10m: number
}
