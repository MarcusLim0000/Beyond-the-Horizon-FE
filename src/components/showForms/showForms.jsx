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
import "./showForms.css"; // Import the CSS file here

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

  function calculateTotalCost() {
    const flightCosts = flights.reduce((total, flight) => total + (parseFloat(flight.cost) || 0), 0);
    const hotelCosts = hotels.reduce((total, hotel) => total + (parseFloat(hotel.cost) || 0), 0);
    const eventCosts = events.reduce((total, event) => total + (parseFloat(event.cost) || 0), 0);

    return flightCosts + hotelCosts + eventCosts;
  }

  const totalCost = calculateTotalCost();

  return (
    <div className="main-body">
      <nav>
        <Link to="/profile">Go back to profile page</Link>
      </nav>
      <h2>Here is your itinerary</h2>
      <div className="totalCost">
         <p>Total cost: ${totalCost.toFixed(2)}</p>
      </div>
      <div className="form-card">
        <button className="add-button" onClick={handleFlightClick}>Add a flight here</button>
        {showFlightForm && (
          <FlightForm holidayId={holidayId} onSubmit={handleRefresh} />
        )}
      </div>
      <div className="form-card">
        <button className="add-button" onClick={handleHotelClick}>Add your lodgings here</button>
        {showHotelForm && (
          <HotelForm holidayId={holidayId} onSubmit={handleRefresh} />
        )}
      </div>
      <div className="form-card">
        <button className="add-button" onClick={handleEventClick}>Add an event here</button>
        {showEventForm && (
          <EventForm holidayId={holidayId} onSubmit={handleRefresh} />
        )}
      </div>
      <div className="holiday-section">
        <h3>Existing Flights</h3>
        <div className="holidays-container">
          {flights.length > 0 ? (
            flights.map((flight) => (
              <div key={flight._id} className="flight-card">
                <h4>Flight Number: {flight.flightNumber}</h4>
                <p>Date: {new Date(flight.date).toLocaleDateString()}</p>
                <p>Time: {flight.time}</p>
                <p>Airport: {flight.airport}</p>
                <p>Gate: {flight.gate}</p>
                <p>Cost: {flight.cost}</p>
                <div className="button-container">
                  <button onClick={() => handleEdit(flight, "flight")}>Edit</button>
                  <button
                    onClick={() => handleDeleteFlight(flight._id).then(handleRefresh)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No flights available.</p>
          )}
        </div>
      </div>
      <div className="holiday-section">
        <h3>Existing Hotels</h3>
        <div className="holidays-container">
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
                <div className="button-container">
                  <button onClick={() => handleEdit(hotel, "hotel")}>Edit</button>
                  <button
                    onClick={() => handleDeleteHotel(hotel._id).then(handleRefresh)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No lodgings available.</p>
          )}
        </div>
      </div>
      <div className="holiday-section">
        <h3>Existing Events</h3>
        <div className="holidays-container">
          {events.length > 0 ? (
            events.map((event) => (
              <div key={event._id} className="event-card">
                <h4>Event Title: {event.title}</h4>
                <p>Address: {event.address}</p>
                <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                <p>Start Time: {event.startTime}</p>
                <p>End Time: {event.endTime}</p>
                <p>Cost: {event.cost}</p>
                <div className="button-container">
                  <button onClick={() => handleEdit(event, "event")}>Edit</button>
                  <button
                    onClick={() => handleDeleteEvent(event._id).then(handleRefresh)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No events available.</p>
          )}
        </div>
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
    </div>
  );
}
