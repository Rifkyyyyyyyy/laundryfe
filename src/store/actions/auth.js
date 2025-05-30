import authServices from "../../service/auth/authServices";

const {
    loginServices,
    registerCashiers
} = authServices;

// Action types
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";


// Action creators

export function loginRequest() {
    return {
        type: LOGIN_REQUEST,
    };
}

export function receiveLogin(user) {
    return {
        type: LOGIN_SUCCESS,
        payload: user,
    };
}

export function loginError(error) {
    return {
        type: LOGIN_FAILURE,
        payload: error,
    };
}

export function logoutRequest() {
    return {
        type: LOGOUT_REQUEST,
    };
}

export function receiveLogout() {
    return {
        type: LOGOUT_SUCCESS,
    };
}

export function registerSuccess(user) {
    return {
        type: REGISTER_SUCCESS,
        payload: user,
    };
}

export function registerFailure(error) {
    return {
        type: REGISTER_FAILURE,
        payload: error,
    };
}

// Thunk: loginUser
export function loginUser(email, password) {
    return async (dispatch) => {
        dispatch(loginRequest());

        // Mulai timer delay dan request API secara paralel
        const delayPromise = new Promise(resolve => setTimeout(resolve, 1500));
        const responsePromise = loginServices(email, password);

        try {
            const [response] = await Promise.all([responsePromise, delayPromise]);

            dispatch(receiveLogin(response));
            localStorage.setItem('user', JSON.stringify(response));
            localStorage.setItem('isAuthenticated', 'true');
        } catch (error) {
            await delayPromise; // pastikan delay tetap terpenuhi
            dispatch(loginError(error.message || 'Terjadi kesalahan saat login'));
            localStorage.removeItem('user');
            localStorage.setItem('isAuthenticated', 'false');
        }
    };
}



export function logoutUser() {
    return async (dispatch) => {
        dispatch(logoutRequest());
      
       
  
        localStorage.removeItem('user');
        localStorage.setItem('isAuthenticated', 'false');

        await new Promise(resolve => setTimeout(resolve, 1500)); // Opsional: delay
        dispatch(receiveLogout());
    };
}


