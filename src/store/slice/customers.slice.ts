import { createSlice } from "@reduxjs/toolkit";
import { initialState, customer } from 'store/initialStates/cutomers.initialState';

export const cutomersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    setIsAddCustomerBtnClicked: (state, action) => {
      state.isAddCustomerBtnClicked = action.payload
    },
    setIsEditCustomerBtnclicked: (state, action) => {
      state.isEditCustomerBtnClicked = action.payload
    },
    setCustomer: (state, action) => {
      state.customer = action.payload
    },
    setCustomersData: (state, action) => {
      state.customersData = action.payload
    },
    clearCustomer: (state) => ({
      ...state,
      customer: customer
    })
  }
});

export const {
  setIsAddCustomerBtnClicked,
  setIsEditCustomerBtnclicked,
  setCustomer,
  setCustomersData,
  clearCustomer
} = cutomersSlice.actions;

export default cutomersSlice.reducer;