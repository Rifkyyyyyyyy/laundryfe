import todoService from "../../service/todo/todoService";

const {
  getTotalProductToDo
} = todoService

export const GET_TODO_SUCCESS = "GET_TODO_SUCCESS";
export const GET_TODO_LOADING = "GET_TODO_LOADING";
export const GET_TODO_FAILURE = "GET_TODO_FAILURE";



export function receiveData(payload) {
    return {
        type: GET_TODO_SUCCESS,
        payload
    };
}

export function loadingData() {
    return {
        type: GET_TODO_LOADING
    };
}

export function failedData(error) {
    return {
        type: GET_TODO_FAILURE,
        error
    };
}




export function getAllTodo(outletId) {
    return async (dispatch) => {
        dispatch(loadingData());
        try {
            const data = await getTotalProductToDo(outletId)

            // Tambahkan delay 500ms
            await new Promise(resolve => setTimeout(resolve, 500));

            dispatch(receiveData(data));
        } catch (error) {
            dispatch(failedData(error.message || "Gagal mengambil data tugas"));
        }
    }
}