// eslint-disable-next-line import/no-anonymous-default-export
const organization = {
  id: null,
  org_name: '',
  org_email: '',
  branch_limit: '',
  group_limit: '',
  org_logo: '',
  org_phone: '',
  org_address: ''
}

const isOptionLoading = true;

const initialState = {
  isAddOrgBtnClicked: false,
  isEditOrgBtnClicked: false,
  isDeleteOrg: false,
  isStatus: false,
  organization: organization,
  organizationsData: [],
  // orgSelectedRow: {},
  organizationOptions: [],
  isOrgOptionLoading: isOptionLoading
}



export { initialState, organization } ;