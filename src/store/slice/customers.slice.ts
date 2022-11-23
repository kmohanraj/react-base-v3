import { createSlice } from "@reduxjs/toolkit";
import initialState from 'store/initialStates/cutomers.initialState';

export const cutomersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    setIsAddCustomerBtnClicked: (state, action) => {
      state.isAddCustomerBtnClicked = action.payload
    },
    setCustomer: (state, action) => {
      state.customer = action.payload
    }
  }
});

export const {
  setIsAddCustomerBtnClicked,
  setCustomer
} = cutomersSlice.actions;

export default cutomersSlice.reducer;