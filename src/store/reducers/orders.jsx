import {
  GET_ORDER_FAILURE,
  GET_ORDER_LOADING,
  GET_ORDER_SUCCESS,
  CREATE_ORDER_LOADING,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
} from '../actions/order';

const initialState = {
  data: {},            // Semua data order
  loading: false,      // Status loading global
  error: null,         // Error global
  hasFetching: false,  // Apakah sudah pernah fetch
};

export default function orders(state = initialState, action) {
  switch (action.type) {
    // Loading states
    case GET_ORDER_LOADING:
    case CREATE_ORDER_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };

    // Success states
    case GET_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        hasFetching: true,
        error: null,
      };

    case CREATE_ORDER_SUCCESS: {
      const newOrder = action.payload;
      const updatedOrders = state.data?.data ? [newOrder, ...state.data.data] : [newOrder];

      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          data: updatedOrders,
        },
        error: null,
      };
    }

    // Failure states
    case GET_ORDER_FAILURE:
    case CREATE_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
