// pages/Bookings.jsx
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import LocationSelector from "../components/LocationSelector";
import HomesWithBeds from "../components/HomesWithBeds";
import {
  getLocationBedDetails,
  getBookingsForBed,
  updateBooking,
  deleteBooking,
} from "../api/bookingApi";
import BookingDetailsPopup from "../components/BookingDetailsPopup";

const Bookings = () => {
  const token = JSON.parse(localStorage.getItem("user"))?.token;
  const [locations, setLocations] = useState([]);
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const [bedBookings, setBedBookings] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedBedId, setSelectedBedId] = useState(null);

  // Fetch all locations and homes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLocationBedDetails(token);
        setLocations(data?.locations || []);
        setSelectedLocationId(data?.locations?.[0]?.locationId);
      } catch (error) {
        alert(error?.response?.data?.message);
        console.error(error);
      }
    };
    fetchData();
  }, [token]);

  // Fetch booking data for a specific bed
  const handleBedClick = async (bedId) => {
    try {
      setSelectedBedId(bedId);
      const bookings = await getBookingsForBed(bedId, token);
      setBedBookings(bookings);
      setShowPopup(true);
    } catch (error) {
      alert(error?.response?.data?.message);
      console.error(error);
    }
  };

  const selectedLocation = locations.find(
    (loc) => loc.locationId === selectedLocationId
  );

  // inside Bookings.jsx
  const handleUpdateBooking = async (bookingId, updatedData) => {
    try {
      updatedData.bookingId = bookingId;
      await updateBooking(updatedData, token);
      const updatedBookings = await getBookingsForBed(selectedBedId, token);
      setBedBookings(updatedBookings);
    } catch (error) {
      alert(error?.response?.data?.message);

    }
  };

  const handleDeleteBooking = async (bookingId) => {
    try {
      await deleteBooking(bookingId, token);
      const updatedBookings = await getBookingsForBed(selectedBedId, token);
      setBedBookings(updatedBookings);
    } catch (error) {
      alert(error?.response?.data?.message);
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-4 max-w-md mx-auto">
        {locations.length > 0 && (
          <LocationSelector
            locations={locations}
            selectedLocationId={selectedLocationId}
            setSelectedLocationId={setSelectedLocationId}
          />
        )}
      </div>

      {selectedLocation && (
        <HomesWithBeds
          location={[selectedLocation]}
          selectedBeds={[]}
          toggleBedSelection={handleBedClick}
        />
      )}

      {showPopup && (
        <BookingDetailsPopup
          bookings={bedBookings}
          onClose={() => setShowPopup(false)}
          bedId={selectedBedId}
          onUpdate={handleUpdateBooking}
          onDelete={handleDeleteBooking}
        />
      )}
    </div>
  );
};

export default Bookings;
