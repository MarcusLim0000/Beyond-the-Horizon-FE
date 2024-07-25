import { Route, Routes, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getUser, logOut } from "./utilities/user-services";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/profile";
import CreateHoliday from "./components/createHoliday/createHoliday";
import ShowForms from "./components/showForms/showForms";
import CurrencyConverter from "./components/currencyCon/currencyCon";
import ImageUpload from "./components/imageUpload/imageUpload";
import logo from "./assets/logo.jpg";
import background from "./assets/background.jpg";

export default function App() {
  const [user, setUser] = useState(getUser());
  const navigate = useNavigate();

  function handleSignOut() {
    logOut();
    setUser(null);
    navigate("/");
  }

  return (
    <div className="flex flex-col md:flex-row">
      <nav className="w-full h-40 md:w-64 md:h-screen bg-gray-800 text-white flex flex-col md:flex-col">
        <div className="logo-container p-4 flex-shrink-0 md:block flex items-center justify-center">
          {!user ? (
            <Link to="/">
              <img
                src={logo}
                alt="Logo"
                className="w-9 h-9 md:w-24 md:h-24 mx-auto md:mx-0"
              />
            </Link>
          ) : (
            <img
              src={logo}
              alt="Logo"
              className="w-9 h-9 md:w-24 md:h-24 mx-auto md:mx-0"
            />
          )}
        </div>
        <div className="flex flex-row md:flex-col flex-1 justify-between mt-4 md:mt-0">
          <div className="flex flex-row md:flex-col items-center justify-center">
            {!user ? (
              <>
                <Link to="/signIn">
                  <button className="signIn_button bg-blue-500 text-white py-2 px-4 m-2 rounded">
                    Sign In
                  </button>
                </Link>
                <Link to="/signUp">
                  <button className="signUp_button bg-green-500 text-white py-2 px-4 m-2 rounded">
                    Sign Up
                  </button>
                </Link>
              </>
            ) : (
              <Link to="/currency-converter">
                <button className="currency_button bg-yellow-500 text-white py-2 px-4 m-2 rounded">
                  Convert your currency here!
                </button>
              </Link>
            )}
          </div>
          {user && (
            <button
              onClick={handleSignOut}
              className="signOut_button bg-red-500 text-white py-2 px-4 m-2 rounded mt-auto"
            >
              Sign Out
            </button>
          )}
        </div>
      </nav>
      <main
        className="flex-1 p-4"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            exact
            path="/signIn"
            element={<SignIn setUser={setUser} user={user} />}
          />
          <Route exact path="/signUp" element={<SignUp />} />
          <Route
            exact
            path="/profile"
            element={<Profile user={user} setUser={setUser} />}
          />
          <Route exact path="/create-holiday" element={<CreateHoliday />} />
          <Route exact path="/details/:holidayId" element={<ShowForms />} />
          <Route
            exact
            path="/currency-converter"
            element={<CurrencyConverter />}
          />
          <Route
            exact
            path="/image-upload/:holidayId"
            element={<ImageUpload />}
          />
        </Routes>
      </main>
    </div>
  );  
}  
