// eslint-disable-next-line import/no-anonymous-default-export
const organization = {
  org_name: '',
  org_email: '',
  branch_limit: '',
  org_logo: '',
  org_phone: '',
  org_address: ''
}

const orgOption = {
  id: null,
  label: ''
}
const isOptionLoading = true;

const initialState = {
  isAddOrgBtnClicked: false,
  isEditOrgBtnClicked: false,
  organization: organization,
  organizationsData: [],
  // orgSelectedRow: {},
  organizationOptions: [],
  isOrgOptionLoading: isOptionLoading
}



export {initialState, organization} ;