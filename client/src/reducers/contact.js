import { ADD_CONTACT, CONTACT_ERROR, GET_CONTACTS } from "./../actions/types";

const initialState = {
  contacts: [],
  loading: true,
  error: null,
};

export default function contact(state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case GET_CONTACTS:
      return {
        ...state,
        businesses: payload,
        loading: false,
      };

    case ADD_CONTACT:
      return {
        ...state,
        businesses: [payload, ...state.businesses],
        loading: false,
      };

    case CONTACT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
