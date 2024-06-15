import { Route, Routes, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getUser, logOut } from "./utilities/user-services"; 
import "./App.css";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/profile";
import CreateHoliday from "./components/createHoliday/createHoliday";
import ShowForms from "./components/showForms/showForms";
import CurrencyConverter from "./components/currencyCon/currencyCon";

function App() {
  const [user, setUser] = useState(getUser());
  const navigate = useNavigate();

  function handleSignOut() {
    logOut();
    setUser(null);
    navigate("/");
  }

  return (
    <div>
<header>
  <div className="logo-container">
    <Link to="/">
      <div className="logo"></div>
    </Link>
  </div>
  <nav>
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
      <>
        <Link to="/currency-converter">
          <button className="currency_button">Convert your currency here!</button>
        </Link>
        <button onClick={handleSignOut} className="signOut_button">Sign Out</button>
      </>
    )}
  </nav>
</header>


      <main>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signIn" element={<SignIn setUser={setUser} user={user} />} />
          <Route exact path="/signUp" element={<SignUp />} />
          <Route exact path="/profile" element={<Profile user={user} setUser={setUser} />} />
          <Route exact path="/create-holiday" element={<CreateHoliday />} />
          <Route exact path="/details/:holidayId" element={<ShowForms />} />
          <Route exact path="/currency-converter" element={<CurrencyConverter />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
