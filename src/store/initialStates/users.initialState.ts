const user = {
  name: '',
  email: '',
  confirm_email: '',
  password: '',
  phone: '',
  role_id: null,
  org_id: null,
  branch_id: null
}

const login = {
  email: '',
  password: '',
  new_password: ''
}

const initialState = {
  user: user,
  login: login,
  isAddUserBtnClicked: false,
  isEditUserBtnClicked: false,
  usersData: []
}

export { initialState, user } 
