import sendRequest from "./send-request";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export function signUp(userInput) {
  return sendRequest(`${BASE_URL}/api/users`, "POST", userInput);
}

export function login(userInput) {
  return sendRequest(`${BASE_URL}/api/users/sign-in`, "POST", userInput);
}

export function createFlight(userInput) {
  return sendRequest(`${BASE_URL}/api/flight/create`, "POST", userInput);
}

export function createHoliday(userInput) {
  return sendRequest(`${BASE_URL}/api/holiday/create`, "POST", userInput);
}

export function createHotel(userInput) {
  return sendRequest(`${BASE_URL}/api/hotel/create`, "POST", userInput);
}

export function createEvent(userInput) {
  return sendRequest(`${BASE_URL}/api/event/create`, "POST", userInput);
}

export function deleteHoliday(id) {
  return sendRequest(`${BASE_URL}/api/holiday/delete/${id}`, "DELETE");
}

export function deleteFlight(id) {
  return sendRequest(`${BASE_URL}/api/flight/delete/${id}`, "DELETE");
}

export function deleteHotel(id) {
  return sendRequest(`${BASE_URL}/api/hotel/delete/${id}`, "DELETE");
}

export function deleteEvent(id) {
  return sendRequest(`${BASE_URL}/api/event/delete/${id}`, "DELETE");
}

export async function getFlights(holidayId) {
  return sendRequest(`${BASE_URL}/api/flight/${holidayId}`);
}

export async function getHotels(holidayId) {
  return sendRequest(`${BASE_URL}/api/hotel/${holidayId}`);
}

export async function getEvents(holidayId) {
  return sendRequest(`${BASE_URL}/api/event/${holidayId}`);
}

export async function getHoliday(id) {
  return sendRequest(`${BASE_URL}/api/holiday/${id}`);
}

export function updateFlight(id, userInput) {
  return sendRequest(`${BASE_URL}/api/flight/update/${id}`, "PUT", userInput);
}

export function updateHotel(id, userInput) {
  return sendRequest(`${BASE_URL}/api/hotel/update/${id}`, "PUT", userInput);
}

export function updateEvent(id, userInput) {
  return sendRequest(`${BASE_URL}/api/event/update/${id}`, "PUT", userInput);
}

export function updateHoliday(id, userInput) {
  return sendRequest(`${BASE_URL}/api/holiday/update/${id}`, "PUT", userInput);
}
