import React, { useState, useCallback, useRef } from "react";
import { useHttp } from "../hooks/http.hook";
import {
  // Rectangle,
  // Polygon,
  DrawingManager,
  GoogleMap,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";

import mapStyles from "../styles/mapStyles";

const libraries = ["places", "geometry", "drawing"];

const mapContainerStyle = {
  width: "100%",
  height: "50vh",
};

const center = {
  lat: 51.4694976807,
  lng: -0.0493916683,
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

const drawingOptions = {
  drawingControl: true,
  drawingControlOptions: {
    drawingModes: ["rectangle"],
  },
  rectangleOptions: {
    fillOpacity: 0,
    strokeWeight: 2,
  },
};

function MapContainer({ vehicles, click }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
    libraries,
  });

  const [polygon, setPolygon] = useState(null);
  const { request } = useHttp();

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const fetchAllVehicles = useCallback(
    async (data) => {
      const response = await request("/api/area", "POST", data, {});
      console.log("Data", response);
      click(response);
    },
    [request, click]
  );

  // const onPolygonComplete = poly => {
  //   console.log("POLY",poly);
  //   if(polygon) polygon.setMap(null)
  //   setPolygon(poly);
  // };

  const onRectangleComplete = (rect) => {
    if (polygon) polygon.setMap(null);
    setPolygon(rect);
    const bounds = rect.getBounds();
    const sw = bounds.getSouthWest();
    const ne = bounds.getNorthEast();

    const data = {
      sw: { lat: sw.lat(), lng: sw.lng() },
      ne: { lat: ne.lat(), lng: ne.lng() },
    };

    fetchAllVehicles(data);
  };

  if (loadError) return "Error loading maps!";
  if (!isLoaded) return "Loading maps...";

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={10}
      center={center}
      options={options}
      onLoad={onMapLoad}>
      {vehicles.map((car) => (
        <Marker
          key={car.id}
          position={{
            lat: car.location.lat,
            lng: car.location.lng,
          }}
          icon={{
            url: "/taxi.png",
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(15, 15),
            scaledSize: new window.google.maps.Size(30, 30),
          }}
        />
      ))}

      <DrawingManager
        options={drawingOptions}
        // onPolygonComplete={onPolygonComplete}
        onRectangleComplete={onRectangleComplete}
      />
    </GoogleMap>
  );
}

export default MapContainer;
