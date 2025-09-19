import React from "react";

const Asteroids = ({ asteroids }) => (
  <div style={{ marginTop: "50px" }}>
    <h2 style={{ textAlign: "center" }}>☄️ Near-Earth Objects (Today)</h2>
    {asteroids.length === 0 ? (
      <p style={{ textAlign: "center" }}>No NEOs today!</p>
    ) : (
      <div className="grid">
        {asteroids.map((neo) => (
          <div key={neo.id} className="card">
            <h3>{neo.name}</h3>
            <p><b>Hazardous:</b> {neo.is_potentially_hazardous_asteroid ? "Yes" : "No"}</p>
            <p><b>Estimated Diameter:</b> {Math.round(neo.estimated_diameter.meters.estimated_diameter_max).toLocaleString()} m</p>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default Asteroids;
