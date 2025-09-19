import React, { useState, useEffect } from "react";
import axios from "axios";
import APOD from "./components/APOD";
import MarsRoverPhotos from "./components/MarsRoverPhotos";
import Asteroids from "./components/Asteroids";
import AsteroidsFilter from "./components/AsteroidsFilter";
import EarthImagery from "./components/EarthImagery";
import ISSLocation from "./components/ISSLocation";
import Charts from "./components/Charts";
import "./App.css";

function App() {
  const [apod, setApod] = useState(null);
  const [marsPhotos, setMarsPhotos] = useState([]);
  const [asteroids, setAsteroids] = useState([]);
  const [filteredAsteroids, setFilteredAsteroids] = useState([]);

  const NASA_API_KEY = "1XIa1TQ1l6god8w1DEgbBP3jXc0TTwxpz2UkgFKi"; // Replace with your NASA API Key

  useEffect(() => {
    const fetchData = async () => {
      try {
        // APOD
        const apodRes = await axios.get(
          `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`
        );
        setApod(apodRes.data);

        // Mars Rover
        const marsRes = await axios.get(
          `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${NASA_API_KEY}`
        );
        setMarsPhotos(marsRes.data.photos.slice(0, 6));

        // NEO
        const today = new Date().toISOString().split("T")[0];
        const neoRes = await axios.get(
          `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${NASA_API_KEY}`
        );
        setAsteroids(neoRes.data.near_earth_objects[today] || []);
        setFilteredAsteroids(neoRes.data.near_earth_objects[today] || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [NASA_API_KEY]);


  return (
    <div className="app">
      <header>
        <h1>🚀 Space Explorer</h1>
      </header>
      {apod && <APOD apod={apod} />}
      <MarsRoverPhotos photos={marsPhotos} />
      <AsteroidsFilter asteroids={asteroids} onFilter={setFilteredAsteroids} />
      <Asteroids asteroids={filteredAsteroids} />
      <EarthImagery apiKey={NASA_API_KEY} />
      <ISSLocation />
      <Charts asteroidData={filteredAsteroids} marsPhotosCount={marsPhotos.length} />
      <footer>
        <p>Powered by NASA API 🌌</p>
      </footer>
    </div>
  );
}

export default App;
