import React from "react";

const APOD = ({ apod }) => (
  <div className="card" style={{ textAlign: "center", marginBottom: "50px" }}>
    <h2>🌠 Astronomy Picture of the Day</h2>
    {apod.media_type === "image" ? (
      <img src={apod.url} alt={apod.title} />
    ) : (
      <iframe
        title="APOD Video"
        src={apod.url}
        width="100%"
        height="400px"
        frameBorder="0"
        style={{ borderRadius: "10px" }}
      ></iframe>
    )}
    <h3>{apod.title}</h3>
    <p>{apod.explanation}</p>
  </div>
);

export default APOD;
