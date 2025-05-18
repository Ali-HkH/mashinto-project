"use client";
import { MapContainer, TileLayer, Marker, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { icon } from "leaflet";

const iconUrl = "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png";
const markerIcon = icon({
   iconUrl: iconUrl,
   iconSize: [20, 30],
});

import { findCityLocation } from "@/utils/citiesData";
import Title from "./Title";

function CarMap({ cityName }: { cityName: string }) {
   const defaultLocation = [35.6892, 51.389] as [number, number];
   const location = findCityLocation(cityName) as [number, number];

   return (
      <div className="mt-4">
         <div className="mb-4 ">
            <Title text="جایی که خودرو را تحویل می گیرید" />
         </div>
         <MapContainer
            scrollWheelZoom={false}
            zoomControl={false}
            className="h-[50vh] rounded-lg relative z-0"
            center={location || defaultLocation}
            zoom={7}
         >
            <TileLayer
               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ZoomControl position="bottomright" />
            <Marker
               position={location || defaultLocation}
               icon={markerIcon}
            ></Marker>
         </MapContainer>
      </div>
   );
}
export default CarMap;
