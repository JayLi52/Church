import { createSlice } from '@reduxjs/toolkit';

export const tabSlice = createSlice({
    name: 'tab',
    initialState: {
        isVisible: true, // 初始状态为显示
    },
    reducers: {
        showTabBar: (state) => {
            state.isVisible = true; // 显示 TabBar
        },
        hideTabBar: (state) => {
            state.isVisible = false; // 隐藏 TabBar
        },
    },
});

export const { showTabBar, hideTabBar } = tabSlice.actions;

export default tabSlice.reducer;