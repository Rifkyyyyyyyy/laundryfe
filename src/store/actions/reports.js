import reportsService from "../../service/reports/reportsService";

const {
    getReportsByOutlet,
    getAllReports,
    answerReports,
    markAsDoneReports,
    createReports

} = reportsService;

// Constants
export const CREATE_REPORTS_SUCCESS = "CREATE_REPORTS_SUCCESS";
export const CREATE_REPORTS_LOADING = "CREATE_REPORTS_LOADING";
export const CREATE_REPORTS_FAILURE = "CREATE_REPORTS_FAILURE";

export const GET_REPORTS_SUCCESS = "GET_REPORTS_SUCCESS";
export const GET_REPORTS_LOADING = "GET_REPORTS_LOADING";
export const GET_REPORTS_FAILURE = "GET_REPORTS_FAILURE";

export const ANSWER_REPORTS_SUCCESS = "ANSWER_REPORTS_SUCCESS";
export const ANSWER_REPORTS_LOADING = "ANSWER_REPORTS_LOADING";
export const ANSWER_REPORTS_FAILURE = "ANSWER_REPORTS_FAILURE";

export const MARK_REPORTS_SUCCESS = "MARK_REPORTS_SUCCESS";
export const MARK_REPORTS_LOADING = "MARK_REPORTS_LOADING";
export const MARK_REPORTS_FAILURE = "MARK_REPORTS_FAILURE";

// Action Creators - Get Reports
export function receiveData(payload) {
    return {
        type: GET_REPORTS_SUCCESS,
        payload
    };
}

export function loadingData() {
    return {
        type: GET_REPORTS_LOADING
    };
}

export function failedData(error) {
    return {
        type: GET_REPORTS_FAILURE,
        error
    };
}

// Action Creators - Answer Reports
export function receiveAnswer(payload) {
    return {
        type: ANSWER_REPORTS_SUCCESS,
        payload
    };
}

export function loadingAnswer() {
    return {
        type: ANSWER_REPORTS_LOADING
    };
}

export function errorAnswer(error) {
    return {
        type: ANSWER_REPORTS_FAILURE,
        error
    };
}

// Action Creators - Mark as Resolved
export function markReportSuccess(payload) {
    return {
        type: MARK_REPORTS_SUCCESS,
        payload
    };
}

export function markReportLoading() {
    return {
        type: MARK_REPORTS_LOADING
    };
}

export function markReportFailure(error) {
    return {
        type: MARK_REPORTS_FAILURE,
        error
    };
}

export function createReceiveData(payload) {
    return {
        type: GET_REPORTS_SUCCESS,
        payload
    };
}

export function createLoadingData() {
    return {
        type: GET_REPORTS_LOADING
    };
}

export function createFailedData(error) {
    return {
        type: GET_REPORTS_FAILURE,
        error
    };
}


// Thunk - Create Report
export function onCreateReports(payload) {
    return async (dispatch) => {
        dispatch(createLoadingData());
        try {

            const data = await reportsService.createReports(payload);
            await new Promise(resolve => setTimeout(resolve, 500));

            dispatch(createReceiveData(data));
        } catch (error) {
            dispatch(createFailedData(error.message || "Gagal membuat laporan"));
        }
    };
}



// Thunk - Get Reports by Outlet
export function getAllReportsByOutlet(page, limit, outletId) {
    return async (dispatch) => {
        dispatch(loadingData());
        try {
            const data = await getReportsByOutlet(page, limit, outletId);
            await new Promise(resolve => setTimeout(resolve, 500));
            dispatch(receiveData(data));
        } catch (error) {
            dispatch(failedData(error.message || "Gagal mengambil data tugas"));
        }
    };
}

// Thunk - Get All Reports
export function fetchAllReports(page, limit) {
    return async (dispatch) => {
        dispatch(loadingData());
        try {
            const data = await getAllReports(page, limit);
            await new Promise(resolve => setTimeout(resolve, 500));
            dispatch(receiveData(data));
        } catch (error) {
            dispatch(failedData(error.message || "Gagal mengambil data tugas"));
        }
    };
}

// Thunk - Answer Report
export function onAnswerReports(reportId, ownerId, message) {
    return async (dispatch) => {
        dispatch(loadingAnswer());
        try {
            const data = await answerReports(reportId, ownerId, message);
            await new Promise(resolve => setTimeout(resolve, 500));
            dispatch(receiveAnswer(data));
        } catch (error) {
            dispatch(errorAnswer(error.message || "Gagal membalas laporan"));
        }
    };
}

// Thunk - Mark Report as Resolved
export function onMarkReportAsResolved(reportId) {
    return async (dispatch) => {
        dispatch(markReportLoading());
        try {
            const data = await markAsDoneReports(reportId);
            await new Promise(resolve => setTimeout(resolve, 500));
            dispatch(markReportSuccess(data));
        } catch (error) {
            dispatch(markReportFailure(error.message || "Gagal menyelesaikan laporan"));
        }
    };
}
