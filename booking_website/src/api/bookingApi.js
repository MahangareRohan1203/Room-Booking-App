import {
  CHECK_AVAILABILITY,
  GET_LOCATION_BEDS,
  BOOK_BED,
  GET_BOOKING_DETAILS_BY_BED,
} from "./config";
import axios from "axios";

export const checkAvailability = async (fromDate, toDate, token) => {
  const response = await axios.get(`${CHECK_AVAILABILITY}`, {
    params: {
      from: fromDate + "T00:00:00",
      to: toDate + "T00:00:00",
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};


export const getLocationBedDetails = async (token) => {
  const response = await axios.get(`${GET_LOCATION_BEDS}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const bookBed = async (bookingPayload, token) => {
  const res = await axios.post(`${BOOK_BED}`, bookingPayload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getBookingsForBed = async (bedIds, token) => {
  const res = await axios.get(`${GET_BOOKING_DETAILS_BY_BED}`, {
    params: {
      bedId: bedIds,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};


export const updateBooking = async (bookingPayload, token) => {
  bookingPayload.fromDate = bookingPayload.fromDate+"T00:00:00"
  bookingPayload.toDate = bookingPayload.toDate+"T00:00:00"

  const res = await axios.put(`${BOOK_BED}`, bookingPayload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const deleteBooking = async (bedIds, token) => {
  const res = await axios.delete(`${BOOK_BED}`, {
    params: {
      bookingId: bedIds,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};