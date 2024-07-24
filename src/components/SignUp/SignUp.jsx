import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../utilities/users-api";

export default function SignUp() {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  function handleChange(evt) {
    setState({ ...state, [evt.target.name]: evt.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (state.password !== state.confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    if (state.password) {
      const password = state.password;
      const strongPasswordRegex =
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

      if (!strongPasswordRegex.test(password)) {
        alert(
          "Please use a stronger password that includes special characters, numbers, and a minimum of 8 characters"
        );
        return;
      }
    }

    const { confirmPassword, ...userData } = state;

    try {
      await signUp(userData);
      alert("Sign up is successful! Please sign in now!");
      navigate("/signIn");
    } catch (error) {
      console.log(error);
      alert("An error occurred. Please try again!");
    }
  }

  return (
    <>
      <div className="flex justify-center items-center flex-col w-full max-w-md mx-auto p-5 shadow-lg rounded-lg box-border bg-white">
        <form onSubmit={handleSubmit} className="flex flex-col w-full">
          <label className="mt-2 mb-1 font-bold">Name</label>
          <input
            name="name"
            placeholder="Name"
            type="text"
            value={state.name}
            onChange={handleChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded-md box-border"
          />
          <label className="mt-2 mb-1 font-bold">Email</label>
          <input
            name="email"
            placeholder="Email"
            type="email"
            value={state.email}
            onChange={handleChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded-md box-border"
          />
          <label className="mt-2 mb-1 font-bold">Password</label>
          <input
            name="password"
            placeholder="Password"
            type="password"
            value={state.password}
            onChange={handleChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded-md box-border"
          />
          <label className="mt-2 mb-1 font-bold">Confirm password</label>
          <input
            name="confirmPassword"
            placeholder="Retype Password"
            type="password"
            value={state.confirmPassword}
            onChange={handleChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded-md box-border"
          />
          <button type="submit" className="py-3 bg-blue-400 hover:bg-blue-600 text-white rounded-md text-lg cursor-pointer">
            Sign up!
          </button>
        </form>
      </div>
    </>
  );
}
