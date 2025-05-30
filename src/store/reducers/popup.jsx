import {
    GET_POPUP_SUCCESS,
    GET_POPUP_LOADING,
    GET_POPUP_FAILURE
  } from "../actions/popup";
  
  const initialState = {
    popupData: [],
    popupLoading: false,
    popupError: null
  };
  
  export default function popup(state = initialState, action) {
    switch (action.type) {
      case GET_POPUP_LOADING:
        return {
          ...state,
          popupLoading: true,
          popupError: null
        };
  
      case GET_POPUP_SUCCESS:
        return {
          ...state,
          popupLoading: false,
          popupError: null,
          popupData: action.payload || []
        };
  
      case GET_POPUP_FAILURE:
        return {
          ...state,
          popupLoading: false,
          popupError: action.error
        };
  
      default:
        return state;
    }
  }
  