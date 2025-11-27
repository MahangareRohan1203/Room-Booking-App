const HomesWithBeds = ({ location, selectedBeds, toggleBedSelection }) => {
  if (!location || !Array.isArray(location)) return null;

  return (
    <div className="p-4">
      {location.map((loc) =>
        loc.homes?.map((home) => (
          <div key={home.homeId} className="border-b border-gray-400 p-2">
            <h3 className="text-lg font-bold">{home.name}</h3>
            <div className="">
              {home.beds.map((bed) => (
                <button
                  key={bed.bedId}
                  className={`p-2.5 m-1.5 rounded ${
                    bed.booked ? "bg-red-500" : "bg-green-500"
                  }`}
                  onClick={() => toggleBedSelection(bed.bedId, bed.booked)}
                >
                  {bed.name}
                </button>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

  
  export default HomesWithBeds;
  