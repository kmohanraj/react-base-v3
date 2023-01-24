const initialCollection = {
  collection_amount: '',
  description: '',
  // collection_date: null
}

const initialState = {
  isEditCollectionBtnClicked: false,
  collection: initialCollection,
  collectionsData: []
}

export {
  initialState,
  initialCollection
}