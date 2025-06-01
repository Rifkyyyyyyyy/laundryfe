import {
    GET_CASHIERS_FAILURE,
    GET_CASHIERS_LOADING,
    GET_CASHIERS_SUCCESS,
    DELETE_CASHIER_SUCCESS,
    DELETE_CASHIER_LOADING,
    DELETE_CASHIER_FAILURE,
  } from '../actions/cashiers';
  
  const initialState = {
    data: {
      cashiers: [],      // pastikan struktur data ini sesuai service-mu
      pagination: {}
    },
    loading: false,
    error: null,
    hasFetching: false,
    deleting: false,   // status loading saat delete
    deleteError: null,
  };
  
  export default function cashiers(state = initialState, action) {
    switch (action.type) {
      case GET_CASHIERS_LOADING:
        return {
          ...state,
          loading: true,
          error: null
        };
  
      case GET_CASHIERS_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
          hasFetching: true
        };
  
      case GET_CASHIERS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.error,
          hasFetching: false
        };
  
      case DELETE_CASHIER_LOADING:
        return {
          ...state,
          deleting: true,
          deleteError: null,
        };
  
      case DELETE_CASHIER_SUCCESS:
        return {
          ...state,
          deleting: false,
          data: {
            ...state.data,
            cashiers: state.data.cashiers.filter(cashier => cashier._id !== action.payload)
          }
        };
  
      case DELETE_CASHIER_FAILURE:
        return {
          ...state,
          deleting: false,
          deleteError: action.error,
        };
  
      default:
        return state;
    }
  }
  