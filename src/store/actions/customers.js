import userServices from "../../service/user/userServices";

const {
    getAllUser ,
    searchUser
} = userServices

export const GET_CUSTOMERS_SUCCESS = "GET_CUSTOMERS_SUCCESS";
export const GET_CUSTOMERS_LOADING = "GET_CUSTOMERS_LOADING";
export const GET_CUSTOMERS_FAILURE = "GET_CUSTOMERS_FAILURE";



export function receiveData(payload) {
    return {
        type: GET_CUSTOMERS_SUCCESS,
        payload
    };
}

export function loadingData() {
    return {
        type: GET_CUSTOMERS_LOADING
    };
}

export function failedData(error) {
    return {
        type: GET_CUSTOMERS_FAILURE,
        error
    };
}




export function fetchCustomers(page, limit) {
    return async (dispatch) => {
        dispatch(loadingData());

        try {
            const data = await getAllUser(page , limit)

            // Tambahkan delay 500ms
            await new Promise(resolve => setTimeout(resolve, 500));

            dispatch(receiveData(data));
        } catch (error) {
            dispatch(failedData(error.message || "Gagal mengambil data customers"));
        }
    };
}


export function searchCustomers(searchTerm, page, limit) {
    return async (dispatch) => {
        dispatch(loadingData());

        try {
            const data = await searchUser(searchTerm, page, limit);
            await new Promise(resolve => setTimeout(resolve, 300));
            dispatch(receiveData(data));
        } catch (error) {
            dispatch(failedData(error.message || "Gagal mencari data customers"));
        }
    };
}
