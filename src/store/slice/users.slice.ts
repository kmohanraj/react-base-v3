import { createSlice } from "@reduxjs/toolkit";
import initialState from 'store/initialStates/users.initialState';

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setIsAddUserBtnClicked: (state, action) => {
      state.isAddUserBtnClicked = action.payload
    },
    setUser: (state, action) => {
      state.user = action.payload
    },
    setLogin: (state, action) => {
      state.login = action.payload
    }
  }
});

export const {
  setIsAddUserBtnClicked,
  setUser,
  setLogin
} = usersSlice.actions;

export default usersSlice.reducer;