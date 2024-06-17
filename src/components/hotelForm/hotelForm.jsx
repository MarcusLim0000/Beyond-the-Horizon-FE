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
          min="1"
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
      {errors.date && <p className="error">{errors.date}</p>}
      <div>
        <label htmlFor="cost">Cost:</label>
        <input
          type="number"
          id="cost"
          name="cost"
          value={formData.cost}
          step="0.01"
          onChange={handleChange}
          min="0"
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
