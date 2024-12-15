import { configureStore } from '@reduxjs/toolkit';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { globalReducer } from './globalReducer';
import { GlobalState, GlobalAction } from './type';

// 配置 Store
const store = configureStore({
    reducer: globalReducer,
    middleware: [thunk], // 添加 Thunk 中间件
});

// 定义自定义类型
export type AppDispatch = ThunkDispatch<GlobalState, void, GlobalAction>; // 自定义 dispatch 类型
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, GlobalState, unknown, GlobalAction>; // 自定义 Thunk 类型

export default store;
