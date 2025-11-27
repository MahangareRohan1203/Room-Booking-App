const LocationSelector = ({ locations, selectedLocationId, setSelectedLocationId }) => {
  if (!locations.length) return null;

  return (
    <div className="mb-4 p-4">
      <label className="block font-medium mb-1">Select Location:</label>
      <select
        value={selectedLocationId}
        onChange={(e) => setSelectedLocationId(Number(e.target.value))}
        className="border p-2 rounded w-full"
      >
        {locations.map((loc) => (
          <option key={loc.locationId} value={loc.locationId}>
            {loc.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocationSelector;
