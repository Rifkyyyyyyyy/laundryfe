import {
  GET_MEMBER_LOADING,
  GET_MEMBER_SUCCESS,
  GET_MEMBER_FAILURE,
  CREATE_MEMBER_LOADING,
  CREATE_MEMBER_SUCCESS,
  CREATE_MEMBER_FAILURE,
  UPDATE_MEMBER_LOADING,
  UPDATE_MEMBER_SUCCESS,
  UPDATE_MEMBER_FAILURE,
  DELETE_MEMBER_LOADING,
  DELETE_MEMBER_SUCCESS,
  DELETE_MEMBER_FAILURE
} from '../actions/member';

const initialState = {
  data: {},  // { data: [...] , pagination: {} } disimpan di sini
  loading: false,
  error: null,
  hasFetching: false,
};

export default function members(state = initialState, action) {
  switch (action.type) {
    // Loading states
    case GET_MEMBER_LOADING:
    case CREATE_MEMBER_LOADING:
    case UPDATE_MEMBER_LOADING:
    case DELETE_MEMBER_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };

    // Success fetch members
    case GET_MEMBER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload, // { data: [], pagination: {} }
        hasFetching: true,
      };

    // Success create member
    case CREATE_MEMBER_SUCCESS: {
      const newMember = action.payload;
      const updatedList = state.data?.data ? [newMember, ...state.data.data] : [newMember];

      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          data: updatedList,
        },
      };
    }

    // Success update member
    case UPDATE_MEMBER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          data: (state.data.data || []).map(item =>
            item._id === action.payload._id ? action.payload : item
          )
        }
      };


    // Success delete member
    case DELETE_MEMBER_SUCCESS: {
      const deletedId = action.payload;
      const filteredList = state.data?.data?.filter(
        (member) => member._id !== deletedId
      ) || [];

      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          data: filteredList,
        },
      };
    }

    // Failed states
    case GET_MEMBER_FAILURE:
    case CREATE_MEMBER_FAILURE:
    case UPDATE_MEMBER_FAILURE:
    case DELETE_MEMBER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
        hasFetching: false,
      };

    default:
      return state;
  }
}
