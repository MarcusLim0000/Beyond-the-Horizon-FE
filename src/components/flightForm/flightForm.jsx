import React, { useState } from 'react';

export default function FlightForm() {
  const [formData, setFormData] = useState({
    flightNumber: '',
    date: '',
    time: '',
    airport: '',
    gate: '',
    cost: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to the server
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="flightNumber">Flight Number:</label>
        <input
          type="text"
          id="flightNumber"
          name="flightNumber"
          value={formData.flightNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="time">Time:</label>
        <input
          type="time"
          id="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="airport">Airport:</label>
        <input
          type="text"
          id="airport"
          name="airport"
          value={formData.airport}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="gate">Gate:</label>
        <input
          type="text"
          id="gate"
          name="gate"
          value={formData.gate}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="cost">Cost:</label>
        <input
          type="number"
          id="cost"
          name="cost"
          value={formData.cost}
          step="0.01"
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
