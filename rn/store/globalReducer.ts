import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { GetUserInfo } from '@services/BaseService';

// 模拟服务端验证逻辑
const verifyCodeWithServer = async (code: string): Promise<boolean> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(code === '12345'); // 假设验证码是12345
        }, 1000);
    });
};

// 异步 Thunk: 验证验证码
export const checkCode = createAsyncThunk<boolean, string>(
    'global/checkCode',
    async (code, { dispatch }) => {
        dispatch(setIsLoggingIn(true));
        try {
            const flag = await verifyCodeWithServer(code);
            dispatch(setIsLoggedIn(flag));
            return flag;
        } catch (error) {
            console.error('checkCode error', error);
            throw error; // 抛出错误供调用者处理
        } finally {
            dispatch(setIsLoggingIn(false));
        }
    }
);

// 异步 Thunk: 初始化用户信息
export const initUser = createAsyncThunk<void, void>(
    'global/initUser',
    async (_, { dispatch }) => {
        try {
            const res = await GetUserInfo({});
            dispatch(setUser({ name: res.user?.nickName || '未登录', avatar: res.user?.avatar || '', role: res.user?.role || 'leader' }));
        } catch (error) {
            console.error('initUser error', error);
            throw error; // 抛出错误供调用者处理
        }
    }
);

// 初始化状态
const initialState = {
    user: {
        name: 'testx',
        avatar: 'http://gips3.baidu.com/it/u=3892227616,2240763844&fm=3028&app=3028&f=JPEG&fmt=auto?w=3200&h=3200',
        role: 'member',
    },
    isLoggedIn: true,
    isLogIning: false,
    isPersonalPage: false,
    showPlayer: true,
    isPlaying: false,
};

const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<{ name: string; avatar: string; role: string }>) {
            state.user = action.payload;
        },
        setIsLoggedIn(state, action: PayloadAction<boolean>) {
            state.isLoggedIn = action.payload;
        },
        setIsLoggingIn(state, action: PayloadAction<boolean>) {
            state.isLogIning = action.payload;
        },
        resetUser(state) {
            state.user = { 
                name: '未命名',
                avatar: 'http://gips3.baidu.com/it/u=3892227616,2240763844&fm=3028&app=3028&f=JPEG&fmt=auto?w=3200&h=3200',
                role: 'leader',
            };
        },
        setShowPlayer(state, action: PayloadAction<boolean>) {
            state.showPlayer = action.payload;
        },
        setIsPlaying(state, action: PayloadAction<boolean>) {
            state.isPlaying = action.payload;
        },
    },
});

// 定义 GlobalState 接口
export interface GlobalState {
    user: {
        name: string;
    };
    isLoggedIn: boolean;
    isLogIning: boolean;
    isPersonalPage: boolean;
    showPlayer: boolean;
    isPlaying: boolean;
}

// 导出 Actions 和 Reducer
export const { setUser, setIsLoggedIn, setIsLoggingIn, resetUser, setShowPlayer, setIsPlaying } = globalSlice.actions;
export const globalReducer = globalSlice.reducer;
