import { API } from "aws-amplify";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";

function AddMovie() {
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
      const path = `/add-movie`;
      const payload = {
        body: {
          ...values,
          year: Number(values.year),
          directorId: Number(values.directorId),
        },
      };
      console.log(payload);
      const response = await API.post(apiName, path, payload);
      setLoading(false);
      toast.success("Movie successfully added");
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
        <select
          name="directorId"
          required
          className=" bg-gray-200 px-4 py-2 rounded-lg my-2 "
          onChange={onChange}
          value={""}
        >
          <option>Select director</option>
          {directors.map((item) => (
            <option value={item.id}>
              {item?.first_name} {item?.last_name}
            </option>
          ))}
        </select>
        <button className="flex text-center justify-center items-center bg-blue-600 rounded-md px-3 py-2 w-full">
          <p className="text-center"> {loading ? "submitting" : "Submit"}</p>
        </button>
      </form>
    </div>
  );
}

export default AddMovie;
