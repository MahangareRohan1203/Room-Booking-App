const CustomerForm = ({ customerName, setCustomerName, mobile, setMobile, onSubmit }) => {
  return (
    <div className="p-4 max-w-md mx-auto space-y-4 mt-6">
      <h3 className="text-lg font-semibold">Customer Details</h3>
      <div className="space-y-2">
        <label className="block text-sm">Customer Name</label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          placeholder="Enter customer name"
        />

        <label className="block text-sm">Mobile Number</label>
        <input
          type="text"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          placeholder="Enter mobile number"
        />

        <button
          onClick={onSubmit}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
};


export default CustomerForm;