import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../../utilities/user-services";

export default function Profile({ user, setUser }) {
  const navigate = useNavigate();

  function handleSignOut() {
    logOut();
    setUser(null);
    navigate("/"); // Navigate to home after sign out
  }

  return (
    <div>
      <button onClick={handleSignOut}>
        Sign Out
      </button>
      <p>This is the profile page!</p>
    </div>
  );
}
