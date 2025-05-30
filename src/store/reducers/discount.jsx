import {
  FETCH_DISCOUNTS_BY_OUTLET_FAILURE,
  FETCH_DISCOUNTS_BY_OUTLET_REQUEST,
  FETCH_DISCOUNTS_BY_OUTLET_SUCCESS,
  FETCH_DISCOUNTS_FAILURE,
  FETCH_DISCOUNTS_REQUEST,
  FETCH_DISCOUNTS_SUCCESS,
  DELETE_DISCOUNT_FAILURE,
  DELETE_DISCOUNT_REQUEST,
  DELETE_DISCOUNT_SUCCESS,
  UPDATE_DISCOUNT_FAILURE,
  UPDATE_DISCOUNT_REQUEST,
  UPDATE_DISCOUNT_SUCCESS,
  CREATE_DISCOUNT_FAILURE,
  CREATE_DISCOUNT_REQUEST,
  CREATE_DISCOUNT_SUCCESS,
} from '../actions/discount';

const initialState = {
  data: {
    discounts: [],
    pagination: {},
  },
  error: null,
  loading: false,
  hasFetching: false,
};

export default function discounts(state = initialState, action) {
  switch (action.type) {
    case FETCH_DISCOUNTS_REQUEST:
    case FETCH_DISCOUNTS_BY_OUTLET_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        hasFetching: true,
      };
    case FETCH_DISCOUNTS_SUCCESS:
    case FETCH_DISCOUNTS_BY_OUTLET_SUCCESS:
      return {
        ...state,
        loading: false,
        hasFetching: false,
        data: {
          discounts: [
            ...(state.data.discounts || []),
            ...(action.payload.discounts || []),
          ],
          pagination: action.payload.pagination || {},
        },
      };
    case FETCH_DISCOUNTS_FAILURE:
    case FETCH_DISCOUNTS_BY_OUTLET_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
        hasFetching: false,
      };

    case CREATE_DISCOUNT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CREATE_DISCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          discounts: [...state.data.discounts, action.payload],
        },
      };
    case CREATE_DISCOUNT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case UPDATE_DISCOUNT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_DISCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          discounts: state.data.discounts.map((discount) =>
            discount._id === action.payload._id ? action.payload : discount
          ),
        },
      };
    case UPDATE_DISCOUNT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case DELETE_DISCOUNT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DELETE_DISCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          discounts: state.data.discounts.filter(
            (discount) => discount._id !== action.payload._id
          ),
        },
      };
    case DELETE_DISCOUNT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
}
