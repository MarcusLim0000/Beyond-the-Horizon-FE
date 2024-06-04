import { Route, Routes, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/profile"; // Import Profile component
import { getUser } from "./utilities/user-services";

function App() {
  const [user, setUser] = useState(getUser());

  return (
    <div>
      <nav>
        {!user && (
          <>
            <Link to="/">
              <div className="logo">img goes here</div>
            </Link>
            <Link to="/signIn">
              <button className="signIN_button">Sign In</button>
            </Link>
            <Link to="/signUp">
              <button className="signUp_button">Sign Up</button>
            </Link>
          </>
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
        </Routes>
      </main>
    </div>
  );
}

export default App;
