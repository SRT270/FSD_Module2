import React, { useState, useEffect } from "react";
import axios from "axios";

const ISSLocation = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchISSLocation = async () => {
      try {
        const response = await axios.get("http://api.open-notify.org/iss-now.json");
        setLocation(response.data.iss_position);
      } catch (err) {
        setError("Failed to load ISS location");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchISSLocation();
    const interval = setInterval(fetchISSLocation, 5000); // update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  if (loading) return <p>Loading ISS location...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="card" style={{ textAlign: "center", marginBottom: "50px" }}>
      <h2>🛰️ International Space Station Location</h2>
      <p><b>Latitude:</b> {location.latitude}</p>
      <p><b>Longitude:</b> {location.longitude}</p>
    </div>
  );
};

export default ISSLocation;
