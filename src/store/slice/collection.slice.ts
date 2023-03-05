import { createSlice } from "@reduxjs/toolkit";
import { initialState, initialCollection } from "store/initialStates/collection.initialState";

export const collectionSlice = createSlice({
  name: 'collections',
  initialState,
  reducers: {
    setIsAddCollection: (state, action) => {
      state.isAddCollection = action.payload
    },
    setIsEditCollection: (state, action) => {
      state.isEditCollection = action.payload
    },
    setIsDeleteCollection: (state, action) => {
      state.isDeleteCollection = action.payload
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
  setIsAddCollection,
  setIsEditCollection,
  setIsDeleteCollection,
  setCollection,
  setCollectionsData,
  clearCollection
} = collectionSlice.actions;

export default collectionSlice.reducer;