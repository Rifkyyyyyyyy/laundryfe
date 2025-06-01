import laundryService from "../../service/laundryService/laundryService";
import productService from "../../service/product/productService";
import outletService from "../../service/outlet/outletService";


export const GET_POPUP_SUCCESS = "GET_POPUP_SUCCESS";
export const GET_POPUP_LOADING = "GET_POPUP_LOADING";
export const GET_POPUP_FAILURE = "GET_POPUP_FAILURE";


export function receiveData(payload, dataType) {
  return {
    type: GET_POPUP_SUCCESS,
    payload,
    dataType,   // tipe data: 'laundry', 'products', 'outlets'
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
      const data = await laundryService.getAllLaundryService();
      dispatch(receiveData(data, "service"));
    } catch (error) {
      dispatch(failedData(error.message || "Gagal mengambil data layanan"));
    }
  };
}

// thunk untuk getSimplyProductsByOutlet
export function getSimplyProductsByOutletThunk(outletId) {
  return async (dispatch) => {
    dispatch(loadingData());
    try {
      const products = await productService.getSimplyProductsByOutlet(outletId);
      console.log(`produk : ${JSON.stringify(products)}`);
      dispatch(receiveData(products, "products"));
    } catch (error) {
      dispatch(failedData(error.message || "Gagal mengambil produk outlet"));
    }
  };
}

export function getSimplyProducts() {
  return async (dispatch) => {
    dispatch(loadingData());
    try {
      const products = await productService.getSimplyProducts();
      console.log(`produk : ${JSON.stringify(products)}`);
      dispatch(receiveData(products, "products"));
    } catch (error) {
      dispatch(failedData(error.message || "Gagal mengambil produk outlet"));
    }
  };
}

// thunk untuk getAllListOutlets
export function getAllListOutlets() {
  return async (dispatch) => {
    dispatch(loadingData());
    try {
      const outlet = await outletService.getListOutletsName();
      console.log(`outlet : ${JSON.stringify(outlet)}`);
      dispatch(receiveData(outlet, "outlets"));
    } catch (error) {
      dispatch(failedData(error.message || "Gagal mengambil data outlet"));
    }
  };
}
