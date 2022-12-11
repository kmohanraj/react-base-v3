import { createSlice } from "@reduxjs/toolkit";
import { initialState } from 'store/initialStates/groups.inititalState';

export const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    setIsAddGroupBtnClicked: (state, action) => {
      state.isAddGroupBtnClicked = action.payload
    },
    setGroup: (state, action) => {
      state.group = action.payload
    },
    setGroupsData: (state, action) => {
      state.groupsData = action.payload
    }
  }
});

export const {
  setIsAddGroupBtnClicked,
  setGroup,
  setGroupsData
} = groupsSlice.actions;

export default groupsSlice.reducer;
