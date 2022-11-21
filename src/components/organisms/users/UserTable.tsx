import Button from "components/atoms/Button";
import Table from "components/atoms/Table";
import TopPanel from "components/molecules/TopPanel";
import { useDispatch } from "react-redux";
import { setIsAddUserBtnClicked } from "store/slice/users.slice";
import usersData from 'mockData/users.json';
import { useState } from "react";
import Pagination from "components/atoms/Pagination";

const columns = [
  { title: 'Name', dataProperty: 'name'},
  { title: 'Email', dataProperty: 'email'},
  { title: 'Phone', dataProperty: 'phone'},
  { title: 'Role', dataProperty: 'role_id'},
  { title: 'Organization Name', dataProperty: 'org_id'},
  { title: 'Branch Name', dataProperty: 'branch_id'}
]

const UserTable = () => {
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1);
  const [perPageSize, setPerPageSize] = useState(10);
  
  const hanldeOnEdit = (id: number) => {
    console.log('edit', id)
  }

  const handleOnRemove = (data: any) => {
    console.log('remove -item', data)
  }

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
