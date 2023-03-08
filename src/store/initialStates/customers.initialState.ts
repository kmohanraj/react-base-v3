
const customer = {
  id: null,
  organizations: {},
  branches: {},
  customer_code: '',
  org_id: null,
  branch_id: null,
  customer_name: '',
  age: '',
  gender: null,
  phone: '',
  alter_phone: '',
  address: '',
  pincode: '',
  nominee_name: '',
  nominee_phone: '',
  id_proof: null,
  locality: ''
}

const initialState = {
  isAddCustomer: false,
  isEditCustomer: false,
  isDeleteCustomer: false,
  customer: customer,
  customersData: [],
  customerOptions: [],
  currentCustomerCode: ''
}

export {
  initialState, customer
}