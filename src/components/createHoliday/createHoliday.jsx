// CreateHoliday.js
import React, { useState } from 'react';
import FlightForm from '../flightForm/flightForm';

export default function CreateHoliday() {
  const [showForm, setShowForm] = useState(false);

  const handleButtonClick = () => {
    setShowForm(true);
  };

  return (
    <div>
      <h2>Create a New Holiday</h2>
      <button onClick={handleButtonClick}>Add a flight here</button>
      {showForm && <FlightForm />}
    </div>
  );
}

