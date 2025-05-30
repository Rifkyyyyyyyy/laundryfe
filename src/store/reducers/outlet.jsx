import {
  GET_OUTLET_FAILURE,
  GET_OUTLET_LOADING,
  GET_OUTLET_SUCCESS,
  CREATE_OUTLET_FAILURE,
  CREATE_OUTLET_LOADING,
  CREATE_OUTLET_SUCCESS
} from '../actions/outlet';

const initialState = {
  data: {},  // diasumsikan response awal dari API, misal { data: [...], pagination: {...} }
  loading: false,
  error: null,
  hasFetching: false
};

export default function outlets(state = initialState, action) {
  switch (action.type) {
    // Loading states for fetch & create
    case GET_OUTLET_LOADING:
    case CREATE_OUTLET_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      };

    // Success fetch outlets
    case GET_OUTLET_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload, // payload sudah termasuk data dan pagination, langsung replace
        hasFetching: true
      };

    // Success create outlet
    case CREATE_OUTLET_SUCCESS: {
      const newOutlet = action.payload;

      // Update list dengan menambahkan outlet baru di depan list lama
      const updatedList = state.data?.data
        ? [newOutlet, ...state.data.data]
        : [newOutlet];

      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          data: updatedList
        }
      };
    }

    // Failed states for fetch & create
    case GET_OUTLET_FAILURE:
    case CREATE_OUTLET_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
        hasFetching: false
      };

    default:
      return state;
  }
}
