import React from "react";

const CityDropdown = ({ cities, onSelectCity }) => {
  return (
    <div className="relative inline-block text-left m-3 w-48">
      <label
        htmlFor="city-select"
        className="block text-sm font-medium text-gray-700"
      >
        Last Searched Cities
      </label>
      <select
        id="city-select"
        onChange={(e) => onSelectCity(e.target.value)}
        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-base text-gray-900 hover:bg-gray-400 "
      >
        <option value="" disabled selected>
          Select a city
        </option>
        {cities.map((city) => (
          <option key={city.cityName} value={city.cityName}>
            {city.cityName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CityDropdown;
