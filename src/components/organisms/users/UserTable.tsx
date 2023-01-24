import Button from "components/atoms/Button";
import Table from "components/atoms/Table";
import TopPanel from "components/molecules/TopPanel";
import { useDispatch, useSelector } from "react-redux";
import * as UserSlice from "store/slice/users.slice";
import { useEffect, useState } from "react";
import Pagination from "components/atoms/Pagination";
import type { RootState } from "store";
import useItToGetAllUsers from "hooks/user/useItToGetAllUsers";
import CONSTANTS from "constants/constants";

const columns = [
  { title: 'Name', dataProperty: 'name'},
  { title: 'Email', dataProperty: 'email'},
  { title: 'Phone', dataProperty: 'phone'},
  { title: 'Role', dataProperty: 'roles', selector: 'name'},
  { title: 'Organization Name', dataProperty: 'organizations', selector: 'org_name'},
  { title: 'Branch Name', dataProperty: 'branches', selector: 'branch_name'}
]

const { SESSION_STORAGE, ACTION_BTN } = CONSTANTS;

const UserTable = () => {
  const { usersData } = useSelector((state: RootState) => state.user)
  const currentUserID = sessionStorage.getItem(SESSION_STORAGE.USER_ID_KEY)
  const [isUsersLoading] = useItToGetAllUsers(Number(currentUserID))
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1);
  const [perPageSize, setPerPageSize] = useState(10);
  
  const handleOnEdit = (data: any) => {
    dispatch(UserSlice.setIsAddUserBtnClicked(true))
    dispatch(UserSlice.setUser(data))
    dispatch(UserSlice.setIsEditUserBtnClicked(true))
  }

  const handleOnRemove = (data: any) => {
    console.log('remove -item', data)
  }

  useEffect(() => {}, [isUsersLoading])

  const start = currentPage * perPageSize - perPageSize
  const end = start + perPageSize;
  const usersList = usersData.slice(start, end)

  return (
    <>
       <TopPanel panelType="top-panel">
        <div className='top-panel-entity'>{usersData.length} {usersData.length > 1 ? 'users' : 'user'}</div>
        {/* <span className="top-panel-entity">No Results</span> */}
        <div className="top-panel-buttons">
          <Button type='ghost' label='Export CSV' onClick={() => console.log('add organization')}  />
          <Button type='primary' label='Add User' onClick={() => dispatch(UserSlice.setIsAddUserBtnClicked(true))} />
        </div>
      </TopPanel>
      <Table
        tableName="user-table"
        columns={columns}
        data={usersList}
        action={[ACTION_BTN.EDIT, ACTION_BTN.DELETE]}
        onEdit={handleOnEdit}
        onRemove={handleOnRemove}
      />
     <Pagination
        perPage={perPageSize}
        totalPageRecords={usersData.length}
        currentPage={currentPage}
        maxVisibleButton={3}
        setCurrentPage={setCurrentPage}
        setPerPageSize={setPerPageSize}
      />
    </>
  )
}
export default UserTable;
