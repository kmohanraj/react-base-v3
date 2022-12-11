import { createSlice } from '@reduxjs/toolkit';
import { branch, initialState } from 'store/initialStates/branchs.initialState';

export const branchSlice = createSlice({
  name: 'branchs',
  initialState,
  reducers: {
    setIsAddBranchBtnClicked: (state, action) => {
      state.isAddBranchButtonClicked = action.payload;
    },
    setBranch: (state, action) => {
      state.branch = action.payload;
    },
    setBranchesData: (state, action) => {
      state.branchesData = action.payload;
    },
    setBranchOption: (state, action) => {
      state.branchOptions = action.payload;
    },
    clearBranch: (state) => ({
      ...state,
      branch: branch,
    }),
  },
});

export const {
  setIsAddBranchBtnClicked,
  setBranch,
  setBranchesData,
  setBranchOption,
  clearBranch,
} = branchSlice.actions;

export default branchSlice.reducer;
