import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  deleteHoliday,
  getHoliday,
  updateHoliday,
} from "../../utilities/users-api";

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
    <div className="bg-gray-100 p-5 max-w-4xl mx-auto mt-5 rounded-lg shadow-lg">
      <h1 className="inline-block p-2 text-3xl text-blue-500 border border-black rounded-md">Welcome, {user.name}</h1>
      <p className="py-8 text-lg font-bold">Below are your holidays planned!</p>
      {editingHoliday ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="font-bold">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={editingHoliday.name}
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
              value={editingHoliday.country}
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
              value={formatDate(editingHoliday.startDate)}
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
              value={formatDate(editingHoliday.endDate)}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>
          {errors.date && <p className="text-red-500">{errors.date}</p>}
          <button type="submit" className="py-2 bg-blue-600 text-white rounded-md">Submit</button>
          <button type="button" onClick={() => setEditingHoliday(null)} className="py-2 bg-red-500 text-white rounded-md">Cancel</button>
        </form>
      ) : (
        <div className="flex flex-wrap gap-5 justify-center">
          {holidays.length > 0 ? (
            holidays.map((holiday) => (
              <div key={holiday._id} className="bg-gray-200 p-5 rounded-md shadow-md max-w-sm w-full flex flex-col items-center">
                <h3 className="text-xl font-bold">{holiday.name}</h3>
                <p>Country: {holiday.country}</p>
                <p>Start Date: {new Date(holiday.startDate).toLocaleDateString()}</p>
                <p>End Date: {new Date(holiday.endDate).toLocaleDateString()}</p>
                <button
                  onClick={() => {
                    handleDelete(holiday._id);
                  }}
                  className="py-2 px-4 bg-red-600 text-white rounded-md mt-2"
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
                  className="py-2 px-4 bg-blue-600 text-white rounded-md mt-2"
                >
                  Edit
                </button>
                <Link to={`/details/${holiday._id}`} className="mt-2">
                  <button className="py-2 px-4 bg-green-600 text-white rounded-md">Details</button>
                </Link>
                <Link to={`/image-upload/${holiday._id}`} className="mt-2">
                  <button className="py-2 px-4 bg-yellow-600 text-white rounded-md">Hall of memories</button>
                </Link>
              </div>
            ))
          ) : (
            <p>No holidays available.</p>
          )}
        </div>
      )}
      <div className="mt-5">
        <Link to="/create-holiday">
          <button className="py-4 px-6 bg-red-600 text-white text-lg font-bold rounded-md">Create a holiday here!</button>
        </Link>
      </div>
    </div>
  );
}