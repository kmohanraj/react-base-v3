const user = {
  name: '',
  email: '',
  confirm_email: '',
  password: '',
  phone: '',
  role_id: '',
  org_id: '',
  branch_id: ''
}

const login = {
  email: '',
  password: ''
}

const initialState = {
  user: user,
  login: login,
  isAddUserBtnClicked: false,
  isEditUserBtnClicked: false,
  usersData: []
}

export { initialState, user } 
