import paymentService from "../../service/payment/paymentService";

const {
    getPaymentByOutletService ,
    getAllPaymentsService
} = paymentService;

export const GET_PAYMENT_SUCCESS = "GET_PAYMENT_SUCCESS";
export const GET_PAYMENT_LOADING = "GET_PAYMENT_LOADING";
export const GET_PAYMENT_FAILURE = "GET_PAYMENT_FAILURE";

export function receiveData(payload) {
    return {
        type: GET_PAYMENT_SUCCESS,
        payload
    };
}

export function loadingData() {
    return {
        type: GET_PAYMENT_LOADING
    };
}

export function failedData(error) {
    return {
        type: GET_PAYMENT_FAILURE,
        error
    };
}

export function getAllPaymentByOutlet(page, limit, outletId) {
    return async (dispatch) => {
        dispatch(loadingData());
        try {
            const data = await getPaymentByOutletService(page, limit, outletId);

            // Tambahkan delay (opsional, untuk simulasi loading)
            await new Promise(resolve => setTimeout(resolve, 500));

            dispatch(receiveData(data));
        } catch (error) {
            console.log(`error : ${error}`);
            dispatch(failedData(error.message || "Gagal mengambil data pembayaran"));
        }
    };
}


export function getAllPayment(page, limit) {
    return async (dispatch) => {
        dispatch(loadingData());
        try {
            const data = await getAllPaymentsService(page, limit);

            // Tambahkan delay (opsional, untuk simulasi loading)
            await new Promise(resolve => setTimeout(resolve, 500));

            dispatch(receiveData(data));
        } catch (error) {
            console.log(`error : ${error}`);
            dispatch(failedData(error.message || "Gagal mengambil data pembayaran"));
        }
    };
}

