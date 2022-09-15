import { API } from "aws-amplify";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";

function UpdateDirector() {
  const [loading, setLoading] = useState();
  const history = useHistory();
  const [directors, setDirectors] = useState([]);
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    directorId: "",
  });
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
      const path = `/update-director`;
      const payload = {
        body: {
          ...values,
          id: Number(values.directorId),
        },
      };
      console.log(payload);
      const response = await API.put(apiName, path, payload);
      setLoading(false);
      toast.success("Director  successfully updated");
      history.push("/");
    } catch (error) {
      setLoading(false);
      toast.error("error updating director");
      console.log(error.response.data);
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="First name"
          name="firstName"
          required
          className=" bg-gray-200 px-4 py-2 rounded-lg my-2 "
          onChange={onChange}
        />
        <input
          type="text"
          name="lastName"
          required
          placeholder="Last name"
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

export default UpdateDirector;
