import {
    GET_TRACKING_FAILURE,
    GET_TRACKING_LOADING,
    GET_TRACKING_SUCCESS,
    UPDATE_TRACKING_FAILURE,
    UPDATE_TRACKING_LOADING,
    UPDATE_TRACKING_SUCCESS
} from '../actions/tracking';

const initialState = {
    data: {},      // data utama, misal: { data: [ { _id, status, logs, ... }, ... ] }
    loading: false,
    error: null,
    hasFetching: false
};

export default function tracking(state = initialState, action) {
    switch (action.type) {
        case GET_TRACKING_LOADING:
        case UPDATE_TRACKING_LOADING:
            return {
                ...state,
                loading: true,
                error: null
            };

        case GET_TRACKING_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                hasFetching: true
            };

            case UPDATE_TRACKING_SUCCESS: {
                const updatedTracking = action.payload; // asumsi backend balikin tracking yang sudah update (dengan logs baru)
                const newTrackingList = state.data.tracking.map(tracking =>
                  tracking._id === updatedTracking._id ? updatedTracking : tracking
                );

              
                return {
                  ...state,
                  loading: false,
                  data: {
                    ...state.data,
                    tracking: newTrackingList,
                  },
                };
              }
              

        case GET_TRACKING_FAILURE:
        case UPDATE_TRACKING_FAILURE:
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
