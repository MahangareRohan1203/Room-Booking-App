import React, { useState, useEffect } from "react";
import { getLocationBedDetails, getBookingDetails } from "./../api/bookingApi";
import LocationSelector from "../components/LocationSelector";
import HomeSelector from "../components/HomeSelector";
import BedSelector from "../components/BedSelector";
import BookingDetails from "../components/BookingDetails";

const ViewBooking = () => {
  const [locations, setLocations] = useState([]);
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const [selectedHomeId, setSelectedHomeId] = useState(null);
  const [selectedBedId, setSelectedBedId] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);
  const token = JSON.parse(localStorage.getItem("user"))?.token;

  useEffect(() => {
    // Fetch location and bed details on load
    const fetchLocationData = async () => {
      const data = await getLocationBedDetails(token); // Assuming API call returns all the location, home, and bed data
      setLocations(data.locations);
    };

    fetchLocationData();
  }, []);

  const handleLocationChange = (locationId) => {
    setSelectedLocationId(locationId);
    setSelectedHomeId(null); // Reset selected home when location changes
    setSelectedBedId(null); // Reset selected bed when location changes
  };

  const handleHomeChange = (homeId) => {
    setSelectedHomeId(homeId);
    setSelectedBedId(null); // Reset selected bed when home changes
  };

  const handleBedSelection = async (bedId) => {
    setSelectedBedId(bedId);

    // Fetch booking details for the selected bed
    const data = await getBookingDetails(bedId); // Assuming API returns booking details for a specific bed
    setBookingDetails(data);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-center my-6">View Bookings</h1>

      {/* Location Selector */}
      <LocationSelector
        locations={locations}
        selectedLocationId={selectedLocationId}
        onLocationChange={handleLocationChange}
      />

      {/* Home Selector */}
      {selectedLocationId && (
        <HomeSelector
          locationId={selectedLocationId}
          selectedHomeId={selectedHomeId}
          onHomeChange={handleHomeChange}
        />
      )}

      {/* Bed Selector */}
      {selectedHomeId && (
        <BedSelector
          locationId={selectedLocationId}
          homeId={selectedHomeId}
          selectedBedId={selectedBedId}
          onBedSelection={handleBedSelection}
        />
      )}

      {/* Booking Details */}
      {selectedBedId && bookingDetails && (
        <BookingDetails bookingDetails={bookingDetails} />
      )}
    </div>
  );
};

export default ViewBooking;
