import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Charts = ({ asteroidData, marsPhotosCount }) => {
  const asteroidSizes = asteroidData.map((neo) =>
    Math.round(neo.estimated_diameter.meters.estimated_diameter_max)
  );
  const asteroidLabels = asteroidData.map((neo) => neo.name);

  const asteroidChartData = {
    labels: asteroidLabels,
    datasets: [
      {
        label: "Asteroid Size (meters)",
        data: asteroidSizes,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const marsChartData = {
    labels: ["Mars Rover Photos"],
    datasets: [
      {
        label: "Number of Photos",
        data: [marsPhotosCount],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div style={{ marginTop: "50px" }}>
      <h2 style={{ textAlign: "center" }}>📊 Space Data Charts</h2>
      <div style={{ maxWidth: "600px", margin: "auto" }}>
        <Bar data={asteroidChartData} />
        <Bar data={marsChartData} style={{ marginTop: "40px" }} />
      </div>
    </div>
  );
};

export default Charts;
