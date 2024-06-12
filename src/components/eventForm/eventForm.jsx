import React, { useState } from 'react';
import { createEvent } from "../../utilities/users-api";

export default function EventForm({ holidayId }) {
  const [formData, setFormData] = useState({
    holidayId: holidayId,
    title: '',
    address: '',
    date: '',
    startTime: '',
    endTime: '',
    cost: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'cost' && value < 0) {
      alert('Cost cannot be negative');
      return;
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await createEvent(formData);
      alert('Event created successfully!');
      setFormData({
        holidayId: holidayId,
        title: '',
        address: '',
        date: '',
        startTime: '',
        endTime: '',
        cost: '',
      });
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Failed to create event.');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Event Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
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
        <label htmlFor="startTime">Start Time:</label>
        <input
          type="time"
          id="startTime"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="endTime">End Time:</label>
        <input
          type="time"
          id="endTime"
          name="endTime"
          value={formData.endTime}
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
