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
    case actions.products.DATA_CREATE:
      return {
        ...state,
        products: [...state.products, action.data]
      }
    case actions.products.DATA_DELETE:
      return{
        ...state,
        products: state.products.filter((product)=> product.id !== action.data)
      }
    case actions.products.DATA_FETCH_ERROR:
      return{
        ...state,
        loading: false,
        error: action.error
      }
    default:{
      return state
    }
  }
};

export { initialState, ProductReducers };
