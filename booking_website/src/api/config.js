// src/api/config.js
const BASE_URL = 'https://booking-system-latest.onrender.com'; // Change this URL as needed

const LOGIN_URL = BASE_URL + "/api/auth/login"

export const CHECK_AVAILABILITY = BASE_URL + "/api/bookings/checkAvailability";

export const GET_LOCATION_BEDS = BASE_URL + "/api/bookings/locations";

export const BOOK_BED = BASE_URL +"/api/bookings";

export const GET_BOOKING_DETAILS_BY_BED  = BASE_URL +"/api/bookings";

export default LOGIN_URL;

