import React, { useState } from 'react';
import {createHotel} from "../../utilities/users-api"

export default function HotelForm({ holidayId }) {
  const [formData, setFormData] = useState({
    holidayId: holidayId,
    name: '',
    address: '',
    rooms: '',
    checkInDate: '',
    checkInTime: '',
    checkOutDate: '',
    checkOutTime: '',
    cost: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'cost' && value < 0) {
      alert('Cost cannot be negative');
      return;
    }
    if (name === 'rooms' && value < 0) {
      alert('Rooms cannot be negative');
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
      await createHotel(formData);
      alert('Lodgings created successfully!');
      setFormData({
        holidayId: holidayId,
        name: '',
        address: '',
        rooms: '',
        checkInDate: '',
        checkInTime: '',
        checkOutDate: '',
        checkOutTime: '',
        cost: '',
      });
    } catch (error) {
      console.error('Error creating hotel:', error);
      alert('Failed to create hotel.');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Hotel Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
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
        <label htmlFor="rooms">Rooms:</label>
        <input
          type="number"
          id="rooms"
          name="rooms"
          value={formData.rooms}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="checkInDate">Check-In Date:</label>
        <input
          type="date"
          id="checkInDate"
          name="checkInDate"
          value={formData.checkInDate}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="checkInTime">Check-In Time:</label>
        <input
          type="time"
          id="checkInTime"
          name="checkInTime"
          value={formData.checkInTime}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="checkOutDate">Check-Out Date:</label>
        <input
          type="date"
          id="checkOutDate"
          name="checkOutDate"
          value={formData.checkOutDate}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="checkOutTime">Check-Out Time:</label>
        <input
          type="time"
          id="checkOutTime"
          name="checkOutTime"
          value={formData.checkOutTime}
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
