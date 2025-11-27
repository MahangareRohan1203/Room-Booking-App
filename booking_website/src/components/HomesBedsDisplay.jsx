const HomesBedsDisplay = ({ location, selectedBeds, toggleBedSelection }) => {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold ml-4 mb-2">{location.name}</h2>

      {location.homes.map((home) => (
        <div key={home.homeId} className="mb-4 border-b border-gray-400">
          <h3 className="text-lg font-semibold">{home.name}</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {home.beds.map((bed) => {
              const isSelected = selectedBeds.includes(bed.bedId);
              return (
                <div
                  key={bed.bedId}
                  onClick={() => toggleBedSelection(bed.bedId, bed.isBooked)}
                  className={`w-10 h-10 rounded cursor-pointer flex items-center justify-center text-white text-sm
                      ${
                        bed.isBooked
                          ? "bg-red-500"
                          : isSelected
                          ? "bg-gray-600"
                          : "bg-green-500"
                      }
                    `}
                  title={`Bed: ${bed.name} | ${
                    bed.isBooked ? "Booked" : "Available"
                  }`}
                >
                  {bed.name}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomesBedsDisplay;
