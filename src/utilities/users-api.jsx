import sendRequest from "./send-request";

const BASE_URL = 'http://localhost:3000'

export function signUp(userInput) {
    return sendRequest(`${BASE_URL}/api/users`, 'POST', userInput)
}

export function login(userInput) {
    return sendRequest(`${BASE_URL}/api/users/sign-in`, 'POST', userInput)
}

export function createFlight(userInput) {
    return sendRequest(`${BASE_URL}/api/flight/create`, 'POST', userInput)
}

export function createHoliday(userInput) {
    return sendRequest(`${BASE_URL}/api/holiday/create`, 'POST', userInput)
}

export function createHotel(userInput) {
    return sendRequest(`${BASE_URL}/api/hotel/create`, 'POST', userInput)
}

export function createEvent(userInput) {
    return sendRequest(`${BASE_URL}/api/event/create`, 'POST', userInput)
}

export function deleteHoliday(id) {
    return sendRequest(`${BASE_URL}/api/holiday/delete/${id}`,'DELETE')
}

export function deleteFlight(id) {
    return sendRequest(`${BASE_URL}/api/flight/delete/${id}`,'DELETE')
}

export async function getFlight(id) {
    return sendRequest(`${BASE_URL}/api/flight/${id}`)
}

export async function getHoliday(id) {
    return sendRequest(`${BASE_URL}/api/holiday/${id}`)
}