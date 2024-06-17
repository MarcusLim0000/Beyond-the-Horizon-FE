import { useState } from "react";
import { signUp } from "../../utilities/users-api";

function SignUp() {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(evt) {
    setState({ ...state, [evt.target.name]: evt.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (state.password !== state.confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    const { confirmPassword, ...userData } = state;

    try {
      await signUp(userData);
      alert("Sign up is successful! Please sign in now!");
    } catch (error) {
      console.log(error);
      alert("An error occurred. Please try again!");
    }
  }

  return (
    <>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            name="name"
            placeholder="Name"
            type="text"
            value={state.name}
            onChange={handleChange}
          />
          <label>Email</label>
          <input
            name="email"
            placeholder="Email"
            type="email"
            value={state.email}
            onChange={handleChange}
          />
          <label>Password</label>
          <input
            name="password"
            placeholder="Password"
            type="password"
            value={state.password}
            onChange={handleChange}
          />
          <label>Confirm password</label>
          <input
            name="confirmPassword"
            placeholder="Retype Password"
            type="password"
            value={state.confirmPassword}
            onChange={handleChange}
          />
          <button type="submit">Sign Up!</button>
        </form>
      </div>
    </>
  );
}

export default SignUp;
