import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

export default function Map() {
  const [map, setMap] = useState(null);
  const [camps, setCamps] = useState([]);
  const [selectedCamp, setSelectedCamp] = useState(null);

  useEffect(() => {
    fetch("/mapbox-token")
      .then((response) => response.json())
      .then((data) => {
        mapboxgl.accessToken = data.mapboxToken;
        const initMap = new mapboxgl.Map({
          container: "map",
          style: "mapbox://styles/mapbox/streets-v11",
          center: [34.445394, 31.532197],
          zoom: 10,
        });

        setMap(initMap);

        initMap.on("load", () => {
          fetch("/safest-route")
            .then((response) => response.json())
            .then((data) => {
              const routeGeometry = data.geometry;

              initMap.addSource("route", {
                type: "geojson",
                data: routeGeometry,
              });

              initMap.addLayer({
                id: "route",
                type: "line",
                source: "route",
                layout: {
                  "line-join": "round",
                  "line-cap": "round",
                },
                paint: {
                  "line-color": "#ff0000",
                  "line-width": 3,
                },
              });
            })
            .catch((error) =>
              console.error("Error fetching the safest route:", error)
            );
        });
      });

    fetch("/locations")
      .then((res) => res.json())
      .then((camps) => setCamps(camps));
  }, []);

  useEffect(() => {
    if (map && selectedCamp) {
      const { LONG, LAT } = selectedCamp;
      document
        .querySelectorAll(".mapboxgl-marker")
        .forEach((marker) => marker.remove());
      new mapboxgl.Marker().setLngLat([LONG, LAT]).addTo(map);
      map.flyTo({ center: [LONG, LAT], zoom: 12 });
    }
  }, [map, selectedCamp]);

  return (
    <div className="Map">
      <h2>Map</h2>
      <select
        className="camp-options"
        onChange={(e) => setSelectedCamp(camps[e.target.value])}
      >
        <option>Select a Camp</option>
        {camps.map((camp, index) => (
          <option key={index} value={index}>
            {camp.camp}
          </option>
        ))}
      </select>
      <div
        id="map"
        style={{
          position: "absolute",
          top: 55,
          bottom: 0,
          right: 1,
          width: "100%",
        }}
      ></div>
    </div>
  );
}
