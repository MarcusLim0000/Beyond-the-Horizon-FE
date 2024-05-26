import sendRequest from "./send-request";
import axios from "axios";

//const BASE_URL = 'https//localhost:3000'

export function signUp(userInput) {
    return sendRequest(`${BASE_URL}/api/users`, 'POST', userInput)
}

export function login(userInput) {
    return sendRequest(`${BASE_URL}/api/users/sign-in`, 'POST', userInput)
}

export function createListing(userInput) {
    return sendRequest(`${BASE_URL}/api/listing/create`, 'POST', userInput)
}

export function deleteListing(id) {
    return sendRequest(`${BASE_URL}/api/listing/delete/${id}`,'DELETE')
}

export function rentListing(id, userInput) {
    return sendRequest(`${BASE_URL}/api/listing/rent/${id}`,'PUT', userInput)
}

export async function imageUpload(formData){
    const response = await axios.post(
        `${BASE_URL}/api/upload/image`,
        formData
      )
      return response;
}

export async function getListingById(id){
    return sendRequest(`${BASE_URL}/api/listing/posted/${id}`)
}

export async function updateListing(id,userInput) {
    return sendRequest(`${BASE_URL}/api/listing/update/${id}`,'PUT',userInput)
}

export async function getUserListing(id){
    return sendRequest(`${BASE_URL}/api/listing/${id}`)
}

export async function getAvailableListing() {
    return sendRequest(`${BASE_URL}/api/listing/available`)
}