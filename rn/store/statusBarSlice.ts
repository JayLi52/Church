import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StatusBarState {
    isTranslucent: boolean;
    backgroundColor: string;
    barStyle: 'default' | 'light-content' | 'dark-content';
    isHidden: boolean;
}

const initialState: StatusBarState = {
    isTranslucent: false,
    backgroundColor: '#F6F6F6',
    barStyle: 'dark-content',
    isHidden: false
};

const statusBarSlice = createSlice({
    name: 'statusBar',
    initialState,
    reducers: {
        setStatusBar: (state, action: PayloadAction<Partial<StatusBarState>>) => {
            return { ...state, ...action.payload };
        },
        setTranslucent: (state) => {
            state.isTranslucent = true;
            state.backgroundColor = 'transparent';
            state.barStyle = 'dark-content';
            state.isHidden = false;
        },

        // setOpaque: (state) => {
        //     state.isTranslucent = false;
        //     state.backgroundColor = '#F6F6F6';
        // },
        hideStatusBar: (state) => {
            state.isHidden = true;
        },
        showStatusBar: (state) => {
            state.isHidden = false;
        },
        resetStatusBar: (state) => {
            return initialState;
        }
    }
});

export const {
    setStatusBar,
    setTranslucent,
    // setOpaque,
    hideStatusBar,
    showStatusBar,
    resetStatusBar
} = statusBarSlice.actions;

export default statusBarSlice.reducer; 