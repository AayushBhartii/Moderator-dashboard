import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

export default function MapComponent({ users }) {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY", // Replace with your API key
    });

    if (!isLoaded) {
        return <div>Loading Map...</div>;
    }

    const mapCenter = { lat: 37.0902, lng: -95.7129 }; // Center over North America
    const mapContainerStyle = { width: "100%", height: "100%" };

    return (
        <div className="h-72 lg:h-full w-full rounded-lg overflow-hidden shadow-md">
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={mapCenter}
                zoom={4}
            >
                {users.map((user) => (
                    <Marker
                        key={user.id}
                        position={user.location}
                        label={user.name}
                        title={user.name}
                    />
                ))}
            </GoogleMap>
        </div>
    );
}
