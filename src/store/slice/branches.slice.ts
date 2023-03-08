import { createSlice } from '@reduxjs/toolkit';
import {
  branch,
  initialState
} from 'store/initialStates/branches.initialState';

export const branchSlice = createSlice({
  name: 'branches',
  initialState,
  reducers: {
    setIsAddBranchBtnClicked: (state, action) => {
      state.isAddBranchBtnClicked = action.payload;
    },
    setIsEditBranchBtnClicked: (state, action) => {
      state.isEditBranchBtnClicked = action.payload;
    },
    setIsDeleteBranchBtnClicked: (state, action) => {
      state.isDeleteBranchBtnClicked = action.payload;
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
      branch: branch
    })
  }
});

export const {
  setIsAddBranchBtnClicked,
  setIsEditBranchBtnClicked,
  setIsDeleteBranchBtnClicked,
  setBranch,
  setBranchesData,
  setBranchOption,
  clearBranch
} = branchSlice.actions;

export default branchSlice.reducer;
