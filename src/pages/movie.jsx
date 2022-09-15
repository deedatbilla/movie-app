import { API } from "aws-amplify";
import React, { useEffect, useState } from "react";

function Movies({ match }) {
  console.log(match);
  const { id } = match.params;
  const [movie, setMovie] = useState();
  const [director, setDirector] = useState();
  const fetchMovie = async () => {
    try {
      const apiName = "moviesAPi";
      const path = `/get-movie/${id}`;
      const response = await API.get(apiName, path);
      setMovie(response.data);
      await fetchDirector(response.data.directorId);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchDirector = async (directorId) => {
    try {
      const apiName = "moviesAPi";
      const path = `/get-director/${directorId}`;
      const response = await API.get(apiName, path);
      setDirector(response.data);
    } catch (error) {}
  };
  useEffect(() => {
    fetchMovie();
  }, []);

  return (
    <div className="">
      <p> Movie Details</p>

      <div className="grid grid-cols-2 gap-3">
        <p>Name :{movie?.name}</p>
        <p>Year :{movie?.release_year}</p>
      </div>

      <div>
        <p>
          Director: {director?.first_name} {director?.last_name}
        </p>
      </div>
    </div>
  );
}

export default Movies;
