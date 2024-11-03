import React from "react";

const MainCard = ({
  cityName,
  tempMaxUnit,
  tempMinUnit,
  tempMax,
  tempMin,
  currentTempUnit,
  currentTemp,
}) => {
  return (
    <div className="bg-gradient-to-r from-indigo-400 via-blue-400 to-purple-500 p-6 rounded-lg shadow-md text-white m-3">
      <h2 className="text-3xl font-bold mb-2 text-center">{cityName}</h2>

      <div className="text-xl mb-4 text-center">
        {currentTemp} °{currentTempUnit}
      </div>

      <div className="flex justify-between text-lg">
        <div>
          <span className="font-semibold">Min: </span>
          {tempMin} °{tempMinUnit}
        </div>
        <div>
          <span className="font-semibold">Max: </span>
          {tempMax} °{tempMaxUnit}
        </div>
      </div>
    </div>
  );
};

export default MainCard;
