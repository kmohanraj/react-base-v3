import { configureStore } from "@reduxjs/toolkit";
import organizationReducer from 'store/slice/organizations.slice';
import branchReducer from 'store/slice/branchs.slice';
import userReducer from 'store/slice/users.slice';

export const store = configureStore({
  reducer: {
    organization: organizationReducer,
    branch: branchReducer,
    user: userReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type Appdispatch = typeof store.dispatch;