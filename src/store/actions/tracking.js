import trackingService from "../../service/tracking/trackingService";

const {
    getTrackingByOutlet,
    updateTracking
} = trackingService;

export const GET_TRACKING_SUCCESS = "GET_TRACKING_SUCCESS";
export const GET_TRACKING_LOADING = "GET_TRACKING_LOADING";
export const GET_TRACKING_FAILURE = "GET_TRACKING_FAILURE";

export const UPDATE_TRACKING_SUCCESS = "UPDATE_TRACKING_SUCCESS";
export const UPDATE_TRACKING_LOADING = "UPDATE_TRACKING_LOADING";
export const UPDATE_TRACKING_FAILURE = "UPDATE_TRACKING_FAILURE";

export function updateTrackingSuccess(message) {
    return {
        type: UPDATE_TRACKING_SUCCESS,
        message,
    };
}

export function updateTrackingLoading() {
    return {
        type: UPDATE_TRACKING_LOADING,
    };
}

export function updateTrackingFailure(error) {
    return {
        type: UPDATE_TRACKING_FAILURE,
        error,
    };
}


export function receiveData(payload) {
    return {
        type: GET_TRACKING_SUCCESS,
        payload
    };
}

export function loadingData() {
    return {
        type: GET_TRACKING_LOADING
    };
}

export function failedData(error) {
    return {
        type: GET_TRACKING_FAILURE,
        error
    };
}




export function getAllTracking(page, limit, outletId) {
    return async (dispatch) => {
        dispatch(loadingData());
        try {
            const data = await getTrackingByOutlet(page, limit, outletId)

            console.log(`data tracking yang masuk: ${JSON.stringify(data)}`);
            await new Promise(resolve => setTimeout(resolve, 500));

            dispatch(receiveData(data));
        } catch (error) {
            dispatch(failedData(error.message || "Gagal mengambil data tracking"));
        }
    }
}



export function updateTrackingById(trackingId, status) {
    return async (dispatch) => {
        dispatch(updateTrackingLoading());
        try {
            const message = await updateTracking(trackingId, status);
            dispatch(updateTrackingSuccess(message));
        } catch (error) {
            dispatch(updateTrackingFailure(error.message || "Gagal memperbarui status tracking"));
        }
    };
}
