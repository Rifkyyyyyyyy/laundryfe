import {
    GET_STOCK_FAILURE,
    GET_STOCK_LOADING,
    GET_STOCK_SUCCESS
} from '../actions/stock';

const initialState = {
    data: {},
    loading: false,
    error: null,
    hasFetching: false
};

export default function stock(state = initialState, action) {
    switch (action.type) {
        case GET_STOCK_LOADING:
            return {
                ...state,
                loading: true,
                error: null
            };

        case GET_STOCK_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                hasFetching: true // Set flag hasFetching ke true setelah data berhasil diambil
            };

        case GET_STOCK_FAILURE:
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
