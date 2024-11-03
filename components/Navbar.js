import React, { useState } from "react";
import logoImg from "../assets/weatherapppLogo.jpeg";

const Navbar = ({
  handleCitySearch,
  searchCity,
  setSearchCity,
  cityData,
  currentLocation,
}) => {
  const handleSeacrhCity = () => {
    handleCitySearch(searchCity);
    setSearchCity("");
  };
  const handleSearch = (e) => {
    setSearchCity(e.target.value);
  };
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center px-4 py-2 text-cyan-900 bg-gradient-to-r from-orange-400 via-yellow-300 to-pink-200">
      <div className="flex items-center gap-4  p-3 ">
        <img
          src={logoImg}
          alt="WeatherImg"
          className=" w-8 h-8 sm:w-10 sm:h-10 object-contain cursor-pointer"
        />
        <p className="text-md md:text-md lg:text-lg font-semibold cursor-pointer">
          Weather App
        </p>
      </div>
      <div className="flex items-center flex-col sm:flex-row gap-1 mt-2 sm:mt-0">
        <input
          type="text"
          placeholder="Search Your City"
          className=" w-64 sm:w-44 lg:w-60 px-2 py-1 sm:px-4 sm:py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleSearch}
          value={searchCity}
        />
        <button
          type="button"
          className="w-64 sm:w-auto px-4 py-1 border-2 rounded-lg cursor-pointer text-sm sm:text-base hover:bg-orange-300 "
          onClick={handleSeacrhCity}
        >
          Search
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3 mt-2 sm:mt-0">
        <button
          className="w-64 sm:w-auto px-4 py-1 border-2 rounded-lg cursor-pointer text-sm sm:text-base hover:bg-pink-400"
          onClick={currentLocation}
        >
          Current Location
        </button>
      </div>
    </div>
  );
};

export default Navbar;
