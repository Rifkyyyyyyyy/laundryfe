import outletService from "../../service/outlet/outletService";

const {
  getAllOutlet ,
  createOutlets
} = outletService;

export const GET_OUTLET_SUCCESS = "GET_OUTLET_SUCCESS";
export const GET_OUTLET_LOADING = "GET_OUTLET_LOADING";
export const GET_OUTLET_FAILURE = "GET_OUTLET_FAILURE";
export const CREATE_OUTLET_SUCCESS = "CREATE_OUTLET_SUCCESS";
export const CREATE_OUTLET_LOADING = "CREATE_OUTLET_LOADING";
export const CREATE_OUTLET_FAILURE = "CREATE_OUTLET_FAILURE";


export function receiveOutletData(payload) {
  return {
    type: GET_OUTLET_SUCCESS,
    payload
  };
}

export function loadingOutletData() {
  return {
    type: GET_OUTLET_LOADING
  };
}

export function failedOutletData(error) {
  return {
    type: GET_OUTLET_FAILURE,
    error
  };
}

export function createOutletSuccess(payload) {
  return {
    type: CREATE_OUTLET_SUCCESS,
    payload
  };
}

export function createOutletLoading() {
  return {
    type: CREATE_OUTLET_LOADING
  };
}

export function createOutletFailure(error) {
  return {
    type: CREATE_OUTLET_FAILURE,
    error
  };
}



export function fetchOutlets(page, limit) {
  return async (dispatch) => {
    dispatch(loadingOutletData());

    try {
      const data = await getAllOutlet(page, limit);

      // Tambahkan delay 500ms
      await new Promise(resolve => setTimeout(resolve, 500));

      dispatch(receiveOutletData(data));
    } catch (error) {
      dispatch(failedOutletData(error.message || "Gagal mengambil data outlet"));
    }
  };
}


export function createOutlet(data) {
  return async (dispatch) => {
    dispatch(createOutletLoading());

    try {
      const response = await createOutlets(data);

      // Tambahkan delay 500ms
      await new Promise(resolve => setTimeout(resolve, 500));

      dispatch(createOutletSuccess(response));
    } catch (error) {
      dispatch(createOutletFailure(error.message || "Gagal membuat outlet"));
    }
  };
}
