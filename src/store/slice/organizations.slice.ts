import { createSlice } from "@reduxjs/toolkit";
import initialState from 'store/initialStates/organizations.initialState';

export const organizationSlice = createSlice({
  name: "organizations",
  initialState,
  reducers: {
    setIsAddOrgBtnClicked: (state, action) => {
      state.isAddOrgBtnClicked = action.payload
    }
  }
});

export const {
  setIsAddOrgBtnClicked
} = organizationSlice.actions;

export default organizationSlice.reducer;