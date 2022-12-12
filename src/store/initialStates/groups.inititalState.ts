const group = {
  group_code: '',
  amount: '',
  total_members: '',
  duration: null,
  org_id: null,
  branch_id: null,
  start_date: '' || null,
  end_date: '' || null
}

const clearDate = {
  start_date: null,
  end_date: null
}

const initialState = {
  isAddGroupBtnClicked: false,
  group: group,
  groupsData: [],
  clearDates: clearDate
}

export { initialState, clearDate }