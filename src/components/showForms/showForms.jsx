import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import HotelForm from "../hotelForm/hotelForm";
import FlightForm from "../flightForm/flightForm";
import EventForm from "../eventForm/eventForm";
import { getFlights } from "../../utilities/users-api"; // Ensure this function is correctly named

export default function ShowForms() {
  const { holidayId } = useParams(); // Retrieve the holidayId from URL params
  const [showHotelForm, setShowHotelForm] = useState(false);
  const [showFlightForm, setShowFlightForm] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);
  const [flights, setFlights] = useState([]);

  const handleHotelClick = () => setShowHotelForm(!showHotelForm);
  const handleFlightClick = () => setShowFlightForm(!showFlightForm);
  const handleEventClick = () => setShowEventForm(!showEventForm);

  useEffect(() => {
    async function fetchFlights() {
      try {
        const flightData = await getFlights(holidayId);
        setFlights(flightData);
      } catch (error) {
        console.error("Error fetching flights:", error);
      }
    }

    if (holidayId) {
      fetchFlights();
    }
  }, [holidayId]);

  return (
    <>
      <nav>
        <Link to="/profile">Go back to profile page</Link>
      </nav>
      <h2>Create a New Holiday</h2>
      <div>
        <button onClick={handleFlightClick}>Add a flight here</button>
        {showFlightForm && <FlightForm holidayId={holidayId} />}
      </div>
      <div>
        <button onClick={handleHotelClick}>Add your lodgings here</button>
        {showHotelForm && <HotelForm holidayId={holidayId} />}
      </div>
      <div>
        <button onClick={handleEventClick}>Add an event here</button>
        {showEventForm && <EventForm holidayId={holidayId} />}
      </div>
      <div>
        <h3>Existing Flights</h3>
        {flights.length > 0 ? (
          flights.map((flight) => (
            <div key={flight._id} className="flight-card">
              <h4>Flight Number: {flight.flightNumber}</h4>
              <p>Date: {new Date(flight.date).toLocaleDateString()}</p>
              <p>Time: {flight.time}</p>
              <p>Airport: {flight.airport}</p>
              <p>Gate: {flight.gate}</p>
              <p>Cost: {flight.cost}</p>
              <button>Edit</button>
              <button>Delete</button>
            </div>
          ))
        ) : (
          <p>No flights available.</p>
        )}
      </div>
    </>
  );
}
