import { combineReducers } from "redux";
import { SET_USER, SET_AUTH, SET_LOADING, } from "./allActions";
// 초기 상태 정의
const initialUserState = {
    currentUser: null,
};
const initialAuthState = {
    isAuthenticated: false,
};
const initialLoadingState = {
    isLoading: false,
};
// 리듀서 함수들
const userReducer = (state = initialUserState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                currentUser: action.payload,
            };
        default:
            return state;
    }
};
const authReducer = (state = initialAuthState, action) => {
    switch (action.type) {
        case SET_AUTH:
            return {
                ...state,
                isAuthenticated: action.payload,
            };
        default:
            return state;
    }
};
const loadingReducer = (state = initialLoadingState, action) => {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            };
        default:
            return state;
    }
};
// 루트 리듀서 생성
const rootReducer = combineReducers({
    user: userReducer,
    auth: authReducer,
    loading: loadingReducer,
});
export default rootReducer;
