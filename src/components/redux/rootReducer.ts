import { combineReducers } from "redux";
import {
  ActionTypes,
  SET_USER,
  SET_AUTH,
  SET_LOADING,
  UserType,
} from "./allActions";

// 각 상태의 인터페이스 정의
interface UserState {
  currentUser: UserType | null;
}

interface AuthState {
  isAuthenticated: boolean;
}

interface LoadingState {
  isLoading: boolean;
}

// 초기 상태 정의
const initialUserState: UserState = {
  currentUser: null,
};

const initialAuthState: AuthState = {
  isAuthenticated: false,
};

const initialLoadingState: LoadingState = {
  isLoading: false,
};

// 리듀서 함수들
const userReducer = (
  state = initialUserState,
  action: ActionTypes
): UserState => {
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

const authReducer = (
  state = initialAuthState,
  action: ActionTypes
): AuthState => {
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

const loadingReducer = (
  state = initialLoadingState,
  action: ActionTypes
): LoadingState => {
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

// 루트 스테이트 타입 추출
export type RootState = ReturnType<typeof rootReducer>;
