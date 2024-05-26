import "./SignIn.css";
import React, { useState } from "react";
// import * as usersService from "utilities-users-service"

function SignIn({ setUser }) {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  function handleChange(evt) {
    setState({ ...state, [evt.target.name]: evt.target.value, error: "" });
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
      </div>
    </>
  );
}

export default SignIn;
