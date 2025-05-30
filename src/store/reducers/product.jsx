import {
    GET_PRODUCT_LOADING,
    GET_PRODUCT_SUCCESS,
    GET_PRODUCT_FAILURE,
    CREATE_PRODUCT_LOADING,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAILURE,
    UPDATE_PRODUCT_LOADING,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAILURE,
    DELETE_PRODUCT_LOADING,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAILURE,
  } from '../actions/product';
  
  const initialState = {
    data: {
      products: [],
      pagination: {},
    },
    loading: false,
    error: null,
    hasFetching: false,
  };
  
  export default function productReducer(state = initialState, action) {
    switch (action.type) {
      // FETCH
      case GET_PRODUCT_LOADING:
        return {
          ...state,
          loading: true,
          error: null,
        };
  
      case GET_PRODUCT_SUCCESS:
        return {
          ...state,
          loading: false,
          data: {
            products: [
              ...(state.data.products || []),
              ...(action.payload.products || []),
            ],
            pagination: action.payload.pagination,
          },
          hasFetching: true,
        };
  
      case GET_PRODUCT_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.error,
          hasFetching: false,
        };
  
      // CREATE
      case CREATE_PRODUCT_LOADING:
        return {
          ...state,
          loading: true,
          error: null,
        };
  
      case CREATE_PRODUCT_SUCCESS:
        return {
          ...state,
          loading: false,
          data: {
            ...state.data,
            // tambahkan produk baru ke depan array produk (bisa juga di push ke belakang)
            products: [action.payload, ...(state.data.products || [])],
          },
        };
  
      case CREATE_PRODUCT_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.error,
        };
  
      // UPDATE
      case UPDATE_PRODUCT_LOADING:
        return {
          ...state,
          loading: true,
          error: null,
        };
  
      case UPDATE_PRODUCT_SUCCESS:
        return {
          ...state,
          loading: false,
          data: {
            ...state.data,
            products: state.data.products.map((product) =>
              product._id === action.payload._id ? action.payload : product
            ),
          },
        };
  
      case UPDATE_PRODUCT_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.error,
        };
  
      // DELETE
      case DELETE_PRODUCT_LOADING:
        return {
          ...state,
          loading: true,
          error: null,
        };
  
      case DELETE_PRODUCT_SUCCESS:
        return {
          ...state,
          loading: false,
          data: {
            ...state.data,
            products: state.data.products.filter(
              (product) => product._id !== action.payload
            ),
          },
        };
  
      case DELETE_PRODUCT_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.error,
        };
  
      default:
        return state;
    }
  }
  