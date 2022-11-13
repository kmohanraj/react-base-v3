import { createSlice } from "@reduxjs/toolkit";
import initialState from 'store/initialStates/cutomers.initialState';

export const cutomersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    setIsAddCustomerBtnClicked: (state, action) => {
      state.isAddCustomerBtnClicked = action.payload
    }
  }
});

export const {
  setIsAddCustomerBtnClicked
} = cutomersSlice.actions;

export default cutomersSlice.reducer;