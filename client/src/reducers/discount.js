import {
  ADD_DISCOUNT,
  DISCOUNT_ERROR,
  GET_DISCOUNT,
  GET_DISCOUNTS,
  UPDATE_DISCOUNT,
  REMOVE_DISCOUNT,
} from "../actions/types";

const initialState = {
  discounts: [],
  loading: true,
  discount: null,
  error: null,
};

export default function discount(state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case GET_DISCOUNTS:
      return {
        ...state,
        discounts: payload,
        loading: false,
      };
    case GET_DISCOUNT:
      return {
        ...state,
        discount: payload,
        loading: false,
      };
    case ADD_DISCOUNT:
      return {
        ...state,
        discounts: [payload, ...state.discounts],
        loading: false,
      };
    case REMOVE_DISCOUNT:
      return {
        ...state,
        discounts: state.discounts.filter(
          (discount) => discount._id !== payload
        ),
        loading: false,
      };
    case DISCOUNT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
