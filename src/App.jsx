import { Route, Routes, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/profile"; // Import Profile component
import CreateHoliday from "./components/createHoliday/createHoliday";
import { getUser, logOut } from "./utilities/user-services"; // Import logOut function

function App() {
  const [user, setUser] = useState(getUser());
  const navigate = useNavigate(); // Use navigate for routing

  function handleSignOut() {
    logOut();
    setUser(null);
    navigate("/"); // Navigate to home after sign out
  }

  return (
    <div>
      <nav>
        {!user ? (
          <Link to="/">
            <div className="logo">img goes here</div>
          </Link>
        ) : (
          <div className="logo">img goes here</div>
        )}
        {!user ? (
          <>
            <Link to="/signIn">
              <button className="signIn_button">Sign In</button>
            </Link>
            <Link to="/signUp">
              <button className="signUp_button">Sign Up</button>
            </Link>
          </>
        ) : (
          <button onClick={handleSignOut} className="signOut_button">Sign Out</button>
        )}
      </nav>
      <main>
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
          <Route exact path="/create-holiday" element={<CreateHoliday />} /> {/* Define the route */}
        </Routes>
      </main>
    </div>
  );
}

export default App;
