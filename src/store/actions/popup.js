import laundryService from "../../service/laundryService/laundryService";
import productService from "../../service/product/productService";

const {
    getAllLaundryService
} = laundryService;

const {
  getSimplyProductsByOutlet
} = productService;

export const GET_POPUP_SUCCESS = "GET_POPUP_SUCCESS";
export const GET_POPUP_LOADING = "GET_POPUP_LOADING";
export const GET_POPUP_FAILURE = "GET_POPUP_FAILURE";

export function receiveData(payload) {
  return {
    type: GET_POPUP_SUCCESS,
    payload,
  };
}

export function loadingData() {
  return {
    type: GET_POPUP_LOADING,
  };
}

export function failedData(error) {
  return {
    type: GET_POPUP_FAILURE,
    error,
  };
}

// thunk untuk getAllLaundryPopup
export function getAllLaundryPopup() {
  return async (dispatch) => {
    dispatch(loadingData());
    try {
      const data = await getAllLaundryService();
      dispatch(receiveData(data));
    } catch (error) {
      dispatch(failedData(error.message || "Gagal mengambil data layanan"));
    }
  };
}

// thunk baru untuk getSimplyProductsByOutlet
export function getSimplyProductsByOutletThunk(outletId) {
  return async (dispatch) => {
    dispatch(loadingData());
    try {
      const products = await getSimplyProductsByOutlet(outletId);
      console.log(`produk : ${JSON.stringify(products)}`);
      dispatch(receiveData(products));
    } catch (error) {
      dispatch(failedData(error.message || "Gagal mengambil produk outlet"));
    }
  };
}
