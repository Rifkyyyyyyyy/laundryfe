import {
    GET_CASHIERS_FAILURE,
    GET_CASHIERS_LOADING,
    GET_CASHIERS_SUCCESS
} from '../actions/cashiers';

const initialState = {
    data: {},
    loading: false,
    error: null,
    hasFetching: false  // Flag untuk menandakan apakah data sudah pernah diambil
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
                hasFetching: true  // Set flag hasFetching ke true setelah data berhasil diambil
            };

        case GET_CASHIERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
                hasFetching: false  // Set flag hasFetching ke false jika pengambilan data gagal
            };

        default:
            return state;
    }
}
