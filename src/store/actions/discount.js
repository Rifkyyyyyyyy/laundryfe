import discountService from "../../service/discount/discountService";


const {
    getAllDiscountByOutletService,
    getAllDiscountService,
    createDiscountService,
} = discountService;


// Discount Action Types
export const FETCH_DISCOUNTS_REQUEST = 'FETCH_DISCOUNTS_REQUEST';
export const FETCH_DISCOUNTS_SUCCESS = 'FETCH_DISCOUNTS_SUCCESS';
export const FETCH_DISCOUNTS_FAILURE = 'FETCH_DISCOUNTS_FAILURE';


export const CREATE_DISCOUNT_REQUEST = 'CREATE_DISCOUNT_REQUEST';
export const CREATE_DISCOUNT_SUCCESS = 'CREATE_DISCOUNT_SUCCESS';
export const CREATE_DISCOUNT_FAILURE = 'CREATE_DISCOUNT_FAILURE';

export const UPDATE_DISCOUNT_REQUEST = 'UPDATE_DISCOUNT_REQUEST';
export const UPDATE_DISCOUNT_SUCCESS = 'UPDATE_DISCOUNT_SUCCESS';
export const UPDATE_DISCOUNT_FAILURE = 'UPDATE_DISCOUNT_FAILURE';

export const DELETE_DISCOUNT_REQUEST = 'DELETE_DISCOUNT_REQUEST';
export const DELETE_DISCOUNT_SUCCESS = 'DELETE_DISCOUNT_SUCCESS';
export const DELETE_DISCOUNT_FAILURE = 'DELETE_DISCOUNT_FAILURE';


// Fetch All
export const fetchDiscountsRequest = () => ({
    type: FETCH_DISCOUNTS_REQUEST
});

export const fetchDiscountsSuccess = (payload) => ({
    type: FETCH_DISCOUNTS_SUCCESS,
    payload
});

export const fetchDiscountsFailure = (error) => ({
    type: FETCH_DISCOUNTS_FAILURE,
    error
});


// Create
export const createDiscountRequest = (data) => ({
    type: CREATE_DISCOUNT_REQUEST,
    data
});

export const createDiscountSuccess = (payload) => ({
    type: CREATE_DISCOUNT_SUCCESS,
    payload
});

export const createDiscountFailure = (error) => ({
    type: CREATE_DISCOUNT_FAILURE,
    error
});

// Update
export const updateDiscountRequest = (data) => ({
    type: UPDATE_DISCOUNT_REQUEST,
    data
});

export const updateDiscountSuccess = (payload) => ({
    type: UPDATE_DISCOUNT_SUCCESS,
    payload
});

export const updateDiscountFailure = (error) => ({
    type: UPDATE_DISCOUNT_FAILURE,
    error
});

// Delete
export const deleteDiscountRequest = (discountId) => ({
    type: DELETE_DISCOUNT_REQUEST,
    discountId
});

export const deleteDiscountSuccess = (payload) => ({
    type: DELETE_DISCOUNT_SUCCESS,
    payload
});

export const deleteDiscountFailure = (error) => ({
    type: DELETE_DISCOUNT_FAILURE,
    error
});



export const fetchAllDiscounts = () => {
    return async (dispatch) => {
        dispatch(fetchDiscountsRequest());
        try {
            const data = await getAllDiscountService();
            console.log(`data dari api : ${JSON.stringify(data)}`);
            dispatch(fetchDiscountsSuccess(data));
        } catch (error) {
            dispatch(fetchDiscountsFailure(error.message || "Gagal mengambil data diskon"));
        }
    };
};


export const fetchAllDiscountsByOutlets = (page, limit, outletId) => {
    return async (dispatch) => {
        dispatch(fetchDiscountsRequest());
        try {
            const data = await getAllDiscountByOutletService(page, limit, outletId);
            console.log(`data dari api : ${JSON.stringify(data)}`);
            dispatch(fetchDiscountsSuccess(data));
        } catch (error) {
            dispatch(fetchDiscountsFailure(error.message || "Gagal mengambil data diskon"));
        }
    };
};



export const createDiscounts = (value) => {
    return async (dispatch) => {
        dispatch(createDiscountRequest());
        try {
            const data = await createDiscountService(value)
            console.log(`data dari api : ${JSON.stringify(data)}`);
            dispatch(createDiscountSuccess(data));
        } catch (error) {
            console.log(`error : ${error}`);
            dispatch(createDiscountFailure(error.message || "Gagal mengambil data diskon"));
        }
    };
};


