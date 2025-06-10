import stockService from "../../service/stock/stockService";

const {
    getStockByOutlet,
    getAllStock,
    createStockService ,
    updateStockService ,
    deleteStock
} = stockService

export const GET_STOCK_SUCCESS = "GET_STOCK_SUCCESS";
export const GET_STOCK_LOADING = "GET_STOCK_LOADING";
export const GET_STOCK_FAILURE = "GET_STOCK_FAILURE";


export const CREATE_STOCK_LOADING = 'CREATE_STOCK_LOADING';
export const CREATE_STOCK_SUCCESS = 'CREATE_STOCK_SUCCESS';
export const CREATE_STOCK_FAILURE = 'CREATE_STOK_FAILURE';


export const UPDATE_STOCK_LOADING = 'UPDATE_STOCK_LOADING';
export const UPDATE_STOCK_SUCCESS = 'UPDATE_STOCK_SUCCESS';
export const UPDATE_STOCK_FAILURE = 'UPDATE_STOCK_FAILURE';


export const DELETE_STOCK_LOADING = 'DELETE_STOCK_LOADING';
export const DELETE_STOCK_SUCCESS = 'DELETE_STOCK_SUCCESS';
export const DELETE_STOCK_FAILURE = 'DELETE_STOCK_FAILURE';




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


export function receiveCreateData(payload) {
    return {
        type: CREATE_STOCK_SUCCESS,
        payload
    };
}

export function loadingCreateData() {
    return {
        type: CREATE_STOCK_LOADING
    };
}

export function failedCreateData(error) {
    return {
        type: CREATE_STOCK_FAILURE,
        error
    };
}

export function loadingUpdateData() {
    return {
        type: UPDATE_STOCK_LOADING
    };
}

export function receiveUpdateData(payload) {
    return {
        type: UPDATE_STOCK_SUCCESS,
        payload
    };
}

export function failedUpdateData(error) {
    return {
        type: UPDATE_STOCK_FAILURE,
        error
    };
}


export function loadingDeleteData() {
    return {
        type: DELETE_STOCK_LOADING
    };
}

export function receiveDeleteData(payload) {
    return {
        type: DELETE_STOCK_SUCCESS,
        payload
    };
}

export function failedDeleteData(error) {
    return {
        type: DELETE_STOCK_FAILURE,
        error
    };
}



export function getAllStockByOutlet(page, limit, outletId) {
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

export function getStock(page, limit) {
    return async (dispatch) => {
        dispatch(loadingData());
        try {
            const data = await getAllStock(page, limit)

            // Tambahkan delay 500ms
            await new Promise(resolve => setTimeout(resolve, 500));

            dispatch(receiveData(data));
        } catch (error) {
            dispatch(failedData(error.message || "Gagal mengambil data inventory"));
        }
    }
}


export function createStock(value) {
    return async (dispatch) => {
        dispatch(loadingCreateData());
        try {
            const data = await createStockService(value);
            await new Promise(resolve => setTimeout(resolve, 500));
            dispatch(receiveCreateData(data));

        } catch (error) {
            dispatch(failedCreateData(error.message || "Gagagl membuat data inventory"))

        }
    }
}


export function updateStock(itemId, stock) {
    return async (dispatch) => {
        dispatch(loadingUpdateData());
        try {
            const data = await updateStockService(itemId, stock);
            await new Promise(resolve => setTimeout(resolve, 500));
            dispatch(receiveUpdateData(data));
        } catch (error) {
            dispatch(failedUpdateData(error.message || "Gagal memperbarui data stock"));
        }
    };
}


export function deleteStockByIdThunk(id) {
    return async (dispatch) => {
        dispatch(loadingDeleteData());
        try {
            const data = await deleteStock(id);
            await new Promise(resolve => setTimeout(resolve, 500));
            dispatch(receiveDeleteData(data));
        } catch (error) {
            dispatch(failedDeleteData(error.message || "Gagal menghapus data inventory"));
        }
    };
}
