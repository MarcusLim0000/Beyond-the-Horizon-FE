import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createHoliday } from "../../utilities/users-api";

export default function CreateHoliday() {
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    startDate: "",
    endDate: "",
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "startDate" || name === "endDate") {
      const newErrors = { ...errors };
      if (
        formData.startDate &&
        formData.endDate &&
        formData.startDate > formData.endDate
      ) {
        newErrors.date = "End date cannot be earlier than start date.";
      } else {
        delete newErrors.date;
      }
      setErrors(newErrors);
    }
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    if (formData.startDate > formData.endDate) {
      setErrors({
        ...errors,
        date: "End date cannot be earlier than start date.",
      });
      return;
    }
    try {
      await createHoliday(formData);
      alert("Holiday created successfully!");
      setFormData({
        name: "",
        country: "",
        startDate: "",
        endDate: "",
      });
      setErrors({});
      navigate("/profile")
    } catch (error) {
      console.error("Error creating holiday:", error);
      alert("Failed to create holiday.");
    }
  }

  return (
    <>
      <div className="flex justify-center">
        <Link to="/profile">
          <button className="py-2 px-4 bg-black text-white font-bold rounded-full hover:bg-red-600 mt-5 mb-10">Go back to your profile</button>
        </Link>
      </div>
      <div className="bg-gray-100 my-10 p-10 rounded-lg shadow-lg max-w-md mx-auto flex flex-col items-center">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="font-bold">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="country" className="font-bold">Country:</label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="startDate" className="font-bold">Start Date:</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="endDate" className="font-bold">End Date:</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>
          {errors.date && <p className="text-red-500">{errors.date}</p>}
          <button type="submit" className="py-2 bg-blue-600 text-white font-bold rounded-full hover:bg-red-600">Submit</button>
        </form>
      </div>
    </>
  );
}