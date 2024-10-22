// src/utils/fetchCalendlyEvents.js
const fetchCalendlyEvents = async (calendlyURL, accessToken) => {
    const response = await fetch(
      `https://calendly.com/kirubarp-22it-kongu?user=${calendlyURL}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Personal Access Token or OAuth token
        },
      }
    );
  
    if (!response.ok) {
      throw new Error("Failed to fetch events from Calendly.");
    }
  
    const data = await response.json();
    return data.collection; // Array of events
  };
  
  export default fetchCalendlyEvents;
  