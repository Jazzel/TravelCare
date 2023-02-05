import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import business from "./business";
import cart from "./cart";

export default combineReducers({ alert, auth, business, cart });
