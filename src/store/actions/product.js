import productService from "../../service/product/productService";

const {
    getProductsByOutlet,
    createProducts,
    deleteProductsById,
    updateProducts,
    getAllProducts
} = productService;

// Action Types
export const GET_PRODUCT_SUCCESS = "GET_PRODUCT_SUCCESS";
export const GET_PRODUCT_LOADING = "GET_PRODUCT_LOADING";
export const GET_PRODUCT_FAILURE = "GET_PRODUCT_FAILURE";

export const CREATE_PRODUCT_LOADING = "CREATE_PRODUCT_LOADING";
export const CREATE_PRODUCT_SUCCESS = "CREATE_PRODUCT_SUCCESS";
export const CREATE_PRODUCT_FAILURE = "CREATE_PRODUCT_FAILURE";

export const UPDATE_PRODUCT_LOADING = "UPDATE_PRODUCT_LOADING";
export const UPDATE_PRODUCT_SUCCESS = "UPDATE_PRODUCT_SUCCESS";
export const UPDATE_PRODUCT_FAILURE = "UPDATE_PRODUCT_FAILURE";

export const DELETE_PRODUCT_LOADING = "DELETE_PRODUCT_LOADING";
export const DELETE_PRODUCT_SUCCESS = "DELETE_PRODUCT_SUCCESS";
export const DELETE_PRODUCT_FAILURE = "DELETE_PRODUCT_FAILURE";

// Action Creators
export function receiveData(payload) {
    return {
        type: GET_PRODUCT_SUCCESS,
        payload,
    };
}

export function loadingData() {
    return {
        type: GET_PRODUCT_LOADING,
    };
}

export function failedData(error) {
    return {
        type: GET_PRODUCT_FAILURE,
        error,
    };
}

// Fetch Products
export function fetchProductByOutletId(page, limit, outletId) {
    return async (dispatch) => {
        dispatch(loadingData());

        try {
            const data = await getProductsByOutlet(page, limit, outletId);
            await new Promise((resolve) => setTimeout(resolve, 500));



            dispatch(receiveData(data));
        } catch (error) {
            dispatch(failedData(error.message || "Gagal mengambil data produk"));
        }
    };
}

export function fetchAllProduct(page, limit) {
    return async (dispatch) => {
        dispatch(loadingData());

        try {
            const data = await getAllProducts(page, limit, );
            await new Promise((resolve) => setTimeout(resolve, 500));



            dispatch(receiveData(data));
        } catch (error) {
            dispatch(failedData(error.message || "Gagal mengambil data produk"));
        }
    };
}


// Create Product
export function createProduct(data) {
    return async (dispatch) => {
        dispatch({ type: CREATE_PRODUCT_LOADING });

        try {
            const response = await createProducts(data);
            console.log(`data produk yang diterima : ${JSON.stringify(response)}`);
            dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: response });
        } catch (error) {
            dispatch({
                type: CREATE_PRODUCT_FAILURE,
                error: error.message || "Gagal menambahkan produk",
            });
        }
    };
}

// Update Product
export function updateProduct(id, payload) {
    return async (dispatch) => {
        dispatch({ type: UPDATE_PRODUCT_LOADING });

        try {
            const response = await updateProducts(id, payload);
            dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: response });
        } catch (error) {
            dispatch({
                type: UPDATE_PRODUCT_FAILURE,
                error: error.message || "Gagal memperbarui produk",
            });
        }
    };
}

// Delete Product
export function deleteProduct(id) {
    return async (dispatch) => {
        dispatch({ type: DELETE_PRODUCT_LOADING });

        try {
            await deleteProductsById(id);
            dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: id });
        } catch (error) {
            dispatch({
                type: DELETE_PRODUCT_FAILURE,
                error: error.message || "Gagal menghapus produk",
            });
        }
    };
}
