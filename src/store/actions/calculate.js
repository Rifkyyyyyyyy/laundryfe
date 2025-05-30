import orderService from "../../service/order/orderService";

const {
  calculateTotalOrderService,
} = orderService;




export const CALCULATE_ORDER_SUCCESS = "CALCULATE_ORDER_SUCCESS";
export const CALCULATE_ORDER_LOADING = "CALCULATE_ORDER_LOADING";
export const CALCULATE_ORDER_FAILURE = "CALCULATE_ORDER_FAILURE";

export const calculateOrderSuccess = (totalData) => ({
    type: CALCULATE_ORDER_SUCCESS,
    payload: totalData,
  });
  
  export const calculateOrderLoading = () => ({ type: CALCULATE_ORDER_LOADING });
  
  export const calculateOrderFailure = (error) => ({
    type: CALCULATE_ORDER_FAILURE,
    payload: error,
  });

  
  // ⚠️ calculateOrder expects an object with keys: items, serviceType, memberLevel
export function calculateOrder({ items, serviceType = "regular", memberLevel = null }) {
    return async (dispatch) => {
      dispatch(calculateOrderLoading());
  
      try {
        const result = await calculateTotalOrderService({ items, serviceType, memberLevel });
        dispatch(calculateOrderSuccess(result));
      } catch (error) {
        dispatch(calculateOrderFailure(error.message || "Gagal menghitung total order"));
      }
    };
  }
  