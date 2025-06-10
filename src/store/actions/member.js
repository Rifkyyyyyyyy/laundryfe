import memberService from "../../service/member/memberService";

const {
    getMemberByOutletId,
    searchMemberByOutletId,
    createMember,
    getAllMember ,
    searchMembers ,
    updateMember
} = memberService;

export const GET_MEMBER_SUCCESS = "GET_MEMBER_SUCCESS";
export const GET_MEMBER_LOADING = "GET_MEMBER_LOADING";
export const GET_MEMBER_FAILURE = "GET_MEMBER_FAILURE";
export const CREATE_MEMBER_SUCCESS = "CREATE_MEMBER_SUCCESS";
export const CREATE_MEMBER_LOADING = "CREATE_MEMBER_LOADING";
export const CREATE_MEMBER_FAILURE = "CREATE_MEMBER_FAILURE";
export const UPDATE_MEMBER_SUCCESS = "UPDATE_MEMBER_SUCCESS";
export const UPDATE_MEMBER_LOADING = "UPDATE_MEMBER_LOADING";
export const UPDATE_MEMBER_FAILURE = "UPDATE_MEMBER_FAILURE";
export const DELETE_MEMBER_SUCCESS = "DELETE_MEMBER_SUCCESS";
export const DELETE_MEMBER_LOADING = "DELETE_MEMBER_LOADING";
export const DELETE_MEMBER_FAILURE = "DELETE_MEMBER_FAILURE";

// Get Member Actions
export function receiveData(payload) {
    return { type: GET_MEMBER_SUCCESS, payload };
}

export function loadingData() {
    return { type: GET_MEMBER_LOADING };
}

export function failedData(error) {
    return { type: GET_MEMBER_FAILURE, error };
}

// Create Member Actions
export function createMemberSuccess(payload) {
    return { type: CREATE_MEMBER_SUCCESS, payload };
}

export function createMemberLoading() {
    return { type: CREATE_MEMBER_LOADING };
}

export function createMemberFailure(error) {
    return { type: CREATE_MEMBER_FAILURE, error };
}


export function updateMemberSuccess(payload) {
    return { type: UPDATE_MEMBER_SUCCESS, payload };
  }
  
  export function updateMemberLoading() {
    return { type: UPDATE_MEMBER_LOADING };
  }
  
  export function updateMemberFailure(error) {
    return { type: UPDATE_MEMBER_FAILURE, error };
  }
  

// Thunk for Fetching Member by Outlet ID
export function fetchMemberByOutletId(page, limit, outletId) {
    return async (dispatch) => {
        dispatch(loadingData());
        try {
            const data = await getMemberByOutletId(page, limit, outletId);
            await new Promise(resolve => setTimeout(resolve, 500));
            dispatch(receiveData(data));
        } catch (error) {
            dispatch(failedData(error.message || "Gagal mengambil data member"));
        }
    };
}

export function fetchAllMember(page, limit) {
    return async (dispatch) => {
        dispatch(loadingData());
        try {
            const data = await getAllMember(page, limit);
            await new Promise(resolve => setTimeout(resolve, 500));
            dispatch(receiveData(data));
        } catch (error) {
            dispatch(failedData(error.message || "Gagal mengambil data member"));
        }
    };
}


// Thunk for Searching Member
export function searchMember(searchTerm, page, limit, outletId) {
    return async (dispatch) => {
        dispatch(loadingData());
        try {
            const data = await searchMemberByOutletId(searchTerm, page, limit, outletId);
            await new Promise(resolve => setTimeout(resolve, 300));
            dispatch(receiveData(data));
        } catch (error) {
            dispatch(failedData(error.message || "Gagal mencari data member"));
        }
    };
}

export function searchAllMember(searchTerm, page, limit) {
    return async (dispatch) => {
        dispatch(loadingData());
        try {
            const data = await searchMembers(searchTerm , page , limit)
            await new Promise(resolve => setTimeout(resolve, 300));
            dispatch(receiveData(data));
        } catch (error) {
            dispatch(failedData(error.message || "Gagal mencari data member"));
        }
    };
}

// Thunk for Creating Member
export function onCreateMember(userId, outletId, membershipLevel, membershipDuration) {
    return async (dispatch) => {
        dispatch(createMemberLoading());
        try {
            const data = await createMember(userId, outletId, membershipLevel, membershipDuration);
            // delay supaya loading animasi keliatan
            await new Promise(resolve => setTimeout(resolve, 300));
            dispatch(createMemberSuccess(data));
        } catch (error) {
            dispatch(createMemberFailure(error.message || "Gagal membuat member"));
        }
    };
}

export function onUpdateMember(id ,membershipLevel, membershipDuration ) {
    return async (dispatch) => {
       dispatch(updateMemberLoading())
       try {
        const data = await updateMember(id , membershipLevel , membershipDuration)
        // delay supaya loading animasi keliatan
        await new Promise(resolve => setTimeout(resolve, 300));
        dispatch(updateMemberSuccess(data));
       } catch (error) {
        dispatch(updateMemberFailure(error.message || "Gagal update member"));
       }
    }
}