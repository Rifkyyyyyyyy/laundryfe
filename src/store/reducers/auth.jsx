import {
    LOGIN_REQUEST,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    REGISTER_FAILURE,
    REGISTER_SUCCESS,
} from "../actions/auth";

const userFromStorage = (() => {
    const raw = localStorage.getItem('user');
    return raw && raw !== 'undefined' ? JSON.parse(raw) : null;
})();

const isAuthenticatedFromStorage = localStorage.getItem('isAuthenticated') === 'true';

const initialState = {
    user: userFromStorage,
    error: null,
    loading: false,
    isAuthenticated: isAuthenticatedFromStorage,
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
        case LOGOUT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,       // Reset error saat request mulai
            };

        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload,
                error: null,
                isAuthenticated: true,
                loading: false,
            };

        case REGISTER_SUCCESS:
            return {
                ...state,
                error: null,
                loading: false,
                // Tidak mengubah user atau isAuthenticated
            };

        case LOGIN_FAILURE:
        case REGISTER_FAILURE:
            return {
                ...state,
                // Jangan reset user di register failure agar login tetap aman
                error: action.payload,
                loading: false,
                // isAuthenticated tetap tidak berubah di register failure
            };

        case LOGOUT_SUCCESS:
            return {
                ...state,
                user: null,
                error: null,
                isAuthenticated: false,
                loading: false,
            };

        default:
            return state;
    }
}
