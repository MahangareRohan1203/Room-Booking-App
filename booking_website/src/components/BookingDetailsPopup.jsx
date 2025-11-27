import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

const BookingDetailsPop = ({ bookings, onClose, onUpdate, onDelete }) => {
  const [editingBookingId, setEditingBookingId] = useState(null);
  const [editData, setEditData] = useState({});

  const startEditing = (booking) => {
    setEditingBookingId(booking.bookingId);
    setEditData({
      name: booking?.customer?.name,
      mobileNumber: booking?.customer?.mobileNumber,
      fromDate: booking.fromDate.split("T")[0],
      toDate: booking.toDate.split("T")[0],
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const saveChanges = () => {
    const confirmed = window.confirm("Are you sure you want to update this booking?");
    if(confirmed){
      onUpdate(editingBookingId, editData);
      // call a function api to update the booking (pass the all details like bedId, fromDate, toDate, customername, mobileNumber) and then reload the bookings
      setEditingBookingId(null);
      setEditData({});
    }

  };

  const handleDelete = (bookingId) => {
    const confirmed = window.confirm("Are you sure you want to delete this booking?");
    if (confirmed) {
      onDelete(bookingId);
      // call a function api to delete a booking by passing the bookingId and reload the bookings
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded w-full max-w-md space-y-4 shadow-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-lg font-bold">Booking Details</h2>
          <button onClick={onClose} className="text-red-500 font-bold text-lg">
            ×
          </button>
        </div>

        {bookings.length === 0 ? (
          <p>No bookings found for this bed.</p>
        ) : (
          bookings.map((booking) => (
            <div
              key={booking.bookingId}
              className="border p-2 rounded shadow-sm flex flex-col gap-2"
            >
              {editingBookingId === booking.bookingId ? (
                <>
                  <input
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={handleInputChange}
                    className="border p-1 rounded"
                    placeholder="Name"
                  />
                  <input
                    type="text"
                    name="mobileNumber"
                    value={editData.mobileNumber}
                    onChange={handleInputChange}
                    className="border p-1 rounded"
                    placeholder="Mobile Number"
                  />
                  <input
                    type="date"
                    name="fromDate"
                    value={editData.fromDate}
                    onChange={handleInputChange}
                    className="border p-1 rounded"
                  />
                  <input
                    type="date"
                    name="toDate"
                    value={editData.toDate}
                    onChange={handleInputChange}
                    className="border p-1 rounded"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={saveChanges}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingBookingId(null)}
                      className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex justify-between items-start gap-2">
                  <div className="text-sm">
                    <p>
                      <strong>Name:</strong> {booking?.customer?.name}
                    </p>
                    <p>
                      <strong>Mobile:</strong> {booking?.customer?.mobileNumber}
                    </p>
                    <p>
                      <strong>From:</strong> {booking.fromDate.split("T")[0]}
                    </p>
                    <p>
                      <strong>To:</strong> {booking.toDate.split("T")[0]}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    <button
                      onClick={() => startEditing(booking)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Edit Booking"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(booking.bookingId)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete Booking"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BookingDetailsPop;
