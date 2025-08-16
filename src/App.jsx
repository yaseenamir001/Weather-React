import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForecastList from "./components/ForecastList";
import "./App.css";

export default function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const fetchWeather = async (cityName) => {
    try {
      setLoading(true);
      setError("");

      const [weatherRes, forecastRes] = await Promise.all([
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
        ),
        fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`
        ),
      ]);

      if (!weatherRes.ok) throw new Error("City not found");
      if (!forecastRes.ok) throw new Error("Forecast not found");

      const weatherJson = await weatherRes.json();
      const forecastJson = await forecastRes.json();

      setWeatherData(weatherJson);

      const today = new Date().toDateString();
      const uniqueDates = [];

      const filteredData = forecastJson.list.filter((item) => {
        const date = new Date(item.dt_txt).toDateString();
        if (date !== today && !uniqueDates.includes(date)) {
          uniqueDates.push(date);
          return true;
        }
        return false;
      });

      setForecastData(filteredData);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
      setForecastData([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchSuggestions = async (query) => {
    if (query.length < 2) return setSuggestions([]);
    const geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`;
    const res = await fetch(geoURL);
    const data = await res.json();
    setSuggestions(data);
  };

  const handleSearch = () => {
    if (!city.trim()) {
      setError("Enter a city name");
      return;
    }
    fetchWeather(city);
    setSuggestions([]);
  };

  const handleSuggestionClick = (name) => {
    setCity(name);
    fetchWeather(name);
    setSuggestions([]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-poppins bg-gradient-to-br from-[#0f2027] via-[#1b2735] to-[#2c5364]">
      <div className="w-[95%] max-w-md h-[565px] rounded-3xl bg-white/10 backdrop-blur-xl border border-white/50 shadow-[0_8px_24px_rgba(0,0,0,0.4),0_4px_8px_rgba(0,0,0,0.3)] flex flex-col p-8 sm:p-8">
        <SearchBar
          city={city}
          setCity={setCity}
          suggestions={suggestions}
          fetchSuggestions={fetchSuggestions}
          handleSearch={handleSearch}
          handleSuggestionClick={handleSuggestionClick}
        />

        <div className="flex-1 flex flex-col items-center justify-center">
          {loading ? (
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-2 text-white text-sm">Loading</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center">
              <img
                src="/not-found.png"
                alt="City Not Found"
                className="w-48 h-48 object-contain"
              />
              <p className="mt-2 text-white text-lg sm:text-2xl font-semibold">
                City Not Found
              </p>
            </div>
          ) : !weatherData ? (
            <div className="flex flex-col items-center">
              <img
                src="/search-city.png"
                alt="Search City"
                className="w-48 h-48 object-contain"
              />
              <p className="mt-8 text-white text-lg sm:text-2xl font-semibold">
                Search a city to get started
              </p>
            </div>
          ) : (
            <div className="place-detail flex flex-col gap-6 mt-4 w-full">
              <WeatherCard data={weatherData} />
              <ForecastList data={forecastData} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
