import cashiersServices from "../../service/cashiers/cashiersServices";


const {
    getAllCashiers ,
    deleteCashiers
} = cashiersServices;

export const GET_CASHIERS_SUCCESS = "GET_CASHIERS_SUCCESS";
export const GET_CASHIERS_LOADING = "GET_CASHIERS_LOADING";
export const GET_CASHIERS_FAILURE = "GET_CASHIERS_FAILURE";

export const DELETE_CASHIER_SUCCESS = "DELETE_CASHIER_SUCCESS";
export const DELETE_CASHIER_LOADING = "DELETE_CASHIER_LOADING";
export const DELETE_CASHIER_FAILURE = "DELETE_CASHIER_FAILURE";

export function deleteCashierSuccess(id) {
  return {
    type: DELETE_CASHIER_SUCCESS,
    payload: id,
  };
}

export function deleteCashierLoading() {
  return {
    type: DELETE_CASHIER_LOADING,
  };
}

export function deleteCashierFailure(error) {
  return {
    type: DELETE_CASHIER_FAILURE,
    error,
  };
}




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


export function deleteCashier(id) {
  return async (dispatch) => {
    dispatch(deleteCashierLoading());

    try {
      await deleteCashiers(id);

      // Jika ingin beri delay 500ms seperti fetch
      await new Promise((resolve) => setTimeout(resolve, 500));

      dispatch(deleteCashierSuccess(id));
    } catch (error) {
      dispatch(deleteCashierFailure(error.message || "Gagal menghapus kasir"));
    }
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
