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
} from "../../utilities/form-services";

export default function ShowForms() {
  const { holidayId } = useParams();
  const [showHotelForm, setShowHotelForm] = useState(false);
  const [showFlightForm, setShowFlightForm] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);
  const [flights, setFlights] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [events, setEvents] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [editMode, setEditMode] = useState({ type: null, item: null });

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
  }, [holidayId, refresh]);

  function handleRefresh() {
    setRefresh((prev) => !prev);
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
    const flightCosts = flights.reduce(
      (total, flight) => total + (parseFloat(flight.cost) || 0),
      0
    );
    const hotelCosts = hotels.reduce(
      (total, hotel) => total + (parseFloat(hotel.cost) || 0),
      0
    );
    const eventCosts = events.reduce(
      (total, event) => total + (parseFloat(event.cost) || 0),
      0
    );

    return flightCosts + hotelCosts + eventCosts;
  }

  const totalCost = calculateTotalCost();

  return (
    <>
      <div className="flex justify-center">
        <Link to="/profile">
          <button className="py-2 px-4 bg-black text-white font-bold rounded-full hover:bg-red-600 mt-5 mb-10">
            Go back to your profile
          </button>
        </Link>
      </div>
      <div className="bg-white p-5 max-w-5xl mx-auto my-5 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-5">Here is your itinerary</h2>
        <div className="p-5 bg-gray-100 rounded-lg mb-5">
          <p className="text-xl font-bold">
            Total cost: ${totalCost.toFixed(2)}
          </p>
        </div>
        <div className="bg-white p-5 my-5 rounded-lg shadow-md">
          <button
            className="add-button bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-red-600"
            onClick={handleFlightClick}
          >
            Add a flight here
          </button>
          {showFlightForm && (
            <FlightForm holidayId={holidayId} onSubmit={handleRefresh} />
          )}
        </div>
        <div className="bg-white p-5 my-5 rounded-lg shadow-md">
          <button
            className="add-button bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-red-600"
            onClick={handleHotelClick}
          >
            Add your lodgings here
          </button>
          {showHotelForm && (
            <HotelForm holidayId={holidayId} onSubmit={handleRefresh} />
          )}
        </div>
        <div className="bg-white p-5 my-5 rounded-lg shadow-md">
          <button
            className="add-button bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-red-600"
            onClick={handleEventClick}
          >
            Add an event here
          </button>
          {showEventForm && (
            <EventForm holidayId={holidayId} onSubmit={handleRefresh} />
          )}
        </div>
        <div className="holiday-section flex flex-col gap-5 justify-center mb-5 w-full">
          <h3 className="text-lg font-bold mb-5">Existing Flights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {flights.length > 0 ? (
              flights.map((flight) => (
                <div
                  key={flight._id}
                  className="flight-card bg-teal-500 p-5 rounded-lg shadow-md"
                >
                  <h4 className="text-lg font-bold">
                    Flight Number: {flight.flightNumber}
                  </h4>
                  <p>Date: {new Date(flight.date).toLocaleDateString()}</p>
                  <p>Time: {flight.time}</p>
                  <p>Airport: {flight.airport}</p>
                  <p>Gate: {flight.gate}</p>
                  <p>Cost: {flight.cost}</p>
                  <div className="flex gap-2 mt-2">
                    <button
                      className="bg-yellow-500 text-white py-1 px-2 rounded-lg"
                      onClick={() => handleEdit(flight, "flight")}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white py-1 px-2 rounded-lg"
                      onClick={() =>
                        handleDeleteFlight(flight._id).then(handleRefresh)
                      }
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
        <div className="holiday-section flex flex-col gap-5 justify-center mb-5 w-full">
          <h3 className="text-lg font-bold mb-5">Existing Hotels</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {hotels.length > 0 ? (
              hotels.map((hotel) => (
                <div
                  key={hotel._id}
                  className="hotel-card bg-teal-500 p-5 rounded-lg shadow-md"
                >
                  <h4 className="text-lg font-bold">Hotel Name: {hotel.name}</h4>
                  <p>Address: {hotel.address}</p>
                  <p>Rooms: {hotel.rooms}</p>
                  <p>
                    Check-In Date:{" "}
                    {new Date(hotel.checkInDate).toLocaleDateString()}
                  </p>
                  <p>Check-In Time: {hotel.checkInTime}</p>
                  <p>
                    Check-Out Date:{" "}
                    {new Date(hotel.checkOutDate).toLocaleDateString()}
                  </p>
                  <p>Check-Out Time: {hotel.checkOutTime}</p>
                  <p>Cost: {hotel.cost}</p>
                  <div className="flex gap-2 mt-2">
                    <button
                      className="bg-yellow-500 text-white py-1 px-2 rounded-lg"
                      onClick={() => handleEdit(hotel, "hotel")}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white py-1 px-2 rounded-lg"
                      onClick={() =>
                        handleDeleteHotel(hotel._id).then(handleRefresh)
                      }
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
        <div className="holiday-section flex flex-col gap-5 justify-center mb-5 w-full">
          <h3 className="text-lg font-bold mb-5">Existing Events</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {events.length > 0 ? (
              events.map((event) => (
                <div
                  key={event._id}
                  className="event-card bg-teal-500 p-5 rounded-lg shadow-md"
                >
                  <h4 className="text-lg font-bold">Event Title: {event.title}</h4>
                  <p>Address: {event.address}</p>
                  <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                  <p>Start Time: {event.startTime}</p>
                  <p>End Time: {event.endTime}</p>
                  <p>Cost: {event.cost}</p>
                  <div className="flex gap-2 mt-2">
                    <button
                      className="bg-yellow-500 text-white py-1 px-2 rounded-lg"
                      onClick={() => handleEdit(event, "event")}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white py-1 px-2 rounded-lg"
                      onClick={() =>
                        handleDeleteEvent(event._id).then(handleRefresh)
                      }
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
    </>
  );
}  
