import {
    GET_STOCK_FAILURE,
    GET_STOCK_LOADING,
    GET_STOCK_SUCCESS,
    CREATE_STOCK_FAILURE,
    CREATE_STOCK_LOADING,
    CREATE_STOCK_SUCCESS,
    UPDATE_STOCK_LOADING,
    UPDATE_STOCK_SUCCESS,
    UPDATE_STOCK_FAILURE,
    DELETE_STOCK_FAILURE,
    DELETE_STOCK_LOADING,
    DELETE_STOCK_SUCCESS
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
        case CREATE_STOCK_LOADING:
        case UPDATE_STOCK_LOADING:
        case DELETE_STOCK_LOADING:
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
                hasFetching: true
            };

        case GET_STOCK_FAILURE:
        case CREATE_STOCK_FAILURE:
        case UPDATE_STOCK_FAILURE:
        case DELETE_STOCK_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
                hasFetching: false
            };

        case CREATE_STOCK_SUCCESS:
            return {
                ...state,
                loading: false,
                data: {
                    ...state.data,
                    stock: [action.payload, ...(state.data.stock || [])]
                }
            };

        case UPDATE_STOCK_SUCCESS:
            return {
                ...state,
                loading: false,
                data: {
                    ...state.data,
                    stock: (state.data.stock || []).map(item =>
                        item._id === action.payload._id ? action.payload : item
                    )
                }
            };

        case DELETE_STOCK_SUCCESS:
            return {
                ...state,
                loading: false,
                data: {
                    ...state.data,
                    stock: (state.data.stock || []).filter(
                        item => item._id !== action.payload
                    )
                }
            };

        default:
            return state;
    }
}
