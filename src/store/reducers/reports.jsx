import {
    GET_REPORTS_FAILURE,
    GET_REPORTS_LOADING,
    GET_REPORTS_SUCCESS,
    ANSWER_REPORTS_LOADING,
    ANSWER_REPORTS_FAILURE,
    ANSWER_REPORTS_SUCCESS,
    MARK_REPORTS_LOADING,
    MARK_REPORTS_SUCCESS,
    MARK_REPORTS_FAILURE,
    CREATE_REPORTS_LOADING,
    CREATE_REPORTS_SUCCESS,
    CREATE_REPORTS_FAILURE
} from '../actions/reports';

const initialState = {
    data: {}, 
    loading: false,
    error: null,
    hasFetching: false
};

export default function reports(state = initialState, action) {
    switch (action.type) {
        // Loading states
        case GET_REPORTS_LOADING:
        case ANSWER_REPORTS_LOADING:
        case MARK_REPORTS_LOADING:
        case CREATE_REPORTS_LOADING:
            return {
                ...state,
                loading: true,
                error: null
            };

        // Success fetch reports
        case GET_REPORTS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                hasFetching: true
            };

        // Success create report
        case CREATE_REPORTS_SUCCESS: {
            const newReport = action.payload;

            const updatedList = state.data?.data ? [newReport, ...state.data.data] : [newReport];

            return {
                ...state,
                loading: false,
                data: {
                    ...state.data,
                    data: updatedList
                }
            };
        }

        // Failed states
        case GET_REPORTS_FAILURE:
        case ANSWER_REPORTS_FAILURE:
        case MARK_REPORTS_FAILURE:
        case CREATE_REPORTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
                hasFetching: false
            };

        // Success answer report
        case ANSWER_REPORTS_SUCCESS: {
            const updatedReport = action.payload;
            const updatedData = {
                ...state.data,
                data: state.data.data.map(report =>
                    report._id === updatedReport._id ? updatedReport : report
                )
            };

            return {
                ...state,
                loading: false,
                data: updatedData
            };
        }

        // Success mark as done
        case MARK_REPORTS_SUCCESS: {
            const resolvedReport = action.payload;
            const updatedData = {
                ...state.data,
                data: state.data.data.map(report =>
                    report._id === resolvedReport._id ? resolvedReport : report
                )
            };

            return {
                ...state,
                loading: false,
                data: updatedData
            };
        }

        default:
            return state;
    }
}
