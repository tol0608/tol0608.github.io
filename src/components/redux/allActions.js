// 액션 타입 정의
export const SET_USER = "SET_USER";
export const SET_AUTH = "SET_AUTH";
export const SET_LOADING = "SET_LOADING";
// 액션 생성자 함수
export const setUser = (user) => ({
    type: SET_USER,
    payload: user,
});
export const setAuth = (isAuthenticated) => ({
    type: SET_AUTH,
    payload: isAuthenticated,
});
export const setLoading = (isLoading) => ({
    type: SET_LOADING,
    payload: isLoading,
});
