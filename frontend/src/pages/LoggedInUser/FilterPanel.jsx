const FilterPanel = ({
  dateFrom,
  dateTo,
  todayStr,
  setDateFrom,
  setDateTo,
  minPriceFilter,
  maxPriceFilter,
  setMinPriceFilter,
  setMaxPriceFilter,
  selectedLocation,
  setSelectedLocation,
  sortByPrice,
  setSortByPrice,
  locations,
  setSelectedType,
  onClose, // optional (mobile popup only)
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm font-syne text-[#3B3B3B] h-fit relative">

      {/* Close button ONLY for mobile popup */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500"
        >
          ✕
        </button>
      )}

      <h2 className="text-lg font-semibold mb-4">Filters</h2>

              {/* Date Range (pop-over using native inputs) */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Date Range
                </label>
                <div className="relative">
                  <button
                    onClick={() => {}}
                    className="w-full flex items-center justify-between border border-gray-300 rounded-md px-3 py-2 text-sm hover:border-[#8F6E56] transition"
                  >
                    <span className="text-gray-700">
                      {dateFrom || dateTo
                        ? `${dateFrom || "Start"} → ${dateTo || "End"}`
                        : "Select Dates"}
                    </span>
                    <img src="/SVG/calendar.svg" alt="" className="w-4 h-4" />
                  </button>

                  {/* Inline small date inputs (always visible on desktop for simplicity) */}
                  <div className="flex gap-2 mt-3">
                    <input
                      type="date"
                      value={dateFrom}
                      min={todayStr}
                      onChange={(e) => {
                        const selected = e.target.value;

                        // 🚫 block past dates (even if typed)
                        if (selected < todayStr) return;

                        setDateFrom(selected);

                        // auto-fix end date if it becomes invalid
                        if (dateTo && selected > dateTo) {
                          setDateTo(selected);
                        }
                      }}
                      className="w-1/2 border border-gray-300 rounded-md px-2 py-1 text-sm"
                    />
                    <input
                      type="date"
                      value={dateTo}
                      min={dateFrom || todayStr}
                      onChange={(e) => {
                        const selected = e.target.value;
                        const minAllowed = dateFrom || todayStr;

                        // 🚫 block past & reverse dates
                        if (selected < minAllowed) return;

                        setDateTo(selected);
                      }}
                      className="w-1/2 border border-gray-300 rounded-md px-2 py-1 text-sm"
                    />
                  </div>
                  <div className="flex gap-2 mt-2 text-xs text-gray-500">
                    <button
                      onClick={() => {
                        setDateFrom("");
                        setDateTo("");
                      }}
                      className="underline"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>

              {/* Budget Range */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Budget Range
                </label>
                <div className="px-1">
                  {/* slider for max; keep two number boxes for precise min/max */}
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="1000"
                      max="50000"
                      step="500"
                      value={minPriceFilter}
                      onChange={(e) => {
                        const v = Number(e.target.value);
                        // keep min <= max
                        setMinPriceFilter(Math.min(v, maxPriceFilter));
                      }}
                      className="flex-1 accent-[#8F6E56] cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-2 mt-2">
                    <div className="flex-1">
                      <label className="text-xs text-gray-500">Min</label>
                      <input
                        type="number"
                        value={minPriceFilter}
                        onChange={(e) => {
                          const v = Number(e.target.value || 0);
                          setMinPriceFilter(
                            Math.max(0, Math.min(v, maxPriceFilter))
                          );
                        }}
                        className="w-full border border-gray-200 rounded-md px-2 py-1 text-sm"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-xs text-gray-500">Max</label>
                      <input
                        type="number"
                        value={maxPriceFilter}
                        onChange={(e) => {
                          const v = Number(e.target.value || 0);
                          setMaxPriceFilter(Math.max(v, minPriceFilter));
                        }}
                        className="w-full border border-gray-200 rounded-md px-2 py-1 text-sm"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between text-xs mt-1 text-gray-600">
                    <span>Min ₹1,000</span>
                    <span>Max ₹50,000</span>
                  </div>
                </div>
              </div>

              {/* Sort by Location */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Sort by Location
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#8F6E56]"
                >
                  {locations.map((loc, idx) => (
                    <option key={idx} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort by Price */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Sort by Price
                </label>
                <select
                  value={sortByPrice}
                  onChange={(e) => setSortByPrice(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#8F6E56]"
                >
                  <option value="none">None</option>
                  <option value="low">Low to High</option>
                  <option value="high">High to Low</option>
                </select>
              </div>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => {onClose?.();}}
                  className="flex-1 w-full bg-[#8F6E56] hover:bg-[#73543F] text-white font-medium py-2 rounded-md transition"
                >
                  Apply Filters
                </button>
                <button
                  onClick={() => {
                    // reset all filters
                    setDateFrom("");
                    setDateTo("");
                    setMinPriceFilter(1000);
                    setMaxPriceFilter(50000);
                    setSelectedLocation("All");
                    setSelectedType("All");
                    setSortByPrice("none");
                  }}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  Reset
                </button>
              </div>

    </div>
  );
};

export default FilterPanel;
