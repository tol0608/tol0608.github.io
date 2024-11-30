// 액션 타입 정의
export const SET_USER = "SET_USER";
export const SET_AUTH = "SET_AUTH";
export const SET_LOADING = "SET_LOADING";

// 액션 생성자 함수들
export interface UserType {
  id: string;
  name: string;
  email: string;
}

interface SetUserAction {
  type: typeof SET_USER;
  payload: UserType | null;
}

interface SetAuthAction {
  type: typeof SET_AUTH;
  payload: boolean;
}

interface SetLoadingAction {
  type: typeof SET_LOADING;
  payload: boolean;
}

// 액션 생성자 함수
export const setUser = (user: UserType | null): SetUserAction => ({
  type: SET_USER,
  payload: user,
});

export const setAuth = (isAuthenticated: boolean): SetAuthAction => ({
  type: SET_AUTH,
  payload: isAuthenticated,
});

export const setLoading = (isLoading: boolean): SetLoadingAction => ({
  type: SET_LOADING,
  payload: isLoading,
});

// 액션 타입들을 하나의 유니온 타입으로 정의
export type ActionTypes = SetUserAction | SetAuthAction | SetLoadingAction;
