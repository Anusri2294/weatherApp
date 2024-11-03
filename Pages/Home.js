import React, { useEffect } from "react";
import Cards from "../components/Cards";
import windIcon from "../assets/wind.png";
import uvIndexIcon from "../assets/uv-index.png";
import precipitationIcon from "../assets/precipitation.png";
import humidityIcon from "../assets/humidity.png";
import visibilityIcon from "../assets/visibility.png";
import MainCard from "../components/MainCard";
import FivedayDataCard from "../components/FivedayDataCard";

const Home = ({ weatherData, cityName, temperatureUnit }) => {
  // coversion of temperature
  const convertTemperature = (tempInC) => {
    return temperatureUnit === "C" ? tempInC : (tempInC * 9) / 5 + 32;
  };
  const currentTemp = weatherData?.current_weather?.temperature;
  // const currentTempUnit = weatherData?.current_weather_units?.temperature;

  // Convert temperatures using the function
  const convertedCurrentTemp = convertTemperature(currentTemp);
  const tempMin = weatherData?.daily?.temperature_2m_min[0];
  const tempMax = weatherData?.daily?.temperature_2m_max[0];
  const convertedTempMin = convertTemperature(tempMin);
  const convertedTempMax = convertTemperature(tempMax);

  // const tempMinUnit = weatherData?.daily_units?.temperature_2m_min;
  // const tempMaxUnit = weatherData?.daily_units?.temperature_2m_max;
  const tempMinUnit = temperatureUnit;
  const tempMaxUnit = temperatureUnit;
  const weatherDetails = [
    {
      Name: "Wind Speed",
      property: weatherData?.current_weather?.windspeed,
      unit: weatherData?.current_weather_units?.windspeed,
      icon: windIcon,
    },
    {
      Name: "Humidity",
      property: weatherData?.hourly?.relative_humidity_2m[0],
      unit: weatherData?.hourly_units?.relative_humidity_2m,
      icon: humidityIcon,
    },
    {
      Name: "Precipitation",
      property: weatherData?.daily?.precipitation_sum[0],
      unit: weatherData?.daily_units?.precipitation_sum,
      icon: precipitationIcon,
    },
    {
      Name: "Visibility",
      property: weatherData?.hourly?.visibility[0],
      unit: weatherData?.hourly_units?.visibility,
      icon: visibilityIcon,
    },
    {
      Name: "UV Index",
      property: weatherData?.daily?.uv_index_max[0],
      unit: weatherData?.daily_units?.uv_index_max,
      icon: uvIndexIcon,
    },
  ];

  return (
    <>
      <MainCard
        cityName={cityName}
        currentTemp={convertedCurrentTemp}
        currentTempUnit={temperatureUnit}
        tempMin={convertedTempMin}
        tempMax={convertedTempMax}
        tempMaxUnit={tempMaxUnit}
        tempMinUnit={tempMinUnit}
      />
      <FivedayDataCard
        weatherData={weatherData}
        temperatureUnit={temperatureUnit}
      />
      {weatherData && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full p-4">
          {weatherDetails.map((item, index) => (
            <Cards
              key={index}
              weatherDetail={item.Name}
              weatherProperty={item.property}
              propertyUnit={item.unit}
              icon={item.icon}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Home;
