import { createSlice } from "@reduxjs/toolkit";
import initialState from 'store/initialStates/branchs.initialState';

export const branchSlice = createSlice({
  name: 'branchs',
  initialState,
  reducers: {
    setIsAddBranchBtnClicked: (state, action) => {
      state.isAddBranchButtonClicked = action.payload
    }
  }
});

export const {
  setIsAddBranchBtnClicked
} = branchSlice.actions;

export default branchSlice.reducer;
