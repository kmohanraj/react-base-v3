import { createSlice } from "@reduxjs/toolkit";
import { initialState, user} from 'store/initialStates/users.initialState';

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setIsAddUser: (state, action) => {
      state.isAddUser = action.payload
    },
    setIsEditUser: (state, action) => {
      state.isEditUser = action.payload
    },
    setIsDelete: (state, action) => {
      state.isDeleteUser = action.payload
    },
    setIsUserActive: (state, action) => {
      state.isUserActive = action.payload
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
  setIsAddUser,
  setIsEditUser,
  setIsDelete,
  setIsUserActive,
  setUser,
  setLogin,
  setUsersData,
  clearUser
} = usersSlice.actions;

export default usersSlice.reducer;