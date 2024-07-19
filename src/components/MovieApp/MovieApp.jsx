import React, { useState, useEffect } from "react";
import "./MovieApp.css";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import MovieCard from "../MovieCard/MovieCard";

const MovieApp = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async () => {
    setLoading(true);
    const response = await axios.get(
      `https://openlibrary.org/search.json?q=${searchQuery}`
    );
    setMovies(response.data.docs);
    setLoading(false);
  };

  useEffect(() => {
    if (searchQuery) {
      fetchMovies();
    }
  }, [searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = () => {
    fetchMovies();
  };

  return (
    <div>
      <h1>MovieSearch App</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Movies..."
          value={searchQuery}
          onChange={handleSearch}
          className="search-input"
        />
        <button className="search-button" onClick={handleSubmit}>
          <FaSearch className="search-icon" />{" "}
        </button>
      </div>
      {loading? (
        <p>Loading....</p>
      ) : (
        <ul>
          {movies.map((movie) => (
            <MovieCard key={movie.key} movie={movie} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieApp;