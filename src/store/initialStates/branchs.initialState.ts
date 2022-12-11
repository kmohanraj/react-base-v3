const branch = {
  branch_name: '',
  branch_code: '',
  org_id: null
}

const branchOption = {
  id: null,
  label: ''
}

const initialState = {
  isAddBranchButtonClicked: false,
  branch: branch,
  branchesData: [],
  branchOptions: []
}
export { initialState, branch, branchOption };
