import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import HotelForm from "../hotelForm/hotelForm";
import FlightForm from "../flightForm/flightForm";
import EventForm from "../eventForm/eventForm";
import { getFlights, getHotels, getEvents } from "../../utilities/users-api"; // Ensure these functions are correctly imported

export default function ShowForms() {
  const { holidayId } = useParams(); // Retrieve the holidayId from URL params
  const [showHotelForm, setShowHotelForm] = useState(false);
  const [showFlightForm, setShowFlightForm] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);
  const [flights, setFlights] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [events, setEvents] = useState([]);

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

  useEffect(() => {
    async function fetchHotels() {
      try {
        const hotelData = await getHotels(holidayId);
        setHotels(hotelData);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    }

    if (holidayId) {
      fetchHotels();
    }
  }, [holidayId]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const eventData = await getEvents(holidayId);
        setEvents(eventData);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }

    if (holidayId) {
      fetchEvents();
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
      <div>
        <h3>Existing Hotels</h3>
        {hotels.length > 0 ? (
          hotels.map((hotel) => (
            <div key={hotel._id} className="hotel-card">
              <h4>Hotel Name: {hotel.name}</h4>
              <p>Address: {hotel.address}</p>
              <p>Rooms: {hotel.rooms}</p>
              <p>Check-In Date: {new Date(hotel.checkInDate).toLocaleDateString()}</p>
              <p>Check-In Time: {hotel.checkInTime}</p>
              <p>Check-Out Date: {new Date(hotel.checkOutDate).toLocaleDateString()}</p>
              <p>Check-Out Time: {hotel.checkOutTime}</p>
              <p>Cost: {hotel.cost}</p>
              <button>Edit</button>
              <button>Delete</button>
            </div>
          ))
        ) : (
          <p>No lodgings available.</p>
        )}
      </div>
      <div>
        <h3>Existing Events</h3>
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event._id} className="event-card">
              <h4>Event Title: {event.title}</h4>
              <p>Address: {event.address}</p>
              <p>Date: {new Date(event.date).toLocaleDateString()}</p>
              <p>Start Time: {event.startTime}</p>
              <p>End Time: {event.endTime}</p>
              <p>Cost: {event.cost}</p>
              <button>Edit</button>
              <button>Delete</button>
            </div>
          ))
        ) : (
          <p>No events available.</p>
        )}
      </div>
    </>
  );
}
