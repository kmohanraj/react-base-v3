import { createSlice } from "@reduxjs/toolkit";
import initialState from 'store/initialStates/organizations.initialState';

export const organizationSlice = createSlice({
  name: "organizations",
  initialState,
  reducers: {
    setIsAddOrgBtnClicked: (state, action) => {
      state.isAddOrgBtnClicked = action.payload
    },
    setOrganization: (state, action) => {
      state.organization = action.payload
    }
  }
});

export const {
  setIsAddOrgBtnClicked,
  setOrganization
} = organizationSlice.actions;

export default organizationSlice.reducer;