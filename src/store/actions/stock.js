import stockService from "../../service/stock/stockService";

const {
    getStockByOutlet
} = stockService

export const GET_STOCK_SUCCESS = "GET_STOCK_SUCCESS";
export const GET_STOCK_LOADING = "GET_STOCK_LOADING";
export const GET_STOCK_FAILURE = "GET_STOCK_FAILURE";



export function receiveData(payload) {
    return {
        type: GET_STOCK_SUCCESS,
        payload
    };
}

export function loadingData() {
    return {
        type: GET_STOCK_LOADING
    };
}

export function failedData(error) {
    return {
        type: GET_STOCK_FAILURE,
        error
    };
}



export function getAllStock(page, limit, outletId) {
    return async (dispatch) => {
        dispatch(loadingData());
        try {
            const data = await getStockByOutlet(page, limit, outletId);

            // Tambahkan delay 500ms
            await new Promise(resolve => setTimeout(resolve, 500));

            dispatch(receiveData(data));
        } catch (error) {
            dispatch(failedData(error.message || "Gagal mengambil data inventory"));
        }
    }
}