
const customer = {
  customer_id: '',
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
  isAddCustomerBtnClicked: false,
  isEditCustomerBtnClicked: false,
  customer: customer,
  customersData: []
}

export {
  initialState, customer
}