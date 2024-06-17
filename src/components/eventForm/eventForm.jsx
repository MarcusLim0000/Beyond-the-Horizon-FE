import React, { useState, useEffect } from "react";
import { createEvent, updateEvent } from "../../utilities/users-api";

export default function EventForm({ holidayId, initialData = {}, onSubmit }) {
  const [formData, setFormData] = useState({
    holidayId: holidayId,
    title: "",
    address: "",
    date: "",
    startTime: "",
    endTime: "",
    cost: "",
    ...initialData,
  });
  const [errors, setErrors] = useState({});

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
    const updatedFormData = { ...formData, [name]: value };

    if (name === "startTime" || name === "endTime") {
      const newErrors = { ...errors };
      const startTime = new Date(
        formData.date +
          "T" +
          (name === "startTime" ? value : formData.startTime)
      );
      const endTime = new Date(
        formData.date + "T" + (name === "endTime" ? value : formData.endTime)
      );

      if (startTime > endTime) {
        newErrors.time = "End time cannot be earlier than start time.";
      } else {
        delete newErrors.time;
      }
      setErrors(newErrors);
    }

    if (name === "cost" && value < 0) {
      alert("Cost cannot be negative");
      return;
    }

    setFormData(updatedFormData);
  };

  async function handleSubmit(evt) {
    evt.preventDefault();
    const startTime = new Date(formData.date + "T" + formData.startTime);
    const endTime = new Date(formData.date + "T" + formData.endTime);
    if (startTime > endTime) {
      setErrors({ time: "End time cannot be earlier than start time." });
      return;
    }
    try {
      if (initialData._id) {
        await updateEvent(initialData._id, formData);
      } else {
        await createEvent(formData);
      }
      onSubmit(formData);
      setFormData({
        holidayId: holidayId,
        title: "",
        address: "",
        date: "",
        startTime: "",
        endTime: "",
        cost: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Failed to create event.");
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
      {errors.time && <p className="error">{errors.time}</p>}
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
