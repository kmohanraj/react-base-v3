import Button from "components/atoms/Button";
import Table from "components/atoms/Table";
import TopPanel from "components/molecules/TopPanel";
import { useDispatch, useSelector } from "react-redux";
import { setIsAddUserBtnClicked, setIsEditUserBtnClicked, setUser } from "store/slice/users.slice";
import { useEffect, useState } from "react";
import Pagination from "components/atoms/Pagination";
import type { RootState } from "store";
import useItToGetAllUsers from "hooks/user/useItToGetAllUsers";
import CONSTANTS from "constants/constants";

const columns = [
  { title: 'Name', dataProperty: 'name'},
  { title: 'Email', dataProperty: 'email'},
  { title: 'Phone', dataProperty: 'phone'},
  { title: 'Role', dataProperty: 'role_id'},
  { title: 'Organization Name', dataProperty: 'org_id'},
  { title: 'Branch Name', dataProperty: 'branch_id'}
]

const {SESSION_STORAGE} = CONSTANTS;

const UserTable = () => {
  const { usersData } = useSelector((state: RootState) => state.user)
  const currentUserID = sessionStorage.getItem(SESSION_STORAGE.USER_ID_KEY)
  const [isUsersLoading] = useItToGetAllUsers(Number(currentUserID))
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1);
  const [perPageSize, setPerPageSize] = useState(10);
  
  const hanldeOnEdit = (data: any) => {
    dispatch(setIsAddUserBtnClicked(true))
    dispatch(setUser(data))
    dispatch(setIsEditUserBtnClicked(true))
  }

  const handleOnRemove = (data: any) => {
    console.log('remove -item', data)
  }

  useEffect(() => {}, [isUsersLoading])

  const start = currentPage * perPageSize - perPageSize
  const end = start + perPageSize;
  const datas = usersData.slice(start, end)

  return (
    <>
       <TopPanel panelType="top-panel">
        <span className="top-panel-entity">No Results</span>
        <div className="top-panel-buttons">
          <Button type='ghost' label='Export CSV' onClick={() => console.log('add organization')}  />
          <Button type='primary' label='Add User' onClick={() => dispatch(setIsAddUserBtnClicked(true))} />
        </div>
      </TopPanel>
      <Table
        tableName="user-table"
        columns={columns}
        data={datas}
        action={true}
        onEdit={hanldeOnEdit}
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
