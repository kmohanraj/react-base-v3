import { createSlice } from "@reduxjs/toolkit";
import { initialState, customer } from 'store/initialStates/customers.initialState';

export const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    setIsAddCustomerBtnClicked: (state, action) => {
      state.isAddCustomerBtnClicked = action.payload
    },
    setIsEditCustomerBtnClicked: (state, action) => {
      state.isEditCustomerBtnClicked = action.payload
    },
    setCustomer: (state, action) => {
      state.customer = action.payload
    },
    setCustomersData: (state, action) => {
      state.customersData = action.payload
    },
    setCustomerOptions: (state, action) => {
      state.customerOptions =action.payload
    },
    setCurrentCustomerCode: (state, action) => {
      state.currentCustomerCode = action.payload
    },
    clearCustomer: (state) => ({
      ...state,
      customer: customer
    })
  }
});

export const {
  setIsAddCustomerBtnClicked,
  setIsEditCustomerBtnClicked,
  setCustomer,
  setCustomersData,
  setCustomerOptions,
  setCurrentCustomerCode,
  clearCustomer
} = customersSlice.actions;

export default customersSlice.reducer;