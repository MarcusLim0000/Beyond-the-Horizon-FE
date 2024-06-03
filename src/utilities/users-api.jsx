import sendRequest from "./send-request";
import axios from "axios";

const BASE_URL = 'http://localhost:3000'

export function signUp(userInput) {
    return sendRequest(`${BASE_URL}/api/users`, 'POST', userInput)
}

export function login(userInput) {
    return sendRequest(`${BASE_URL}/api/users/sign-in`, 'POST', userInput)
}

export function createHoliday(userInput) {
    return sendRequest(`${BASE_URL}/api/holiday/create`, 'POST', userInput)
}

export function deleteHoliday(id) {
    return sendRequest(`${BASE_URL}/api/holiday/delete/${id}`,'DELETE')
}

export async function imageUpload(formData){
    const response = await axios.post(
        `${BASE_URL}/api/upload/image`,
        formData
      )
      return response;
}