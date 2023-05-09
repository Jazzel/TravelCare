import {
  ADD_ONE_TO_CART,
  ADD_TO_CART,
  CART_ERROR,
  CLEAR_CART,
  REMOVE_FROM_CART,
  REMOVE_ONE_FROM_CART,
} from "../actions/types";

const initialState = {
  items: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  error: null,
};

const savingData = (cart) => {
  localStorage.setItem(
    "cart",
    JSON.stringify(cart && cart.length > 0 ? cart : [])
  );
};

export const cartTotal = (cart) => {
  savingData(cart);
  let items = cart.reduce((total, product) => total + product.quantity, 0);
  let total = cart
    .reduce(
      (total, product) =>
        total +
        (product.service.discountPecentage > 0
          ? product.service.price *
            (1 - product.service.discountPecentage / 100).toFixed(2)
          : product.service.price) *
          product.quantity,
      0
    )
    .toFixed(2);
  return { items, total };
};

export default function cart(state = initialState, action) {
  const { payload, type } = action;

  switch (type) {
    case ADD_TO_CART: {
      const isAlreadyInCart = state.items.filter(
        (item) => item._id === payload._id
      );

      if (isAlreadyInCart.length > 0) {
        state.items[state.items.findIndex((item) => item._id === payload._id)]
          .quantity++;
        savingData(state.items);

        return state;
      } else {
        let items = [
          ...state.items,
          { _id: payload._id, service: payload, quantity: 1 },
        ];

        savingData(state.items);

        return { ...state, items };
      }
    }

    case REMOVE_FROM_CART: {
      let items = state.items.filter((item) => item._id !== payload);
      savingData(items);
      return { ...state, items };
    }

    case REMOVE_ONE_FROM_CART: {
      const isAlreadyInCart = state.items.filter(
        (item) => item._id === payload
      );

      console.log(isAlreadyInCart);
      if (isAlreadyInCart.length > 0) {
        if (isAlreadyInCart[0].quantity > 1) {
          state.items[state.items.findIndex((item) => item._id === payload)]
            .quantity--;
        } else {
          isAlreadyInCart[0].quantity = 0;
        }
      }
      savingData(state.items);

      return { ...state, items: state.items };
    }

    case ADD_ONE_TO_CART: {
      const isAlreadyInCart = state.items.filter(
        (item) => item._id === payload
      );
      if (isAlreadyInCart.length > 0) {
        state.items[state.items.findIndex((item) => item._id === payload)]
          .quantity++;
      }
      savingData(state.items);

      return { ...state, items: state.items };
    }

    case CLEAR_CART:
      return {
        ...state,
        items: [],
      };

    case CART_ERROR:
      return {
        ...state,
        error: true,
      };

    default:
      return state;
  }
}
