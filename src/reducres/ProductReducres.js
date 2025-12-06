import { actions } from "../actions";

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const ProductReducers = (state, action) => {
  switch (action.type) {
    case actions.products.DATA_FETCHING:
      return {
        ...state,
        loading: true,
      };
    case actions.products.DATA_FETCHED:
      return {
        ...state,
        loading: false,
        products: action.data,
      };
  }
};

export { initialState, ProductReducers };
