import {
    GET_CUSTOMERS_FAILURE,
    GET_CUSTOMERS_LOADING,
    GET_CUSTOMERS_SUCCESS
} from '../actions/customers';

const initialState = {
    data: {},
    loading: false,
    error: null,
    hasFetching: false // Flag untuk menandakan apakah data sudah pernah diambil
};

export default function customers(state = initialState, action) {
    switch (action.type) {
        case GET_CUSTOMERS_LOADING:
            return {
                ...state,
                loading: true,
                error: null
            };

        case GET_CUSTOMERS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                hasFetching: true // Data berhasil diambil
            };

        case GET_CUSTOMERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
                hasFetching: false // Gagal ambil data
            };

        default:
            return state;
    }
}
