import {
    GET_SERVICE_FAILURE,
    GET_SERVICE_LOADING,
    GET_SERVICE_SUCCESS
} from '../actions/service';

const initialState = {
    data: [],
    loading: false,
    error: null,
    hasFetching: false // Flag untuk menandakan apakah data sudah pernah diambil
};

export default function laundryService(state = initialState, action) {
    switch (action.type) {
        case GET_SERVICE_LOADING:
            return {
                ...state,
                loading: true,
                error: null
            };

        case GET_SERVICE_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                hasFetching: true // Set flag hasFetching ke true setelah data berhasil diambil
            };

        case GET_SERVICE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
                hasFetching: false // Set flag hasFetching ke false jika pengambilan data gagal
            };

        default:
            return state;
    }
}
