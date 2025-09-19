import React, { useState } from "react";

const AsteroidsFilter = ({ asteroids, onFilter }) => {
  const [hazardousOnly, setHazardousOnly] = useState(false);
  const [minSize, setMinSize] = useState("");

  const handleHazardousChange = (e) => {
    setHazardousOnly(e.target.checked);
    applyFilter(e.target.checked, minSize);
  };

  const handleMinSizeChange = (e) => {
    const value = e.target.value;
    setMinSize(value);
    applyFilter(hazardousOnly, value);
  };

  const applyFilter = (hazardous, size) => {
    let filtered = asteroids;
    if (hazardous) {
      filtered = filtered.filter((a) => a.is_potentially_hazardous_asteroid);
    }
    if (size) {
      const sizeNum = parseFloat(size);
      if (!isNaN(sizeNum)) {
        filtered = filtered.filter(
          (a) => a.estimated_diameter.meters.estimated_diameter_max >= sizeNum
        );
      }
    }
    onFilter(filtered);
  };

  return (
    <div style={{ marginBottom: "20px", textAlign: "center" }}>
      <label>
        <input
          type="checkbox"
          checked={hazardousOnly}
          onChange={handleHazardousChange}
        />
        Show only potentially hazardous asteroids
      </label>
      <br />
      <label>
        Minimum size (meters):{" "}
        <input
          type="number"
          value={minSize}
          onChange={handleMinSizeChange}
          placeholder="e.g. 100"
          style={{ width: "80px" }}
        />
      </label>
    </div>
  );
};

export default AsteroidsFilter;
