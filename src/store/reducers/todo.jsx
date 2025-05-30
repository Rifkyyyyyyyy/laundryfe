import {
    GET_TODO_FAILURE,
    GET_TODO_LOADING,
    GET_TODO_SUCCESS
} from '../actions/todo';

const initialState = {
    data: {},
    loading: false,
    error: null,
    hasFetching: false // Flag untuk menandakan apakah data sudah pernah diambil
};

export default function todo(state = initialState, action) {
    switch (action.type) {
        case GET_TODO_LOADING:
            return {
                ...state,
                loading: true,
                error: null
            };

        case GET_TODO_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                hasFetching: true // Set flag hasFetching ke true setelah data berhasil diambil
            };

        case GET_TODO_FAILURE:
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
