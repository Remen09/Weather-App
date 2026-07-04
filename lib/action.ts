"use server";

export async function getWeatherData(city: string) {

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}`, {
        });
        const data = await response.json();
        return { data };
    } catch (error) {   
        console.error(error); 
    }
}