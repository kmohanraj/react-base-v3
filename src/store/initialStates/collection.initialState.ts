const initialCollection = {
  collection_amount: '',
  description: '',
  // collection_date: null
}

const initialState = {
  isAddCollection: false,
  isEditCollection: false,
  isDeleteCollection: false,
  collection: initialCollection,
  collectionsData: []
}

export {
  initialState,
  initialCollection
}