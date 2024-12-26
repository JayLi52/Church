import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
    statusBar: {
        visible: boolean;
        backgroundColor: string;
        translucent: boolean;
    };
    bottomTab: {
        visible: boolean;
    };
    selectedTab: string;
}

const initialState: UIState = {
    statusBar: {
        visible: true,
        backgroundColor: '#ffffff',
        translucent: false,
    },
    bottomTab: {
        visible: true,
    },
    selectedTab: 'all',
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setStatusBarConfig: (
            state,
            action: PayloadAction<Partial<UIState['statusBar']>>,
        ) => {
            state.statusBar = { ...state.statusBar, ...action.payload };
        },
        setBottomTabVisible: (state, action: PayloadAction<boolean>) => {
            state.bottomTab.visible = action.payload;
        },
        setSelectedTab: (state, action: PayloadAction<string>) => {
            state.selectedTab = action.payload;
        },
    },
});

export const { setStatusBarConfig, setBottomTabVisible, setSelectedTab } =
    uiSlice.actions;
export default uiSlice.reducer; 