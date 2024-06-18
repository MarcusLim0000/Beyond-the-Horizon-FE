import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  deleteHoliday,
  getHoliday,
  updateHoliday,
} from "../../utilities/users-api";
import "./Profile.css";

export default function Profile({ user }) {
  const [holidays, setHolidays] = useState([]);
  const [editingHoliday, setEditingHoliday] = useState(null);
  const [errors, setErrors] = useState({});
  const token = localStorage.getItem("token");

  async function fetchHolidays() {
    try {
      if (!token) {
        alert("Unauthorized user! Someone call 911!");
        return;
      }
      const userId = user._id;
      const data = await getHoliday(userId);
      setHolidays(data);
    } catch (error) {
      console.error("Error fetching listings:", error);
    }
  }

  useEffect(() => {
    fetchHolidays();
  }, []);

  async function handleDelete(id) {
    try {
      await deleteHoliday(id);
      fetchHolidays();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    if (editingHoliday.startDate > editingHoliday.endDate) {
      setErrors({ date: "End date cannot be earlier than start date." });
      return;
    }
    try {
      await updateHoliday(editingHoliday._id, editingHoliday);
      setEditingHoliday(null);
      fetchHolidays();
      setErrors({});
    } catch (error) {
      console.error("Error updating holiday:", error);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedHoliday = { ...editingHoliday, [name]: value };

    setEditingHoliday(updatedHoliday);

    if (name === "startDate" || name === "endDate") {
      const newErrors = { ...errors };
      if (
        updatedHoliday.startDate &&
        updatedHoliday.endDate &&
        updatedHoliday.startDate > updatedHoliday.endDate
      ) {
        newErrors.date = "End date cannot be earlier than start date.";
      } else {
        delete newErrors.date;
      }
      setErrors(newErrors);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toISOString().split("T")[0];
  };

  return (
    <div className="profile-page">
      <h1>Welcome, {user.name}</h1>
      <p className="welcome">Below are your holidays planned!</p>
      {editingHoliday ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={editingHoliday.name}
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
              value={editingHoliday.country}
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
              value={formatDate(editingHoliday.startDate)}
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
              value={formatDate(editingHoliday.endDate)}
              onChange={handleChange}
              required
            />
          </div>
          {errors.date && <p className="error">{errors.date}</p>}
          <button type="submit">Submit</button>
          <button type="button" onClick={() => setEditingHoliday(null)}>
            Cancel
          </button>
        </form>
      ) : (
        <div className="holidays-container">
          {holidays.length > 0 ? (
            holidays.map((holiday) => (
              <div key={holiday._id} className="holiday-card">
                <h3>{holiday.name}</h3>
                <p>Country: {holiday.country}</p>
                <p>
                  Start Date: {new Date(holiday.startDate).toLocaleDateString()}
                </p>
                <p>
                  End Date: {new Date(holiday.endDate).toLocaleDateString()}
                </p>
                <button
                  onClick={() => {
                    handleDelete(holiday._id);
                  }}
                >
                  Delete
                </button>
                <button
                  onClick={() =>
                    setEditingHoliday({
                      ...holiday,
                      startDate: formatDate(holiday.startDate),
                      endDate: formatDate(holiday.endDate),
                    })
                  }
                >
                  Edit
                </button>
                <Link to={`/details/${holiday._id}`}>
                  <button>Details</button>
                </Link>
                <Link to={`/image-upload/${holiday._id}`}>
                  <button>Hall of memories</button>
                </Link>
              </div>
            ))
          ) : (
            <p>No holidays available.</p>
          )}
        </div>
      )}
      <div>
        <Link to="/create-holiday">
          <button className="createHoli">Create a holiday here!</button>
        </Link>
      </div>
    </div>
  );
}
