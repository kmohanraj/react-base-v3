import { configureStore } from "@reduxjs/toolkit";
import organizationReducer from 'store/slice/organizations.slice';
import branchReducer from 'store/slice/branchs.slice';
import userReducer from 'store/slice/users.slice';
import customerReducer from 'store/slice/customers.slice';
import groupReducer from 'store/slice/groups.slice';
import roleSlice from "./slice/role.slice";
import collectionSlice from "./slice/collection.slice";


export const store = configureStore({
  reducer: {
    organization: organizationReducer,
    branch: branchReducer,
    user: userReducer,
    customer: customerReducer,
    group: groupReducer,
    roles: roleSlice,
    collection: collectionSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
});

export type RootState = ReturnType<typeof store.getState>;
export type Appdispatch = typeof store.dispatch;