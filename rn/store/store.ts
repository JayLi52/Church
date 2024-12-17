import { configureStore } from "@reduxjs/toolkit";
import { globalReducer } from "./globalReducer";

export const store = configureStore({
    reducer: {
        global: globalReducer, // 挂载 globalReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
