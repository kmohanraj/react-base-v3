const isAddUserBtnClicked = false;

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
  isAddUserBtnClicked: isAddUserBtnClicked,
  usersData: []
}

export { initialState } 
