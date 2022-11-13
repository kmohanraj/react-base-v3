import { createSlice } from "@reduxjs/toolkit";
import initialState from 'store/initialStates/groups.inititalState';

export const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    setIsAddGroupBtnClicked: (state, action) => {
      state.isAddGroupBtnClicked = action.payload
    }
  }
});

export const {
  setIsAddGroupBtnClicked
} = groupsSlice.actions;

export default groupsSlice.reducer;
