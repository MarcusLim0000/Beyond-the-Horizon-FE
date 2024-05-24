import { Route, Routes, Link } from "react-router-dom";
import "./App.css";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import Home from "./components/Home/Home";

function App() {
  return (
    <div>
      <nav>
        <Link to="/">
          <div className="logo">img goes here</div>
        </Link>
        <Link to="/signIn">
          <button className="signIN_button">Sign In</button>
        </Link>
        <Link to="/signUp">
          <button className="signUp_button">Sign Up</button>
        </Link>
      </nav>
      <main>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signIn" element={<SignIn />} />
          <Route exact path="/signUp" element={<SignUp />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
