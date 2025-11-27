// components/ConfirmBookingPopup.jsx
import React from "react";

const ConfirmBookingPopup = ({
  fromDate,
  toDate,
  selectedBeds,
  selectedBedNames,
  customerName,
  mobile,
  onConfirm,
  onCancel,
  loading,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl p-6 shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">Confirm Booking</h2>

        <div className="space-y-2 text-sm">
          <p><strong>From:</strong> {fromDate}</p>
          <p><strong>To:</strong> {toDate}</p>
          <p><strong>Beds:</strong> {selectedBedNames.join(", ")}</p>
          <p><strong>Name:</strong> {customerName}</p>
          <p><strong>Mobile:</strong> {mobile}</p>
        </div>

        <div className="flex justify-between mt-6">
          <button
            className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Booking..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBookingPopup;
