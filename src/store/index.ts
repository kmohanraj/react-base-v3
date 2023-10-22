import { configureStore } from "@reduxjs/toolkit";
import userReducer from 'store/slice/users.slice';
import roleSlice from "./slice/role.slice";


export const store = configureStore({
  reducer: {
    user: userReducer,
    roles: roleSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
});

export type RootState = ReturnType<typeof store.getState>;
export type Appdispatch = typeof store.dispatch;