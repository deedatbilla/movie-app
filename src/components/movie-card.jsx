import React from "react";
import { Link } from "react-router-dom";

function MovieCard({ data }) {
  const { name, release_year,id } = data;
  return (
    <Link to={`/movie/${id}`} className=" shadow-md bg-white flex flex-col p-3 rounded-md cursor-pointer" >
      <p>Movie name: {name}</p>
      <p>Year:{release_year}</p>
    </Link>
  );
}

export default MovieCard;
