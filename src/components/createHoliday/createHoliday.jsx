import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createHoliday } from "../../utilities/users-api";

export default function CreateHoliday() {
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    startDate: "",
    endDate: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await createHoliday(formData);
      alert("Holiday created successfully!");
      setFormData({
        name: "",
        country: "",
        startDate: "",
        endDate: "",
      });
    } catch (error) {
      console.error("Error creating holiday:", error);
      alert("Failed to create holiday.");
    }
  }

  return (
    <>
      <nav>
        <Link to="/profile">Go back to profile page</Link>
      </nav>
      <h2>Create a New Holiday</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
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
            <label htmlFor="country">Country:</label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="startDate">Start Date:</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="endDate">End Date:</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

// return (
//   <>
//     <nav>
//       <Link to="/profile">Go back to profile page</Link>
//     </nav>
//     <h2>Create a New Holiday</h2>
//     <div>
//       <button onClick={handleHotelClick}>Add your lodgings here</button>
//       {showHotelForm && <HotelForm />}
//     </div>
//     <div>
//       <button onClick={handleFlightClick}>Add a flight here</button>
//       {showFlightForm && <FlightForm />}
//     </div>
//     <div>
//       <button onClick={handleEventClick}>Add an event here</button>
//       {showEventForm && <EventForm />}
//     </div>
//   </>
// );
// }
