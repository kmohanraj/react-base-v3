import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "store/initialStates/collection.initialState";

export const collectionSlice = createSlice({
  name: 'collections',
  initialState,
  reducers: {
    setIsEditCollectionBtnClicked: (state, action) => {
      state.isEditCollectionBtnClicked = action.payload
    }
  }
});

export const {
  setIsEditCollectionBtnClicked
} = collectionSlice.actions;

export default collectionSlice.reducer;