import { createSlice } from "@reduxjs/toolkit";
import { initialState, initialCollection } from "store/initialStates/collection.initialState";

export const collectionSlice = createSlice({
  name: 'collections',
  initialState,
  reducers: {
    setIsEditCollectionBtnClicked: (state, action) => {
      state.isEditCollectionBtnClicked = action.payload
    },
    setCollection: (state, action) => {
      state.collection = action.payload
    },
    setCollectionsData: (state, action) => {
      state.collectionsData = action.payload
    },
    clearCollection: (state) => ({
      ...state,
      collection: initialCollection
    })
  }
});

export const {
  setIsEditCollectionBtnClicked,
  setCollection,
  setCollectionsData,
  clearCollection
} = collectionSlice.actions;

export default collectionSlice.reducer;