import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StatusBarState {
    isTranslucent: boolean;
    backgroundColor: string;
    barStyle: 'default' | 'light-content' | 'dark-content';
    isHidden: boolean;
}

const initialState: StatusBarState = {
    isTranslucent: false,
    backgroundColor: '#333333',
    barStyle: 'light-content',
    isHidden: false
};

const statusBarSlice = createSlice({
    name: 'statusBar',
    initialState,
    reducers: {
        setStatusBar: (state, action: PayloadAction<Partial<StatusBarState>>) => {
            return { ...state, ...action.payload };
        }
    }
});

export const { setStatusBar } = statusBarSlice.actions;
export default statusBarSlice.reducer; 