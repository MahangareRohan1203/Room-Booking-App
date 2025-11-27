// components/DateSelector.jsx
const DateSelector = ({ fromDate, toDate, setFromDate, setToDate, onCheck, loading }) => {
  const today = new Date().toISOString().split("T")[0];
    return (
      <div className="p-4 max-w-md mx-auto space-y-4">
        <h2 className="text-xl font-bold text-center">Create a Booking</h2>
        <div className="space-y-2">
          <label className="block text-sm">From Date:</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            min={today}
            
          />
  
          <label className="block text-sm">To Date: </label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            min={today}
          />
  
          <button
            onClick={onCheck}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Checking..." : "Check Availability"}
          </button>
        </div>
      </div>
    );
  };
  
  export default DateSelector;
  