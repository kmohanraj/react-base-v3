import { createSlice } from "@reduxjs/toolkit";
import { initialState, clearDate } from 'store/initialStates/groups.inititalState';

export const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    setIsAddGroupBtnClicked: (state, action) => {
      state.isAddGroupBtnClicked = action.payload
    },
    setIsEditGroupBtnClicked: (state, action) => {
      state.isEditGroupBtnClicked = action.payload
    },
    setIsManageCustomerBtnClicked: (state, action) => {
      state.isManageCustomerBtnClicked = action.payload
    },
    setIsModalShow: (state, action) => {
      state.isModalShow = action.payload
    },
    setIsCollectionDetail: (state, action) => {
      state.isCollectionDetail = action.payload
    },
    setGroup: (state, action) => {
      state.group = action.payload
    },
    setSelectedGroup: (state, action) => {
      state.selectedGroup = action.payload
    },
    setGroupsData: (state, action) => {
      state.groupsData = action.payload
    }
  }
});

export const {
  setIsAddGroupBtnClicked,
  setIsEditGroupBtnClicked,
  setIsManageCustomerBtnClicked,
  setIsModalShow,
  setIsCollectionDetail,
  setGroup,
  setSelectedGroup,
  setGroupsData
} = groupsSlice.actions;

export default groupsSlice.reducer;
