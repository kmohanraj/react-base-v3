import { createSlice } from '@reduxjs/toolkit';
import { initialState } from 'store/initialStates/groups.initialState';

export const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    setIsAddGroup: (state, action) => {
      state.isAddGroup = action.payload;
    },
    setIsEditGroup: (state, action) => {
      state.isEditGroup = action.payload;
    },
    setIsManageCustomer: (state, action) => {
      state.isManageCustomer = action.payload;
    },
    setIsDeleteGroup: (state, action) => {
      state.isDeleteGroup = action.payload
    },
    setIsCollectionDetail: (state, action) => {
      state.isCollectionDetail = action.payload;
    },
    setGroup: (state, action) => {
      state.group = action.payload;
    },
    setSelectedGroup: (state, action) => {
      state.selectedGroup = action.payload;
    },
    setGroupsData: (state, action) => {
      state.groupsData = action.payload;
    },
    clearGroup: (state) => ({
      ...state,
      group: initialState.group
    })
  }
});

export const {
  setIsAddGroup,
  setIsEditGroup,
  setIsManageCustomer,
  setIsDeleteGroup,
  setIsCollectionDetail,
  setGroup,
  setSelectedGroup,
  setGroupsData,
  clearGroup
} = groupsSlice.actions;

export default groupsSlice.reducer;
