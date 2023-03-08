const manageCustomer = {
  id: null,
  group_id: null,
  customer_id: null,
  customer_name: '',
  customer_code: '',
  org_id: null,
  collection_type_id: null,
  taken_amount: '',
  taken_at: null,
  taken_position: ''
};

const initialState = {
  isAddManageCustomer: false,
  isEditManageCustomer: false,
  isDeleteManageCustomer: false,
  // isCollectionDetail: false,
  manageCustomer: manageCustomer,
  selected_manage: manageCustomer,
  manageCustomers: []
};

export { initialState };
