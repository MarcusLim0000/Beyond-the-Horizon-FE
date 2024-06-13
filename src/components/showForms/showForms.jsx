import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import HotelForm from "../hotelForm/hotelForm";
import FlightForm from "../flightForm/flightForm";
import EventForm from "../eventForm/eventForm";
import {
  fetchFlights,
  fetchHotels,
  fetchEvents,
  handleDeleteFlight,
  handleDeleteHotel,
  handleDeleteEvent,
  handleUpdateFlight,
  handleUpdateHotel,
  handleUpdateEvent,
} from "../../utilities/form-services"; // Ensure the correct path to your form-services file

export default function ShowForms() {
  const { holidayId } = useParams(); // Retrieve the holidayId from URL params
  const [showHotelForm, setShowHotelForm] = useState(false);
  const [showFlightForm, setShowFlightForm] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);
  const [flights, setFlights] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [events, setEvents] = useState([]);
  const [refresh, setRefresh] = useState(false); // State to trigger re-fetching
  const [editMode, setEditMode] = useState({ type: null, item: null }); // State to track edit mode

  const handleHotelClick = () => setShowHotelForm(!showHotelForm);
  const handleFlightClick = () => setShowFlightForm(!showFlightForm);
  const handleEventClick = () => setShowEventForm(!showEventForm);

  useEffect(() => {
    if (holidayId) {
      fetchFlights(holidayId)
        .then((flightData) => setFlights(flightData))
        .catch((error) => console.error("Error fetching flights:", error));
      fetchHotels(holidayId)
        .then((hotelData) => setHotels(hotelData))
        .catch((error) => console.error("Error fetching hotels:", error));
      fetchEvents(holidayId)
        .then((eventData) => setEvents(eventData))
        .catch((error) => console.error("Error fetching events:", error));
    }
  }, [holidayId, refresh]); // Add refresh to dependency array

  function handleRefresh() {
    setRefresh((prev) => !prev); // Toggle refresh state
  }

  function handleEdit(item, type) {
    setEditMode({ type, item });
  }

  async function handleUpdate(type, item) {
    try {
      if (type === "flight") {
        await handleUpdateFlight(item._id, item);
      } else if (type === "hotel") {
        await handleUpdateHotel(item._id, item);
      } else if (type === "event") {
        await handleUpdateEvent(item._id, item);
      }
      handleRefresh();
      setEditMode({ type: null, item: null });
    } catch (error) {
      console.error(`Error updating ${type}:`, error);
    }
  }

  return (
    <>
      <nav>
        <Link to="/profile">Go back to profile page</Link>
      </nav>
      <h2>Create a New Holiday</h2>
      <div>
        <button onClick={handleFlightClick}>Add a flight here</button>
        {showFlightForm && (
          <FlightForm holidayId={holidayId} onSubmit={handleRefresh} />
        )}
      </div>
      <div>
        <button onClick={handleHotelClick}>Add your lodgings here</button>
        {showHotelForm && (
          <HotelForm holidayId={holidayId} onSubmit={handleRefresh} />
        )}
      </div>
      <div>
        <button onClick={handleEventClick}>Add an event here</button>
        {showEventForm && (
          <EventForm holidayId={holidayId} onSubmit={handleRefresh} />
        )}
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
              <button onClick={() => handleEdit(flight, "flight")}>Edit</button>
              <button
                onClick={() => handleDeleteFlight(flight._id).then(handleRefresh)}
              >
                Delete
              </button>
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
              <p>
                Check-In Date: {new Date(hotel.checkInDate).toLocaleDateString()}
              </p>
              <p>Check-In Time: {hotel.checkInTime}</p>
              <p>
                Check-Out Date: {new Date(hotel.checkOutDate).toLocaleDateString()}
              </p>
              <p>Check-Out Time: {hotel.checkOutTime}</p>
              <p>Cost: {hotel.cost}</p>
              <button onClick={() => handleEdit(hotel, "hotel")}>Edit</button>
              <button
                onClick={() => handleDeleteHotel(hotel._id).then(handleRefresh)}
              >
                Delete
              </button>
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
              <button onClick={() => handleEdit(event, "event")}>Edit</button>
              <button
                onClick={() => handleDeleteEvent(event._id).then(handleRefresh)}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No events available.</p>
        )}
      </div>

      {editMode.type === "flight" && (
        <FlightForm
          holidayId={holidayId}
          initialData={editMode.item}
          onSubmit={(updatedData) => handleUpdate("flight", updatedData)}
        />
      )}
      {editMode.type === "hotel" && (
        <HotelForm
          holidayId={holidayId}
          initialData={editMode.item}
          onSubmit={(updatedData) => handleUpdate("hotel", updatedData)}
        />
      )}
      {editMode.type === "event" && (
        <EventForm
          holidayId={holidayId}
          initialData={editMode.item}
          onSubmit={(updatedData) => handleUpdate("event", updatedData)}
        />
      )}
    </>
  );
}
