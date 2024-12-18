import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PageState {
    pageType: 'personal' | 'church'; // 页面类型
    data: Record<string, any>;       // 页面数据（如统计、标题等）
}

const initialState: PageState = {
    pageType: 'church', // 默认显示教会页面
    data: {},
};

const pageSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        setPageType: (state, action: PayloadAction<'personal' | 'church'>) => {
            state.pageType = action.payload;
        },
        setPageData: (state, action: PayloadAction<Record<string, any>>) => {
            state.data = action.payload;
        },
    },
});

export const { setPageType, setPageData } = pageSlice.actions;

export default pageSlice.reducer;
