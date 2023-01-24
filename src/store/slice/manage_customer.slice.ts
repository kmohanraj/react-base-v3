import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "store/initialStates/manage_customer.initialState";

export const manageCustomerSlice = createSlice({
  name: 'manageCustomer',
  initialState,
  reducers: {
    setManageCustomer: (state, action) => {
      state.manage_customer = action.payload
    },
    setManageCustomers: (state, action) => {
      state.manage_customers = action.payload
    },
    setSelectedManage: (state, action) => {
      state.selected_manage = action.payload
    }
  }
});

export const {
  setManageCustomer,
  setManageCustomers,
  setSelectedManage
} = manageCustomerSlice.actions;

export default  manageCustomerSlice.reducer;