import { createSlice } from "@reduxjs/toolkit";
import { initialState, organization } from 'store/initialStates/organizations.initialState';

export const organizationSlice = createSlice({
  name: "organizations",
  initialState,
  reducers: {
    setIsAddOrgBtnClicked: (state, action) => {
      state.isAddOrgBtnClicked = action.payload
    },
    setIsEditOrgBtnClicked: (state, action) => {
      state.isEditOrgBtnClicked = action.payload
    },
    setOrganization: (state, action) => {
      state.organization = action.payload
    },
    setOrganizationsData: (state, action) => {
      state.organizationsData = action.payload
    },
    // setOrgSelectedRow: (state, action) => {
    //   state.orgSelectedRow = action.payload
    // },
    setOrganizationOption: (state, action) => {
      state.organizationOptions = action.payload
    },
    setIsOrgOptionLoading: (state, action) => {
      state.isOrgOptionLoading = action.payload
    },
    clearOrganization: (state) => ({
      ...state, organization: organization
    })
  }
});

export const {
  setIsAddOrgBtnClicked,
  setIsEditOrgBtnClicked,
  setOrganization,
  setOrganizationsData,
  // setOrgSelectedRow,
  setOrganizationOption,
  clearOrganization,
  setIsOrgOptionLoading
} = organizationSlice.actions;

export default organizationSlice.reducer;