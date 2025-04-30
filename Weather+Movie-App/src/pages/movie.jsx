import React, { useState } from "react";
import { Link } from "react-router-dom";

function Movie() {
  const [query, setQuery] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState(null);

  const apiKey = "bd4ae7c54ba72cad94e4440a1f5457a6";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      const searchRes = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`
      );
      if (!searchRes.ok) throw new Error("Movie search failed");
      const searchData = await searchRes.json();

      if (searchData.results.length === 0) {
        setRecommendations([]);
        alert("Movie not found. Try a different title.");
        return;
      }

      const movieId = searchData.results[0].id;
      const recRes = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${apiKey}`
      );
      if (!recRes.ok) throw new Error("Failed to fetch recommendations");

      const recData = await recRes.json();

      if (recData.results.length === 0) {
        setRecommendations([]);
        alert("No related movies found.");
        return;
      }

      setRecommendations(recData.results.slice(0, 6));
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
      setRecommendations([]);
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

      <div className="font-sans px-4 py-8 max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Movie Recommendations App</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-6">
          <input
            type="text"
            value={query}
            placeholder="Enter a movie name"
            onChange={(e) => setQuery(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
          >
            Find Related Movies
          </button>
        </form>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {recommendations.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendations.map((movie) => (
              <div key={movie.id} className="bg-white rounded-lg shadow-md p-4">
                <h3 className="text-lg font-semibold mb-1">{movie.title}</h3>
                <p className="text-sm text-gray-500 mb-2">{movie.release_date}</p>
                <p className="text-sm">{movie.overview.slice(0, 120)}...</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Movie;
