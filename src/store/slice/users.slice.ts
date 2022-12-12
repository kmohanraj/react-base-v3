import { createSlice } from "@reduxjs/toolkit";
import { initialState, user} from 'store/initialStates/users.initialState';

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setIsAddUserBtnClicked: (state, action) => {
      state.isAddUserBtnClicked = action.payload
    },
    setIsEditUserBtnClicked: (state, action) => {
      state.isEditUserBtnClicked = action.payload
    },
    setUser: (state, action) => {
      state.user = action.payload
    },
    setLogin: (state, action) => {
      state.login = action.payload
    },
    setUsersData: (state, action) => {
      state.usersData = action.payload
    },
    clearUser: (state) => ({
      ...state,
      user: user
    })
  }
});

export const {
  setIsAddUserBtnClicked,
  setIsEditUserBtnClicked,
  setUser,
  setLogin,
  setUsersData,
  clearUser
} = usersSlice.actions;

export default usersSlice.reducer;