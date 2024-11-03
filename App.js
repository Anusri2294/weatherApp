import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";

import CityDropdown from "./components/CityDropdown";

function App() {
  const [searchCity, setSearchCity] = useState("");
  const [cityData, setCityData] = useState("");
  const searchLat = cityData?.results?.[0]?.latitude;
  const searchLon = cityData?.results?.[0]?.longitude;
  const [lastSearchedCities, setLastSearchedCities] = useState([]);
  const [temperatureUnit, setTemperatureUnit] = useState("C");
  const [loading, setLoading] = useState(false);

  // fetch the latitude and longitude of the searched city

  const fetchSearchCity = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          searchCity
        )}`
      );
      const data = await response.json();

      setCityData(data);
      // save the last three searched city in local storage

      const searchedCity = { cityName: searchCity, cityData: data };
      let searchCityHistory =
        JSON.parse(localStorage.getItem("searchHistory")) || [];

      searchCityHistory = searchCityHistory.filter(
        (item) => item.cityName !== searchCity
      );

      searchCityHistory.unshift(searchedCity);

      if (searchCityHistory.length > 3) {
        searchCityHistory.pop();
      }

      localStorage.setItem("searchHistory", JSON.stringify(searchCityHistory));

      setLastSearchedCities(searchCityHistory);
      setLoading(false);
    } catch (error) {
      console.error("Failed to Fetch the searched City Name:", error);
    }
  };

  // fetch the weatherdata of searched city
  const handleCitySearch = (searchCity) => {
    fetchSearchCity(searchCity);
  };

  useEffect(() => {
    if (searchLat && searchLon) {
      // call fetchWeatherData() to get the weather data of current location
      fetchWeatherData(searchLat, searchLon);

      // call currentCity() to get name of the searched city by the  user
      currentCity(searchLat, searchLon);
    }
  }, [searchLat, searchLon]);
  // fetch the weather data of the current loaction of the user
  const [weatherData, setWeatherData] = useState("");
  const [cityName, setCityName] = useState("");

  const fetchWeatherData = async (userlatitude, userlongitude) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${userlatitude}&longitude=${userlongitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode,uv_index_max&hourly=temperature_2m,relative_humidity_2m,precipitation,visibility&timezone=auto`
      );
      const userWeatherData = await response.json();

      setWeatherData(userWeatherData);
      setLoading(false);
    } catch (error) {
      console.error("Failed to Fetch the weather data:", error);
    }
  };
  // fetch the city name of the current location and for the searched city name of the user accordingly
  const currentCity = async (userlatitude, userlongitude) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${userlatitude}&lon=${userlongitude}&format=json`
      );

      if (!response.ok) {
        throw new Error("Error Fetching the Data");
      }

      const cityData = await response.json();

      if (cityData && cityData.address) {
        setCityName(
          cityData.address.suburb ||
            cityData.address.county ||
            cityData.address.neighbourhood
        );
      }
      setLoading(false);
    } catch (error) {
      console.error("Failed to Fetch the  City Name:", error);
    }
  };

  // get the current location of the user
  const currentLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userlatitude = position.coords.latitude;
        const userlongitude = position.coords.longitude;

        // call currentCity() to get name of the city of current location of user
        currentCity(userlatitude, userlongitude);
        // call fetchWeatherData() to get the weather data of current location
        fetchWeatherData(userlatitude, userlongitude);
      });
    }
  };
  // get the currentlocation data initially
  useEffect(() => {
    currentLocation();
  }, []);
  // fetch the last three stored city and store it in array
  useEffect(() => {
    const storedCities =
      JSON.parse(localStorage.getItem("searchHistory")) || [];
    setLastSearchedCities(storedCities);
  }, []);
  const handleSelectCity = (selectedCityName) => {
    const selectedCity = lastSearchedCities.find(
      (city) => city.cityName === selectedCityName
    );
    if (selectedCity) {
      setCityData(selectedCity.cityData);
      const { selectlatitude, selectlongitude } =
        selectedCity.cityData.results[0];
      fetchWeatherData(selectlatitude, selectlongitude);
    }
  };
  // toggle between the units of temperature
  const toggleTemperatureUnit = () => {
    setTemperatureUnit((prev) => (prev === "C" ? "F" : "C"));
  };
  return (
    <>
      <div className="App">
        {loading ? (
          <div className="fixed h-full w-full left-0 top-0 bg-white z-[500] bg-opacity-60 flex items-center justify-center">
            Loading Report, Please Wait !
          </div>
        ) : (
          <div>
            <Navbar
              handleCitySearch={handleCitySearch}
              searchCity={searchCity}
              setSearchCity={setSearchCity}
              cityData={cityData}
              currentLocation={currentLocation}
            />
            <CityDropdown
              cities={lastSearchedCities}
              onSelectCity={handleSelectCity}
            />
            <button
              type="button"
              className="w-48  px-4 py-1 m-3 border-2 rounded-lg cursor-pointer text-base hover:bg-gray-400 hover:text-black"
              onClick={toggleTemperatureUnit}
            >
              Switch to °{temperatureUnit === "C" ? "F" : "C"}
            </button>
            <Home
              cityName={cityName}
              weatherData={weatherData}
              temperatureUnit={temperatureUnit}
            />
            {searchCity && cityData?.results?.length > 0 && (
              <Home
                cityName={searchCity}
                weatherData={weatherData}
                temperatureUnit={temperatureUnit}
              />
            )}{" "}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
