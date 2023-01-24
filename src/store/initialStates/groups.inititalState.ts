const group = {
  id: null,
  group_code: '',
  amount: '',
  total_members: '',
  duration: null,
  org_id: null,
  branch_id: null,
  start_date: '',
  end_date: ''
}

const clearDate = {
  start_date: null,
  end_date: null
}

const initialState = {
  isAddGroupBtnClicked: false,
  isEditGroupBtnClicked: false,
  isManageCustomerBtnClicked: false,
  isCollectionDetail: false,
  isModalShow: false,
  group: group,
  selectedGroup: group,
  groupsData: [],
  clearDates: clearDate
}

export { initialState, clearDate }