import React, { useState, useEffect } from "react";
import { createHotel, updateHotel } from "../../utilities/users-api";

export default function HotelForm({ holidayId, initialData = {}, onSubmit }) {
  const [formData, setFormData] = useState({
    holidayId: holidayId,
    name: "",
    address: "",
    rooms: "",
    checkInDate: "",
    checkInTime: "",
    checkOutDate: "",
    checkOutTime: "",
    cost: "",
    ...initialData,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData.checkInDate) {
      const checkInDate = new Date(initialData.checkInDate)
        .toISOString()
        .split("T")[0];
      setFormData((prevState) => ({
        ...prevState,
        checkInDate,
      }));
    }
    if (initialData.checkOutDate) {
      const checkOutDate = new Date(initialData.checkOutDate)
        .toISOString()
        .split("T")[0];
      setFormData((prevState) => ({
        ...prevState,
        checkOutDate,
      }));
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };

    if (
      name === "checkInDate" ||
      name === "checkOutDate" ||
      name === "checkInTime" ||
      name === "checkOutTime"
    ) {
      const newErrors = { ...errors };
      const checkInDate = new Date(
        updatedFormData.checkInDate +
          "T" +
          (updatedFormData.checkInTime || "00:00")
      );
      const checkOutDate = new Date(
        updatedFormData.checkOutDate +
          "T" +
          (updatedFormData.checkOutTime || "00:00")
      );

      if (checkInDate > checkOutDate) {
        newErrors.date =
          "Check-out date and time cannot be earlier than check-in date and time.";
      } else {
        delete newErrors.date;
      }
      setErrors(newErrors);
    }

    if (name === "cost" && value < 0) {
      alert("Cost cannot be negative");
      return;
    }
    if (name === "rooms" && value < 1) {
      alert("Rooms cannot be less than 1");
      return;
    }
    setFormData(updatedFormData);
  };

  async function handleSubmit(evt) {
    evt.preventDefault();
    const checkInDate = new Date(
      formData.checkInDate + "T" + formData.checkInTime
    );
    const checkOutDate = new Date(
      formData.checkOutDate + "T" + formData.checkOutTime
    );
    if (checkInDate > checkOutDate) {
      setErrors({
        date: "Check-out date and time cannot be earlier than check-in date and time.",
      });
      return;
    }
    try {
      if (initialData._id) {
        await updateHotel(initialData._id, formData);
      } else {
        await createHotel(formData);
      }
      onSubmit(formData);
      setFormData({
        holidayId: holidayId,
        name: "",
        address: "",
        rooms: "",
        checkInDate: "",
        checkInTime: "",
        checkOutDate: "",
        checkOutTime: "",
        cost: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Error creating hotel:", error);
      alert("Failed to create hotel.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-bold mb-2">Hotel Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="address" className="block text-sm font-bold mb-2">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="rooms" className="block text-sm font-bold mb-2">Rooms:</label>
        <input
          type="number"
          id="rooms"
          name="rooms"
          value={formData.rooms}
          onChange={handleChange}
          min="1"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="checkInDate" className="block text-sm font-bold mb-2">Check-In Date:</label>
        <input
          type="date"
          id="checkInDate"
          name="checkInDate"
          value={formData.checkInDate}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="checkInTime" className="block text-sm font-bold mb-2">Check-In Time:</label>
        <input
          type="time"
          id="checkInTime"
          name="checkInTime"
          value={formData.checkInTime}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="checkOutDate" className="block text-sm font-bold mb-2">Check-Out Date:</label>
        <input
          type="date"
          id="checkOutDate"
          name="checkOutDate"
          value={formData.checkOutDate}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="checkOutTime" className="block text-sm font-bold mb-2">Check-Out Time:</label>
        <input
          type="time"
          id="checkOutTime"
          name="checkOutTime"
          value={formData.checkOutTime}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      {errors?.date && <p className="text-red-500">{errors.date}</p>}
      <div className="mb-4">
        <label htmlFor="cost" className="block text-sm font-bold mb-2">Cost:</label>
        <input
          type="number"
          id="cost"
          name="cost"
          value={formData.cost}
          step="0.01"
          onChange={handleChange}
          min="0"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700">
        Submit
      </button>
    </form>
  );
}