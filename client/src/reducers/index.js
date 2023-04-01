import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import business from "./business";
import cart from "./cart";
import discount from "./discount";
import contact from "./contact";

export default combineReducers({
  alert,
  auth,
  business,
  cart,
  discount,
  contact,
});
