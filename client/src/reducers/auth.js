import {
  ACCOUNT_DELETED,
  AUTH_ERROR,
  GET_USERS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  UNVERIFIED,
  USER_LOADED,
  VERIFIED,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
  role: null,
  users: null,
  forgotCodeVerified: null,
};

export default function auth(state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
        role: payload.role,
        username: payload.name,
        status: payload.status,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
    case ACCOUNT_DELETED:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        token: null,
      };
    case VERIFIED:
      return {
        ...state,
        loading: false,
        forgotCodeVerified: true,
      };
    case UNVERIFIED:
      return {
        ...state,
        loading: false,
        forgotCodeVerified: false,
      };
    case GET_USERS:
      return {
        ...state,
        users: payload,
        loading: false,
      };
    default:
      return state;
  }
}
