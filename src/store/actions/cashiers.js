import cashiersServices from "../../service/cashiers/cashiersServices";


const {
    getAllCashiers
} = cashiersServices;

export const GET_CASHIERS_SUCCESS = "GET_CASHIERS_SUCCESS";
export const GET_CASHIERS_LOADING = "GET_CASHIERS_LOADING";
export const GET_CASHIERS_FAILURE = "GET_CASHIERS_FAILURE";



export function receiveData(payload) {
    return {
        type: GET_CASHIERS_SUCCESS,
        payload
    };
}

export function loadingData() {
    return {
        type: GET_CASHIERS_LOADING
    };
}

export function failedData(error) {
    return {
        type: GET_CASHIERS_FAILURE,
        error
    };
}


export function fetchCashiers(page, limit) {
    return async (dispatch) => {
        dispatch(loadingData());

        try {
            const data = await getAllCashiers(page, limit)

          
            // Tambahkan delay 500ms
            await new Promise(resolve => setTimeout(resolve, 500));

            dispatch(receiveData(data));
        } catch (error) {
            dispatch(failedData(error.message || "Gagal mengambil data kasir"));
        }
    };
}
