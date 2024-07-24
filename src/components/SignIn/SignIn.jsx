import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as usersService from "../../utilities/user-services";

export default function SignIn({ setUser, user }) {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(evt) {
    setState({ ...state, [evt.target.name]: evt.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const user = await usersService.login(state);
      setUser(user);
    } catch {
      setError("Log in failed - try again");
    }
  }

  useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  }, [user, navigate]);

  return (
    <>
      <div className="flex justify-center items-center flex-col w-full max-w-md mx-auto p-5 shadow-lg rounded-lg box-border bg-white">
        <form onSubmit={handleSubmit} className="flex flex-col w-full">
          <label className="mt-2 mb-1 font-bold">Email</label>
          <input
            name="email"
            placeholder="Email"
            value={state.email}
            type="email"
            onChange={handleChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded-md box-border"
          />
          <label className="mt-2 mb-1 font-bold">Password</label>
          <input
            name="password"
            placeholder="Password"
            value={state.password}
            type="password"
            onChange={handleChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded-md box-border"
          />
          <button type="submit" className="py-3 bg-blue-400 hover:bg-blue-600 text-white rounded-md text-lg cursor-pointer">
            Log in!
          </button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </>
  );
}
