import "./SignIn.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as usersService from "../../utilities/user-services";

function SignIn({ setUser, user }) {
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
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            name="email"
            placeholder="Email"
            value={state.email}
            type="email"
            onChange={handleChange}
          />
          <label>Password</label>
          <input
            name="password"
            placeholder="Password"
            value={state.password}
            type="password"
            onChange={handleChange}
          />
          <button type="submit">LOG IN</button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </>
  );
}

export default SignIn;
