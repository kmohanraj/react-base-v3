import { createSlice } from "@reduxjs/toolkit";

export const roleSlice = createSlice({
  name: 'roles',
  initialState: {
    roleOptions: []
  },
  reducers: {
    setRoles: (state, action) => {
      state.roleOptions = action.payload
    }
  }
})

export const {
  setRoles
} = roleSlice.actions

export default roleSlice.reducer;