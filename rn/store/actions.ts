import { SetUserAction, SetIsLoggedInAction, SetIsLoggingInAction, ResetUserAction, SET_USER, SET_IS_LOGGED_IN, SET_IS_LOGGING_IN, RESET_USER } from './types';

// Action Creators
export const setUser = (user: { name: string }): SetUserAction => ({
    type: SET_USER,
    payload: user,
});

export const setIsLoggedIn = (flag: boolean): SetIsLoggedInAction => ({
    type: SET_IS_LOGGED_IN,
    payload: flag,
});

export const setIsLoggingIn = (flag: boolean): SetIsLoggingInAction => ({
    type: SET_IS_LOGGING_IN,
    payload: flag,
});

export const resetUser = (): ResetUserAction => ({
    type: RESET_USER,
});
