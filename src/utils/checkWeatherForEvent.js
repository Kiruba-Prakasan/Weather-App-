// src/utils/checkWeatherForEvent.js
import fetchData from "./fetchData";

const checkWeatherForEvent = async (location, eventDate) => {
  const api = `https://calendly.com/kirubarp-22it-kongu?location=${location}&date=${eventDate}`; 
  const weatherData = await fetchData(api);

  const weatherCode = weatherData.daily.weathercode[0]; // Example of accessing daily weather
  const forecast = weatherData.daily.summary[0]; // Or similar summary data

  // If there are unfavorable weather conditions like rain, snow, etc.
  if (forecast.includes("Rain") || forecast.includes("Thunderstorm")) {
    return { shouldReschedule: true, suggestion: "Consider rescheduling due to bad weather." };
  }

  return { shouldReschedule: false, suggestion: "Weather looks fine for the event." };
};

export default checkWeatherForEvent;
