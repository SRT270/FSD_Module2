import React, { useState, useEffect } from "react";
import axios from "axios";

const EarthImagery = ({ apiKey }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEarthImage = async () => {
      try {
        // Use coordinates for New York City, date from a few days ago to ensure availability
        const date = new Date();
        date.setDate(date.getDate() - 7);
        const dateStr = date.toISOString().split("T")[0];
        const response = await axios.get(
          `https://api.nasa.gov/planetary/earth/imagery?lon=-74.006&lat=40.7128&date=${dateStr}&api_key=${apiKey}`
        );
        setImageUrl(response.data.url);
      } catch (err) {
        setError("Failed to load Earth imagery");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEarthImage();
  }, [apiKey]);

  if (loading) return <p>Loading Earth imagery...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="card" style={{ textAlign: "center", marginBottom: "50px" }}>
      <h2>🌍 Earth Imagery (New York City)</h2>
      <img src={imageUrl} alt="Earth from space" style={{ maxWidth: "100%", borderRadius: "10px" }} />
    </div>
  );
};

export default EarthImagery;
