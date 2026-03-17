import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/Auth/authSlice";
import parentReducer from "../features/Parent/parentSlice";
import childReducer from "../features/Child/childSlice";
import adminReducer from "../features/Admin/AdminSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        parent: parentReducer,
        child: childReducer,
        admin: adminReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;