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
  isAddGroup: false,
  isEditGroup: false,
  isManageCustomer: false,
  isDeleteGroup: false,
  isCollectionDetail: false,
  group: group,
  selectedGroup: group,
  groupsData: [],
  clearDates: clearDate
}

export { initialState, clearDate }