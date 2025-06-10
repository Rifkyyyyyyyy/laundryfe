import {
  GET_CASHIERS_FAILURE,
  GET_CASHIERS_LOADING,
  GET_CASHIERS_SUCCESS,
  DELETE_CASHIER_SUCCESS,
  DELETE_CASHIER_LOADING,
  DELETE_CASHIER_FAILURE,
  UPDATE_CASHIER_FAILURE,
  UPDATE_CASHIER_LOADING,
  UPDATE_CASHIER_SUCCESS
} from '../actions/cashiers';

const initialState = {
  data: {
    cashiers: [],
    pagination: {}
  },
  loading: false,
  error: null,
  hasFetching: false,
};

export default function cashiers(state = initialState, action) {
  switch (action.type) {
    case GET_CASHIERS_LOADING:
    case DELETE_CASHIER_LOADING:
    case UPDATE_CASHIER_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_CASHIERS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        hasFetching: true,
      };

    case GET_CASHIERS_FAILURE:
    case DELETE_CASHIER_FAILURE:
    case UPDATE_CASHIER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case DELETE_CASHIER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          cashiers: state.data.cashiers.filter(
            (cashier) => cashier._id !== action.payload
          ),
        },
      };

    case UPDATE_CASHIER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          cashiers: state.data.cashiers.map((cashier) =>
            cashier._id === action.payload._id ? action.payload : cashier
          ),
        },
      };

    default:
      return state;
  }
}
