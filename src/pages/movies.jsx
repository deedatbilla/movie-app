import { API } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Loader from "../components/loader";
import MovieCard from "../components/movie-card";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const fetchMovies = async () => {
    try {
      setLoading(true);
      const apiName = "moviesAPi";
      const path = "/all-movies";
      const response = await API.get(apiName, path);
      setMovies(response.data);
      setLoading(false);
      console.log(response);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="bg-slate-200 h-screen ">
      <div className="bg-blue-300 p-2">
        <p>Actions</p>
        <div className="flex items-end justify-between my-3 ">
          <button
            className="flex justify-center items-center bg-purple-600 rounded-md px-3 py-2"
            onClick={() => history.push("/add-director")}
          >
            Add Director
          </button>
          <button
            className="flex justify-center items-center bg-purple-600 rounded-md px-3 py-2"
            onClick={() => history.push("/add-movie")}
          >
            Add new movie
          </button>
        </div>
        <button
          className="flex justify-center justify-center items-center items-center bg-purple-600 rounded-md px-3 py-2 w-full"
          onClick={() => history.push("/update-director")}
        >
          Update Director
        </button>
      </div>
      <div className="p-3">
        <p>All Movies</p>

        <div className="grid grid-cols-2 gap-3">
          {movies.map((item, idx) => (
            <MovieCard key={idx} data={item} />
          ))}
        </div>
      </div>
      {loading && <Loader />}
    </div>
  );
}

export default Movies;
