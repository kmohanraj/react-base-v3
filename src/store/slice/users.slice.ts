import { createSlice } from "@reduxjs/toolkit";
import initialState from 'store/initialStates/users.initialState';

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setIsAddUserBtnClicked: (state, action) => {
      state.isAddUserBtnClicked = action.payload
    }
  }
});

export const {
  setIsAddUserBtnClicked
} = usersSlice.actions;

export default usersSlice.reducer;