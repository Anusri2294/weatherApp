import React from "react";

const FivedayDataCard = ({ weatherData, temperatureUnit }) => {
  // Function to perform temperature conversion
  const convertTemperature = (tempInC) => {
    return temperatureUnit === "C" ? tempInC : (tempInC * 9) / 5 + 32;
  };
  const dailyData = weatherData?.daily;

  if (!dailyData) {
    return <p>Loading 5-day forecast...</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-400 p-4 rounded-lg  text-white text-center flex flex-col justify-center items-center"
        >
          <h3 className="text-xl font-semibold">Day {index + 1}</h3>
          <p className="mt-2">
            <span className="font-semibold">Min Temp: </span>
            {convertTemperature(dailyData.temperature_2m_min[index]).toFixed(1)}
            °{temperatureUnit}
          </p>
          <p>
            <span className="font-semibold">Max Temp: </span>
            {convertTemperature(dailyData.temperature_2m_max[index]).toFixed(1)}
            °{temperatureUnit}
          </p>
          <p>
            <span className="font-semibold">UV Index: </span>
            {dailyData.uv_index_max[index]}
          </p>
          <p>
            <span className="font-semibold">Precipitation: </span>
            {dailyData.precipitation_sum[index]}{" "}
            {weatherData.daily_units.precipitation_sum}
          </p>
        </div>
      ))}
    </div>
  );
};

export default FivedayDataCard;
