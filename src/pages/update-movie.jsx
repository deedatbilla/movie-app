import { API } from "aws-amplify";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";

function UpdateMovie({ match }) {
  const { id } = match.params;
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({ name: "", year: "", directorId: "" });
  const [directors, setDirectors] = useState([]);
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const fetchAllDirectors = async () => {
    try {
      const apiName = "moviesAPi";
      const path = `/all-directors`;
      const response = await API.get(apiName, path);
      setDirectors(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchAllDirectors();
  }, []);

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const apiName = "moviesAPi";
      const path = `/update-movie`;
      const { name, year } = values;
      const payload = {
        body: {
          year: Number(year),
          name,
          id: Number(id),
        },
      };
      console.log(payload);
      const response = await API.put(apiName, path, payload);
      setLoading(false);
      toast.success("Movie successfully updated");
      history.push("/");
    } catch (error) {
      setLoading(false);
      toast.error("error adding movie");
      console.log(error.response.data);
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Movie name"
          name="name"
          required
          className=" bg-gray-200 px-4 py-2 rounded-lg my-2 "
          onChange={onChange}
        />
        <input
          type="number"
          name="year"
          required
          placeholder="Year released"
          className=" bg-gray-200 px-4 py-2 rounded-lg my-2 "
          onChange={onChange}
        />
        
        <button className="flex flex-col text-center bg-blue-600 rounded-md px-3 py-2 w-full">
          <p className="text-center">
            {" "}
            {loading ? "updating movie" : "Update"}
          </p>
        </button>
      </form>
    </div>
  );
}

export default UpdateMovie;
