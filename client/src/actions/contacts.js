import axios from "axios";
import { HOST } from "../App";
import { setAlert } from "./alert";
import { ADD_CONTACT, CONTACT_ERROR, GET_CONTACTS } from "./types";

// Get contacts
export const getContacts = (email) => async (dispatch) => {
  try {
    const res = await axios.get(`${HOST}/api/contacts/${email}`);
    dispatch({
      type: GET_CONTACTS,
      payload: res.data,
    });

    return res.data;
  } catch (err) {
    dispatch({
      type: CONTACT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add business
export const addContact = (formData) => async (dispatch) => {
  try {
    const res = await axios.post(`${HOST}/api/contacts`, formData);
    dispatch({
      type: ADD_CONTACT,
      payload: res.data,
    });
    dispatch(setAlert("Contact Created", "success"));

    console.log(res);

    return res;
  } catch (err) {
    // const errors = err.response.data.errors;
    // if (errors) {
    //   errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    // }
    dispatch({
      type: CONTACT_ERROR,
      payload: { status: err.message },
    });

    return err.message;
  }
};
