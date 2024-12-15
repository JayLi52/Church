import { GlobalState, GlobalAction, initialState, SET_USER, SET_IS_LOGGED_IN, SET_IS_LOGGING_IN, RESET_USER } from './types';

// Reducer 函数
export function globalReducer(
    state: GlobalState = initialState,
    action: GlobalAction
): GlobalState {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload,
            };
        case SET_IS_LOGGED_IN:
            return {
                ...state,
                isLoggedIn: action.payload,
            };
        case SET_IS_LOGGING_IN:
            return {
                ...state,
                isLogIning: action.payload,
            };
        case RESET_USER:
            return {
                ...state,
                user: { name: '未命名' },
            };
        default:
            return state;
    }
}
