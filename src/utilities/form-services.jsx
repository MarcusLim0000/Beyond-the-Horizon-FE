import {
  getFlights,
  getHotels,
  getEvents,
  deleteFlight,
  deleteHotel,
  deleteEvent,
  updateFlight,
  updateHotel,
  updateEvent,
} from "../utilities/users-api";

export async function fetchFlights(holidayId) {
  try {
    const flightData = await getFlights(holidayId);
    return flightData;
  } catch (error) {
    console.error("Error fetching flights:", error);
    throw error;
  }
}

export async function fetchHotels(holidayId) {
  try {
    const hotelData = await getHotels(holidayId);
    return hotelData;
  } catch (error) {
    console.error("Error fetching hotels:", error);
    throw error;
  }
}

export async function fetchEvents(holidayId) {
  try {
    const eventData = await getEvents(holidayId);
    return eventData;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
}

export async function handleDeleteFlight(flightId) {
  try {
    await deleteFlight(flightId);
  } catch (error) {
    console.error("Error deleting flight:", error);
    throw error;
  }
}

export async function handleDeleteHotel(hotelId) {
  try {
    await deleteHotel(hotelId);
  } catch (error) {
    console.error("Error deleting hotel:", error);
    throw error;
  }
}

export async function handleDeleteEvent(eventId) {
  try {
    await deleteEvent(eventId);
  } catch (error) {
    console.error("Error deleting event:", error);
    throw error;
  }
}

export async function handleUpdateFlight(flightId, updatedData) {
  try {
    await updateFlight(flightId, updatedData);
  } catch (error) {
    console.error("Error updating flight:", error);
    throw error;
  }
}

export async function handleUpdateHotel(hotelId, updatedData) {
  try {
    await updateHotel(hotelId, updatedData);
  } catch (error) {
    console.error("Error updating hotel:", error);
    throw error;
  }
}

export async function handleUpdateEvent(eventId, updatedData) {
  try {
    await updateEvent(eventId, updatedData);
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
}
