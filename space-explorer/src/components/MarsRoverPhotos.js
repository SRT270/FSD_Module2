import React from "react";

const MarsRoverPhotos = ({ photos }) => (
  <div>
    <h2 style={{ textAlign: "center" }}>🪐 Mars Rover Photos (Curiosity)</h2>
    <div className="grid">
      {photos.map((photo) => (
        <div key={photo.id} className="card">
          <img src={photo.img_src} alt={photo.camera.full_name} />
          <p><b>Camera:</b> {photo.camera.full_name}</p>
          <p><b>Earth Date:</b> {photo.earth_date}</p>
        </div>
      ))}
    </div>
  </div>
);

export default MarsRoverPhotos;
