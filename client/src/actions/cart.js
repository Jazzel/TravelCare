import axios from "axios";
import { HOST } from "../App";
import { setAlert } from "./alert";

import {
  ADD_TO_CART,
  CLEAR_CART,
  REMOVE_FROM_CART,
  CART_ERROR,
  ADD_ONE_TO_CART,
  REMOVE_ONE_FROM_CART,
} from "../actions/types";

export const addToCart = (data) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_TO_CART,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: CART_ERROR,
      payload: { msg: "Failed to add item in cart !" },
    });
  }
};

export const emptyCart = () => async (dispatch) => {
  try {
    dispatch({
      type: CLEAR_CART,
    });
  } catch (err) {
    dispatch({
      type: CART_ERROR,
      payload: { msg: "Failed to empty cart !" },
    });
  }
};

export const removeFromCart = (data) => async (dispatch) => {
  try {
    dispatch({
      type: REMOVE_FROM_CART,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: CART_ERROR,
      payload: { msg: "Failed to remove item from cart !" },
    });
  }
};

export const incrementQuantity = (data) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_ONE_TO_CART,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: CART_ERROR,
      payload: { msg: "Failed to increment quantity !" },
    });
  }
};

export const decrementQuantity = (data) => async (dispatch) => {
  try {
    dispatch({
      type: REMOVE_ONE_FROM_CART,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: CART_ERROR,
      payload: { msg: "Failed to decrement quantity !" },
    });
  }
};

export const clearCart = () => async (dispatch) => {
  try {
    dispatch({
      type: CLEAR_CART,
    });
  } catch (err) {
    dispatch({
      type: CART_ERROR,
      payload: { msg: "Failed to clear the cart !" },
    });
  }
};
