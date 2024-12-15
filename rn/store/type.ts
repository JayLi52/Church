// 定义全局状态类型
export interface GlobalState {
    user: {
        name: string;
    };
    isLoggedIn: boolean;
    isLogIning: boolean;
}

// 初始状态
export const initialState: GlobalState = {
    user: {
        name: '未命名',
    },
    isLoggedIn: true,
    isLogIning: false,
};

// Action 类型常量
export const SET_USER = 'SET_USER';
export const SET_IS_LOGGED_IN = 'SET_IS_LOGGED_IN';
export const SET_IS_LOGGING_IN = 'SET_IS_LOGGING_IN';
export const RESET_USER = 'RESET_USER';

// 定义具体的 Action 接口
export interface SetUserAction {
    type: typeof SET_USER;
    payload: { name: string };
}

export interface SetIsLoggedInAction {
    type: typeof SET_IS_LOGGED_IN;
    payload: boolean;
}

export interface SetIsLoggingInAction {
    type: typeof SET_IS_LOGGING_IN;
    payload: boolean;
}

export interface ResetUserAction {
    type: typeof RESET_USER;
}

// 合并所有可能的 Action 类型
export type GlobalAction =
    | SetUserAction
    | SetIsLoggedInAction
    | SetIsLoggingInAction
    | ResetUserAction;
