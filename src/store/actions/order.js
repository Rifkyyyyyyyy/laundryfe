import orderService from "../../service/order/orderService";

const {
  getOrderByOutletService,
  getAllOrder ,
  createOrderService,
  calculateTotalOrderService,
} = orderService;

// Action types
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_LOADING = "GET_ORDER_LOADING";
export const GET_ORDER_FAILURE = "GET_ORDER_FAILURE";

export const CREATE_ORDER_SUCCESS = "CREATE_ORDER_SUCCESS";
export const CREATE_ORDER_LOADING = "CREATE_ORDER_LOADING";
export const CREATE_ORDER_FAILURE = "CREATE_ORDER_FAILURE";



// Action creators
export const getOrderSuccess = (orders) => ({
  type: GET_ORDER_SUCCESS,
  payload: orders,
});

export const getOrderLoading = () => ({ type: GET_ORDER_LOADING });

export const getOrderFailure = (error) => ({
  type: GET_ORDER_FAILURE,
  payload: error,
});

export const createOrderSuccess = (order) => ({
  type: CREATE_ORDER_SUCCESS,
  payload: order,
});

export const createOrderLoading = () => ({ type: CREATE_ORDER_LOADING });

export const createOrderFailure = (error) => ({
  type: CREATE_ORDER_FAILURE,
  payload: error,
});


// Thunks
export function fetchOrderByOutletId(page, limit, outletId) {
  return async (dispatch) => {
    dispatch(getOrderLoading());

    try {
      const data = await getOrderByOutletService(page, limit, outletId);
      await new Promise((resolve) => setTimeout(resolve, 500));
      dispatch(getOrderSuccess(data));
    } catch (error) {
      dispatch(getOrderFailure(error.message || "Gagal mengambil data order"));
    }
  };
}

export function fetchOrder(page, limit) {
  return async (dispatch) => {
    dispatch(getOrderLoading());

    try {
      const data = await getAllOrder(page, limit);
      await new Promise((resolve) => setTimeout(resolve, 500));
      dispatch(getOrderSuccess(data));
    } catch (error) {
      dispatch(getOrderFailure(error.message || "Gagal mengambil data order"));
    }
  };
}

export function createOrder({
  processedBy,
  customerName,
  customerPhone,
  customerEmail,
  outletId,
  items,
  pickupDate,
  note,
  serviceType = 'regular',
  memberCode,
}) {
  return async (dispatch) => {
    dispatch(createOrderLoading());

    try {
      const data = await createOrderService({
        processedBy,
        customerName,
        customerPhone,
        customerEmail,
        outletId,
        items,
        pickupDate,
        note,
        paymentType: 'cash',
        serviceType,
        memberCode,
      });
      dispatch(createOrderSuccess(data));
    } catch (error) {
      dispatch(createOrderFailure(error.message || "Gagal membuat order"));
    }
  };
}



