import axios from "axios";
import { HOST } from "../App";
import { setAlert } from "./alert";
import {
  ADD_BUSINESS,
  BUSINESS_ERROR,
  DELETE_BUSINESS,
  GET_BUSINESS,
  GET_BUSINESSES,
  UPDATE_BUSINESS,
} from "./types";

// Get businesses
export const getBusinesses = () => async (dispatch) => {
  try {
    const res = await axios.get(`${HOST}/api/businesses`);
    dispatch({
      type: GET_BUSINESSES,
      payload: res.data,
    });

    return res.data;
  } catch (err) {
    dispatch({
      type: BUSINESS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get business
export const getBusiness = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${HOST}/api/businesses/${id}`);
    dispatch({
      type: GET_BUSINESS,
      payload: res.data,
    });
    return res.data;
  } catch (err) {
    dispatch({
      type: BUSINESS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add business
export const addBusiness = (formData) => async (dispatch) => {
  try {
    const res = await axios.post(`${HOST}/api/businesses`, formData);
    dispatch({
      type: ADD_BUSINESS,
      payload: res.data,
    });
    dispatch(setAlert("Business Created", "success"));
    return res;
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: BUSINESS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete business
export const deleteBusiness = (id) => async (dispatch) => {
  try {
    await axios.delete(`${HOST}/api/businesses/${id}`);
    dispatch({
      type: DELETE_BUSINESS,
      payload: id,
    });
    dispatch(setAlert("Business Removed", "success"));
  } catch (err) {
    dispatch({
      type: BUSINESS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Edit business
export const editBusiness = (formData, id) => async (dispatch) => {
  try {
    const res = await axios.put(`${HOST}/api/businesses/${id}`, formData);
    dispatch({
      type: UPDATE_BUSINESS,
      payload: res.data,
    });
    dispatch(setAlert("Business Updated", "success"));
    return res;
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: BUSINESS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
