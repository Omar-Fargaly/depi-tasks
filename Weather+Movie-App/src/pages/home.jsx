import React, { useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const apiKey = "aceb42b315d84775ad3165427252102";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!location.trim()) return;

    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Location not found.");
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setWeatherData(null);
      alert("City not found. Please enter a valid location.");
    }
  };

  return (
    <>
    <div className="flex justify-center mt-5 mb-2">
        <ul className="flex gap-3">
            <li><Link to="/" className="text-xl">Weather</Link></li>
            <li><Link to="/movie" className="text-xl">Movie</Link></li>
        </ul>
    </div>
    <div className="font-sans px-4 py-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Weather App</h2>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <input
          type="text"
          value={location}
          placeholder="Enter location"
          onChange={(e) => setLocation(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
        >
          Get Weather
        </button>
      </form>

      {weatherData && (
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <h3 className="text-xl font-semibold mb-2">
            {weatherData.location.name}, {weatherData.location.country}
          </h3>
          <p className="text-lg">Temp: {weatherData.current.temp_c}°C</p>
          <p className="text-md">
            Condition: {weatherData.current.condition.text}
          </p>
        </div>
      )}
    </div>
    </>
  );
}

export default Home;
