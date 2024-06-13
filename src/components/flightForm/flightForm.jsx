import React, { useState, useEffect } from 'react';
import { createFlight, updateFlight } from '../../utilities/users-api';

export default function FlightForm({ holidayId, initialData = {}, onSubmit }) {
  const [formData, setFormData] = useState({
    holidayId: holidayId,
    flightNumber: '',
    date: '',
    time: '',
    airport: '',
    gate: '',
    cost: '',
    ...initialData, // Pre-fill form with initial data if available
  });

  useEffect(() => {
    if (initialData.date) {
      const date = new Date(initialData.date).toISOString().split('T')[0];
      setFormData(prevState => ({
        ...prevState,
        date,
      }));
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      if (initialData._id) {
        await updateFlight(initialData._id, formData);
      } else {
        await createFlight(formData);
      }
      onSubmit(formData);
      setFormData({
        holidayId: holidayId,
        flightNumber: '',
        date: '',
        time: '',
        airport: '',
        gate: '',
        cost: '',
      });
    } catch (error) {
      console.error('Error creating flight:', error);
    }
  }

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
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
