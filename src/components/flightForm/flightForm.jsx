import React, { useState, useEffect } from "react";
import { createFlight, updateFlight } from "../../utilities/users-api";

export default function FlightForm({ holidayId, initialData = {}, onSubmit }) {
  const [formData, setFormData] = useState({
    holidayId: holidayId,
    flightNumber: "",
    date: "",
    time: "",
    airport: "",
    gate: "",
    cost: "",
    ...initialData,
  });

  useEffect(() => {
    if (initialData.date) {
      const date = new Date(initialData.date).toISOString().split("T")[0];
      setFormData((prevState) => ({
        ...prevState,
        date,
      }));
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "cost" && value < 0) {
      alert("Cost cannot be negative");
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
      if (initialData._id) {
        await updateFlight(initialData._id, formData);
      } else {
        await createFlight(formData);
      }
      onSubmit(formData);
      setFormData({
        holidayId: holidayId,
        flightNumber: "",
        date: "",
        time: "",
        airport: "",
        gate: "",
        cost: "",
      });
    } catch (error) {
      console.error("Error creating flight:", error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-4">
        <label htmlFor="flightNumber" className="block text-sm font-bold mb-2">Flight Number:</label>
        <input
          type="text"
          id="flightNumber"
          name="flightNumber"
          value={formData.flightNumber}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="date" className="block text-sm font-bold mb-2">Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="time" className="block text-sm font-bold mb-2">Time:</label>
        <input
          type="time"
          id="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="airport" className="block text-sm font-bold mb-2">Airport:</label>
        <input
          type="text"
          id="airport"
          name="airport"
          value={formData.airport}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="gate" className="block text-sm font-bold mb-2">Gate:</label>
        <input
          type="text"
          id="gate"
          name="gate"
          value={formData.gate}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="cost" className="block text-sm font-bold mb-2">Cost:</label>
        <input
          type="number"
          id="cost"
          name="cost"
          value={formData.cost}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          min="0"
          step="0.01"
          required
        />
      </div>
      <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700">
        Submit
      </button>
    </form>
  );
}