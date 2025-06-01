import {
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
  loading: false,
  error: null,
  hasFetching: false,
};

export default function discounts(state = initialState, action) {
  switch (action.type) {
    // Loading states
    case FETCH_DISCOUNTS_REQUEST:
    case CREATE_DISCOUNT_REQUEST:
    case UPDATE_DISCOUNT_REQUEST:
    case DELETE_DISCOUNT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    // Fetch success
    case FETCH_DISCOUNTS_SUCCESS: {
      const { discounts = [], pagination = {} } = action.payload || {};
      return {
        ...state,
        loading: false,
        hasFetching: true,
        data: {
          discounts,
          pagination,
        },
        error: null,
      };
    }

    // Create success
    case CREATE_DISCOUNT_SUCCESS: {
      const newDiscount = action.payload;
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          discounts: [newDiscount, ...state.data.discounts],
        },
        error: null,
      };
    }

    // Update success
    case UPDATE_DISCOUNT_SUCCESS: {
      const updatedDiscount = action.payload;
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          discounts: state.data.discounts.map(d =>
            d._id === updatedDiscount._id ? updatedDiscount : d
          ),
        },
        error: null,
      };
    }

    // Delete success
    case DELETE_DISCOUNT_SUCCESS: {
      const deletedId = action.payload._id;
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          discounts: state.data.discounts.filter(d => d._id !== deletedId),
        },
        error: null,
      };
    }

    // Failure states
    case FETCH_DISCOUNTS_FAILURE:
    case CREATE_DISCOUNT_FAILURE:
    case UPDATE_DISCOUNT_FAILURE:
    case DELETE_DISCOUNT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error || action.payload || 'Unknown error',
      };

    default:
      return state;
  }
}
