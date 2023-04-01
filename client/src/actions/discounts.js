import axios from "axios";
import { HOST } from "../App";
import { setAlert } from "./alert";
import {
  ADD_DISCOUNT,
  DISCOUNT_ERROR,
  DELETE_BUSINESS,
  GET_DISCOUNT,
  GET_DISCOUNTS,
  UPDATE_DISCOUNT,
} from "./types";

// Get discounts
export const getDiscounts = () => async (dispatch) => {
  try {
    const res = await axios.get(`${HOST}/api/discounts`);
    dispatch({
      type: GET_DISCOUNTS,
      payload: res.data,
    });

    return res.data;
  } catch (err) {
    dispatch({
      type: DISCOUNT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get discount
export const getDiscount = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${HOST}/api/discounts/${id}`);
    dispatch({
      type: GET_DISCOUNT,
      payload: res.data,
    });

    console.log(res);

    return res.data;
  } catch (err) {
    dispatch({
      type: DISCOUNT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add discount
export const addDiscount = (formData) => async (dispatch) => {
  try {
    const res = await axios.post(`${HOST}/api/discounts`, formData);
    dispatch({
      type: ADD_DISCOUNT,
      payload: res.data,
    });
    dispatch(setAlert("Discount Created", "success"));
    return res;
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: DISCOUNT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete discount
export const deleteDiscount = (id) => async (dispatch) => {
  try {
    await axios.delete(`${HOST}/api/discounts/${id}`);
    dispatch({
      type: DELETE_BUSINESS,
      payload: id,
    });
    dispatch(setAlert("Discount Removed", "success"));
  } catch (err) {
    dispatch({
      type: DISCOUNT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Edit discount
export const editDiscount = (formData, id) => async (dispatch) => {
  try {
    const res = await axios.put(`${HOST}/api/discounts/${id}`, formData);
    dispatch({
      type: UPDATE_DISCOUNT,
      payload: res.data,
    });
    dispatch(setAlert("Discount Updated", "success"));

    return res;
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: DISCOUNT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
