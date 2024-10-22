// src/components/EventChecker.js
import { useEffect, useState } from "react";
import fetchCalendlyEvents from "../utils/fetchCalendlyEvent";
import checkWeatherForEvent from "../utils/checkWeatherForEvent";

const EventChecker = ({ calendlyURL, accessToken }) => {
  const [events, setEvents] = useState([]);
  const [eventStatuses, setEventStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAndCheckEvents = async () => {
      setLoading(true); // Start loading
      setError(null);   // Reset error state
      try {
        const calendlyEvents = await fetchCalendlyEvents(calendlyURL, accessToken);
        setEvents(calendlyEvents);

        const statuses = await Promise.all(
          calendlyEvents.map(async (event) => {
            const location = event.location?.location || "Unknown location"; // Provide default value
            const eventDate = event.start_time; // Event start time
            const weatherStatus = await checkWeatherForEvent(location, eventDate);

            return {
              event,
              weatherStatus: weatherStatus || { suggestion: "Weather data not available" }, // Fallback for missing weather status
            };
          })
        );

        setEventStatuses(statuses);
      } catch (error) {
        console.error("Error fetching events or weather:", error);
        setError("Failed to fetch events or weather.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchAndCheckEvents();
  }, [calendlyURL, accessToken]);

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  if (error) {
    return <div>{error}</div>; // Error handling
  }

  return (
    <div>
      <h2>Upcoming Events and Weather Alerts</h2>
      {eventStatuses.length === 0 ? (
        <p>No upcoming events found.</p>
      ) : (
        <ul>
          {eventStatuses.map(({ event, weatherStatus }) => (
            <li key={event.uri}>
              {event.name} - {weatherStatus.suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventChecker;
