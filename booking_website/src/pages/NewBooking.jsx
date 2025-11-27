import React, { useState } from "react";
import Navbar from "./../components/Navbar";
import {
  checkAvailability,
  getLocationBedDetails,
  bookBed,
} from "./../api/bookingApi";
import LocationSelector from "./../components/LocationSelector";
import BedSelection from "./../components/BedSelection";
import CustomerForm from "./../components/CustomerForm";
import DateSelector from "../components/DateSelector";
import ConfirmBookingPopup from "../components/ConfirmBookingPopup";

const NewBooking = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState([]);
  const [selectedBeds, setSelectedBeds] = useState([]);
  const [selectedBedNames, setSelectedBedNames] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [mobile, setMobile] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [bookingLoading, setbookingLoading] = useState(false);
  const [showBookingPopup, setShowBookingPopup] = useState(false);
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const token = JSON.parse(localStorage.getItem("user"))?.token;

  // Handle date range and availability check
  const handleCheckAvailability = async () => {
    if (!fromDate || !toDate) return alert("Please select both dates");

    setLoading(true);
    setSelectedBeds([]);
    try {
      const data1 = await checkAvailability(fromDate, toDate, token);
      const location1 = await getLocationBedDetails(token);
      const locationsData = location1?.locations;
      const bookedData = data1;
      const bookedBedIds = bookedData.map((booking) => booking.bedId);

      const updatedLocations = locationsData.map((location) => ({
        ...location,
        homes: location.homes.map((home) => ({
          ...home,
          beds: home.beds.map((bed) => ({
            ...bed,
            isBooked: bookedBedIds.includes(bed.bedId),
          })),
        })),
      }));
      setLocations(updatedLocations);

      if (updatedLocations.length > 0) {
        setSelectedLocationId(updatedLocations[0]?.locationId);
      }
    } catch (error) {
      console.error("Error checking availability:", error);
      alert(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  // Toggle bed selection
  const toggleBedSelection = (bedId, isBooked) => {
    if (isBooked) return;
    setSelectedBeds((prevSelected) =>
      prevSelected.includes(bedId)
        ? prevSelected.filter((id) => id !== bedId)
        : [...prevSelected, bedId]
    );
  };

  // Handle booking
  const handleBooking = async () => {
    const payload = {
      fromDate: fromDate + "T00:00:00",
      toDate: toDate + "T00:00:00",
      name: customerName,
      mobileNumber: mobile,
      bedList: selectedBeds,
    };

    setLoading(true);
    setbookingLoading(true)
    try {
      const res = await bookBed(payload, token);
      alert("Booking successful!");
      setShowConfirm(false);
      setSelectedBeds([]);
      setCustomerName("");
      setMobile("");
      setFromDate("");
      setToDate("");
      setLocations([]);
    } catch (error) {
      console.error("Error booking bed:", error);
      alert(error?.response?.data?.message);
    } finally {
      setLoading(false);
      setbookingLoading(false)
    }
  };

  return (
    <div className="">
      <Navbar />
      <DateSelector
        fromDate={fromDate}
        toDate={toDate}
        setFromDate={setFromDate}
        setToDate={setToDate}
        onCheck={handleCheckAvailability}
        loading={loading}
      />

      {/* Location Selection */}
      {locations.length > 0 && (
        <LocationSelector
          locations={locations}
          selectedLocationId={selectedLocationId}
          setSelectedLocationId={setSelectedLocationId}
        />
      )}

      {/* Bed Selection */}
      {selectedLocationId &&
        locations
          .filter((loc) => loc.locationId === selectedLocationId)
          .map((location) => (
            <div key={location.locationId} className="mt-4">
              <h2 className="text-xl font-bold mb-2 ml-4">{location.name}</h2>
              {location.homes.map((home) => (
                <BedSelection
                  key={home.homeId}
                  home={home}
                  selectedBeds={selectedBeds}
                  toggleBedSelection={toggleBedSelection}
                />
              ))}
            </div>
          ))}

      {/* Customer Details Form */}
      {selectedBeds.length > 0 && (
        <CustomerForm
          customerName={customerName}
          setCustomerName={setCustomerName}
          mobile={mobile}
          setMobile={setMobile}
          onSubmit={() => {
            if (!customerName || !mobile) return alert("Enter all details");
            const bedsToConfirm = locations
              .map(
                (location) =>
                  location.homes
                    .map(
                      (home) =>
                        home.beds
                          .filter((bed) => selectedBeds.includes(bed.bedId)) // Filter beds that are selected
                          .map((bed) => bed.name) // Map to just the bed name
                    )
                    .flat() // Flatten the nested arrays of bed names into a single array
              )
              .flat(); // Flatten the array once more to get a final list of bed names

            console.log(bedsToConfirm); // This will log an array of bed names

            console.log(bedsToConfirm);

            setSelectedBedNames(bedsToConfirm);
            setShowConfirm(true);
          }}
        />
      )}

      {/* Confirmation Popup */}
      {showConfirm && (
        <ConfirmBookingPopup
          fromDate={fromDate}
          toDate={toDate}
          selectedBeds={selectedBeds}
          selectedBedNames={selectedBedNames}
          customerName={customerName}
          mobile={mobile}
          onConfirm={handleBooking}
          onCancel={() => setShowConfirm(false)}
          loading={bookingLoading}
        />
      )}
    </div>
  );
};

export default NewBooking;
