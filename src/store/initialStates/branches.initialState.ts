const branch = {
  id: null,
  organizations: {},
  branch_name: '',
  branch_code: '',
  org_id: null
}

const branchOption = {
  id: null,
  label: ''
}

const initialState = {
  isAddBranchBtnClicked: false,
  isEditBranchBtnClicked: false,
  isDeleteBranchBtnClicked: false,
  branch: branch,
  branchesData: [],
  branchOptions: []
}
export { initialState, branch, branchOption };
