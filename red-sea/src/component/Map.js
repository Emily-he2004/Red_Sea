import mapboxgl from "mapbox-gl";
import React, { useEffect, useState } from "react";

export default function Map() {
  const [map, setMap] = useState(null);
  const [camps, setCamps] = useState([]);
  useEffect(() => {
    fetch("/locations")
      .then((res) => res.json())
      .then((camps) => setCamps(camps));
  }, []);

  return (
    <div className="Map">
      <h2>Map</h2>
    </div>
  );
}
