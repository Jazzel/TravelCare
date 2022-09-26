import {
  ADD_BUSINESS,
  BUSINESS_ERROR,
  DELETE_BUSINESS,
  GET_BUSINESS,
  GET_BUSINESSES,
} from "../actions/types";

const initialState = {
  businesses: [],
  loading: true,
  bussiness: null,
  error: null,
};

export default function business(state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case GET_BUSINESSES:
      return {
        ...state,
        businesses: payload,
        loading: false,
      };
    case GET_BUSINESS:
      return {
        ...state,
        business: payload,
        loading: false,
      };
    case ADD_BUSINESS:
      return {
        ...state,
        businesses: [payload, ...state.businesses],
        loading: false,
      };
    case DELETE_BUSINESS:
      return {
        ...state,
        businesses: state.businesses.filter(
          (business) => business._id !== payload
        ),
        loading: false,
      };
    case BUSINESS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
