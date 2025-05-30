import {
    GET_TRACKING_FAILURE,
    GET_TRACKING_LOADING,
    GET_TRACKING_SUCCESS
} from '../actions/tracking';

const initialState = {
    trackingData: {},         // Berisi data hasil tracking
    trackingLoading: false,   // Status loading
    trackingError: null,      // Menyimpan error (jika ada)
    trackingHasFetching: false // Flag untuk menandakan apakah data sudah pernah diambil
};

export default function tracking(state = initialState, action) {
    switch (action.type) {
        case GET_TRACKING_LOADING:
            return {
                ...state,
                trackingLoading: true,
                trackingError: null
            };

        case GET_TRACKING_SUCCESS:
            return {
                ...state,
                trackingLoading: false,
                trackingData: action.payload,
                trackingHasFetching: true
            };

        case GET_TRACKING_FAILURE:
            return {
                ...state,
                trackingLoading: false,
                trackingError: action.error,
                trackingHasFetching: false
            };

        default:
            return state;
    }
}
