import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteHoliday, getHoliday } from "../../utilities/users-api";

export default function Profile({ user }) {
  const [holidays, setHolidays] = useState([]);
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

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <p>This is the profile page!</p>
      <div className="holidays-container">
        {holidays.length > 0 ? (
          holidays.map((holiday) => (
            <div key={holiday._id} className="holiday-card">
              <h3>Holiday Details</h3>
              <p>Name: {holiday.name}</p>
              <p>Country: {holiday.country}</p>
              <p>
                Start Date: {new Date(holiday.startDate).toLocaleDateString()}
              </p>
              <p>End Date: {new Date(holiday.endDate).toLocaleDateString()}</p>
              <button
                onClick={() => {
                  handleDelete(holiday._id);
                }}
              >
                Delete
              </button>
              <Link to={`/details/${holiday._id}`}>
                <button>Details</button>
              </Link>
            </div>
          ))
        ) : (
          <p>No holidays available.</p>
        )}
      </div>
      <div>
        <Link to="/create-holiday">
          <button>Create a holiday here!</button>
        </Link>
      </div>
    </div>
  );
}
