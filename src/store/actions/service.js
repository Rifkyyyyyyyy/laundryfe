
import laundryService from "../../service/laundryService/laundryService";

const {
    getLaundryService
} = laundryService;

export const GET_SERVICE_SUCCESS = "GET_SERVICE_SUCCESS";
export const GET_SERVICE_LOADING = "GET_SERVICE_LOADING";
export const GET_SERVICE_FAILURE = "GET_SERVICE_FAILURE";



export function receiveData(payload) {
    return {
        type: GET_SERVICE_SUCCESS,
        payload
    };
}

export function loadingData() {
    return {
        type: GET_SERVICE_LOADING
    };
}

export function failedData(error) {
    return {
        type: GET_SERVICE_FAILURE,
        error
    };
}


export function getAllLaundryService() {
    return async (dispatch) => {
        dispatch(loadingData());
        try {
            const data = await getLaundryService();

            // Tambahkan delay 500ms
            await new Promise(resolve => setTimeout(resolve, 500));

            dispatch(receiveData(data));
        } catch (error) {
            dispatch(failedData(error.message || "Gagal mengambil data layanan"));
        }
    }
}