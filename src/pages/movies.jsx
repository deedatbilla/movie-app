import { API } from "aws-amplify";
import React, { useEffect, useState } from "react";
import MovieCard from "../components/movie-card";

function Movies() {
  const [movies, setMovies] = useState([]);
  const fetchMovies = async () => {
    try {
      const apiName = "moviesAPi";
      const path = "/all-movies";
      const response = await API.get(apiName, path);
      setMovies(response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="bg-black h-screen p-3">
      <p>All Movies</p>

      <div className="grid grid-cols-2 gap-3">
        {movies.map((item, idx) => (
          <MovieCard key={idx} data={item} />
        ))}
      </div>
    </div>
  );
}

export default Movies;
