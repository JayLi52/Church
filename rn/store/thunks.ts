import { Dispatch } from 'redux';
import { GlobalState } from './types';
import { setUser, setIsLoggedIn, setIsLoggingIn } from './actions';
import { GetUserInfo } from '@services/BaseService';

// 模拟服务端验证逻辑
const verifyCodeWithServer = async (code: string): Promise<boolean> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(code === '12345'); // 假设验证码是12345
        }, 1000);
    });
};

// 异步 Action: 验证验证码
export const checkCode = (code: string) => async (dispatch: Dispatch) => {
    dispatch(setIsLoggingIn(true));
    try {
        const flag = await verifyCodeWithServer(code);
        dispatch(setIsLoggedIn(flag));
        return flag
    } catch (error) {
        console.error('checkCode error', error);
    } finally {
        dispatch(setIsLoggingIn(false));
    }
};

// 异步 Action: 初始化用户信息
export const initUser = () => async (dispatch: Dispatch, getState: () => GlobalState) => {
    try {
        const res = await GetUserInfo({});
        dispatch(setUser({ name: res.user?.nickName || '未登录' }));
    } catch (error) {
        console.error('initUser error', error);
    }
};
