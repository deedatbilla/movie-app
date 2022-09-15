import { API } from "aws-amplify";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";

function AddDirector() {
  const [loading, setLoading] = useState();
  const history = useHistory();
  const [values, setValues] = useState({ firstName: "", lastName: "" });
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const apiName = "moviesAPi";
      const path = `/add-director`;
      const payload = {
        body: {
          ...values,
        },
      };
      console.log(payload);
      const response = await API.post(apiName, path, payload);
      setLoading(false);
      toast.success("Director  successfully added");
      history.push("/")
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
        
        <button className="flex text-center bg-blue-600 rounded-md px-3 py-2 w-full">
          <p className="text-center"> {loading ? "submitting" : "Submit"}</p>
        </button>
      </form>
    </div>
  );
}

export default AddDirector;
