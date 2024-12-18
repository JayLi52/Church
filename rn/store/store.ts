import { configureStore } from "@reduxjs/toolkit";
import { globalReducer } from "./globalReducer";
import tabReducer from "./tabSlice";
import pageReducer from "./pageSlice";

export const store = configureStore({
    reducer: {
        global: globalReducer, // 挂载 globalReducer
        tab: tabReducer, // 添加 tabSlice
        page: pageReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
