import React, { useState } from 'react';
import { Link } from "react-router-dom";
import FlightForm from '../flightForm/flightForm';
import HotelForm from '../hotelForm/hotelForm';
import EventForm from '../eventForm/eventForm';

export default function CreateHoliday() {
  const [showFlightForm, setShowFlightForm] = useState(false);
  const [showHotelForm, setShowHotelForm] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);

  const handleFlightClick = () => {
    setShowFlightForm(true);
  };

  const handleHotelClick = () => {
    setShowHotelForm(true);
  };

  const handleEventClick = () => {
    setShowEventForm(true);
  };

  return (
    <>
      <nav>
        <Link to="/profile">Go back to profile page</Link>
      </nav>
      <h2>Create a New Holiday</h2>
      <div>
      <button onClick={handleHotelClick}>Add your lodgings here</button>
      {showHotelForm && <HotelForm />}
      </div>
      <div>
      <button onClick={handleFlightClick}>Add a flight here</button>
      {showFlightForm && <FlightForm />}
      </div>
      <div>
      <button onClick={handleEventClick}>Add an event here</button>
      {showEventForm && <EventForm />}
      </div>
    </>
  );
}

