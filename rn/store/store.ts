import { configureStore } from "@reduxjs/toolkit";
import { globalReducer } from "./globalReducer";
import tabReducer from "./tabSlice";
import pageReducer from "./pageSlice";
import statusBarReducer from "./statusBarSlice";

export const store = configureStore({
    reducer: {
        global: globalReducer,
        tab: tabReducer,
        page: pageReducer,
        statusBar: statusBarReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
