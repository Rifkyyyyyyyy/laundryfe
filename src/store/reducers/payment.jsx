import {
    GET_PAYMENT_FAILURE,
    GET_PAYMENT_LOADING,
    GET_PAYMENT_SUCCESS
} from '../actions/payment';

const initialState = {
    data: {},
    loading: false,
    error: null,
    hasFetching: false
};

export default function payments(state = initialState, action) {
    switch (action.type) {
        case GET_PAYMENT_LOADING:
            return {
                ...state,
                loading: true,
                error: null
            };

        case GET_PAYMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                hasFetching: true
            };

        case GET_PAYMENT_FAILURE:
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
