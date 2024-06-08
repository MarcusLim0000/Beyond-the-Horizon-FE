import { useNavigate } from "react-router-dom";

export default function Profile({ user, setUser }) {
  
  const navigate = useNavigate();

  function handleCreateHoliday() {
    navigate("/create-holiday"); // Navigate to the create-holiday route
  }

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <p>This is the profile page!</p>
      <div>
        <button onClick={handleCreateHoliday}>Create a holiday here!</button>
      </div>
    </div>
  );
}
