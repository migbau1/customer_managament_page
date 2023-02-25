import { configureStore } from "@reduxjs/toolkit";
import createRootReducer from "./reducer";


export const store = configureStore({
    reducer: createRootReducer(),
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;