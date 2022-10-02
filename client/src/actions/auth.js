import axios from "axios";
import { HOST } from "../App";
import setAuthToken from "../utils/setAuthToken";
import { setAlert } from "./alert";
import {
  AUTH_ERROR,
  CLEAR_PROFILE,
  GET_USERS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  UNVERIFIED,
  USER_LOADED,
  VERIFIED,
} from "./types";

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get(`${HOST}/api/auth`);
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const register =
  ({ name, email, password, role, businessname, address, phone }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      name,
      email,
      password,
      role,
      businessname,
      address,
      phone,
    });

    try {
      const res = await axios.post(`${HOST}/api/users`, body, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser());

      return res.status;
    } catch (error) {
      const errors = error.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

// Login User
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(`${HOST}/api/auth`, body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Logout User / Clear profile
export const logout = () => (dispatch) => {
  dispatch({
    type: CLEAR_PROFILE,
  });
  dispatch({
    type: LOGOUT,
  });
};

export const sendEmailForVerification =
  ({ code, email }) =>
  async (dispatch) => {
    // send Email for verification
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ email });

    try {
      const res = await axios.post(`${HOST}/api/send-email`, body, config);
      console.log(res);

      return true;

      // dispatch(loadUser());
    } catch (error) {
      const errors = error.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
    }
    return false;
  };

export const verifyCode =
  ({ code, email }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ code, email });

    try {
      const res = await axios.post(`${HOST}/api/verify`, body, config);
      console.log(res);

      if (res.status === 200) {
        dispatch({
          type: VERIFIED,
        });
        return true;
      }
      return false;
      // dispatch(loadUser());
    } catch (error) {
      const errors = error.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: UNVERIFIED,
      });
    }
    return false;
  };

export const changePassword =
  ({ code, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ email, password, code });

    try {
      const res = await axios.post(
        `${HOST}/api/change-password/`,
        body,
        config
      );
      console.log(res);
      return res;
    } catch (error) {
      const errors = error.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
    }
  };

export const getUsers = () => async (dispatch) => {
  try {
    const res = await axios.get(`${HOST}/api/users`);
    console.log(res);
    dispatch({
      type: GET_USERS,
      payload: res.data,
    });
    return res;
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

export const deactivateUser = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${HOST}/api/users/${id}`);
    console.log(res);
    dispatch(getUsers());
    return res;
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};
