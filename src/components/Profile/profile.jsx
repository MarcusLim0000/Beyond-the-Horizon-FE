import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteListing, getFlight } from "../../utilities/users-api";

export default function Profile({ user, setUser }) {
  const [flights, setFlights] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  function handleCreateHoliday() {
    navigate("/create-holiday"); // Navigate to the create-holiday page
  }

  const fetchFlights = async () => {
    try {
      if (!token) {
        alert("Unauthorised user! Someone call 911!");
        return;
      }
      const userId = user._id;
      const data = await getFlight(userId);
      setFlights(data);
    } catch (error) {
      console.error("Error fetching flights:", error);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  async function handleDelete(id) {
    try {
      await deleteListing(id);
      fetchFlights();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <p>This is the profile page!</p>
      <div className="flights-container">
        {flights.length > 0 ? (
          flights.map((flight) => (
            <div key={flight._id} className="flight-card">
              <h3>Flight Details</h3>
              <p>Flight Number: {flight.flightNumber}</p>
              <p>Airport: {flight.airport}</p>
              <p>
                Departure Date: {new Date(flight.date).toLocaleDateString()}
              </p>
              <p>Arrival Date: {new Date(flight.time).toLocaleDateString()}</p>
              <p>Gate: {flight.gate}</p>
              <p>Cost: {flight.cost}</p>
              <button
                onClick={() => {
                  handleDelete(flight._id);
                }}
              >
                Delete
              </button>
              <button>Edit</button>
            </div>
          ))
        ) : (
          <p>No flights available.</p>
        )}
      </div>
      <div>
        <button onClick={handleCreateHoliday}>Create a holiday here!</button>
      </div>
    </div>
  );
}
