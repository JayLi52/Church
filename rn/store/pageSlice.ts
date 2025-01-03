import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PageState {
    pageType: 'personal' | 'church' | 'team' | 'teamManage' | 'teamMember'; // 页面类型
    data: Record<string, any>;       // 页面数据（如统计、标题等）
}

const initialState: PageState = {
    pageType: 'teamManage', // 默认显示教会页面
    data: {},
};

const pageSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        setPageType: (state, action: PayloadAction<PageState['pageType']>) => {
            state.pageType = action.payload;
        },
        setPageData: (state, action: PayloadAction<Record<string, any>>) => {
            state.data = action.payload;
        },
    },
});

export const { setPageType, setPageData } = pageSlice.actions;

export default pageSlice.reducer;
