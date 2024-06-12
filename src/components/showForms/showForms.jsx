import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import HotelForm from "../hotelForm/hotelForm";
import FlightForm from "../flightForm/flightForm"; 
import EventForm from "../eventForm/eventForm"; 

function ShowForms() {
  const { holidayId } = useParams(); // Retrieve the holidayId from URL params
  const [showHotelForm, setShowHotelForm] = useState(false);
  const [showFlightForm, setShowFlightForm] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);

  const handleHotelClick = () => setShowHotelForm(!showHotelForm);
  const handleFlightClick = () => setShowFlightForm(!showFlightForm);
  const handleEventClick = () => setShowEventForm(!showEventForm);

  return (
    <>
      <nav>
        <Link to="/profile">Go back to profile page</Link>
      </nav>
      <h2>Create a New Holiday</h2>
      <div>
        <button onClick={handleHotelClick}>Add your lodgings here</button>
        {showHotelForm && <HotelForm holidayId={holidayId} />}
      </div>
      <div>
        <button onClick={handleFlightClick}>Add a flight here</button>
        {showFlightForm && <FlightForm holidayId={holidayId} />}
      </div>
      <div>
        <button onClick={handleEventClick}>Add an event here</button>
        {showEventForm && <EventForm holidayId={holidayId} />}
      </div>
    </>
  );
}

export default ShowForms;
