import {
    CALCULATE_ORDER_FAILURE,
    CALCULATE_ORDER_LOADING,
    CALCULATE_ORDER_SUCCESS
  } from '../actions/calculate';
  
  const initialState = {
    total: 0,
    error: null,
    loading: false
  };
  
  export default function calculate(state = initialState, action) {
    switch (action.type) {
      case CALCULATE_ORDER_LOADING:
        return {
          ...state,
          loading: true,
          error: null
        };
  
      case CALCULATE_ORDER_SUCCESS:
        return {
          ...state,
          loading: false,
          total: action.payload, // pastikan payload adalah angka total
          error: null
        };
  
      case CALCULATE_ORDER_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
  
      default:
        return state;
    }
  }
  