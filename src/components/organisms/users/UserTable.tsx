import Button from "components/atoms/Button";
import Table from "components/atoms/Table";
import TopPanel from "components/molecules/TopPanel";
import { useDispatch } from "react-redux";
import { setIsAddUserBtnClicked } from "store/slice/users.slice";

const columns = [
  { title: 'Name', dataProperty: 'name'},
  { title: 'Email', dataProperty: 'email'},
  { title: 'Phone', dataProperty: 'phone'},
  { title: 'Role', dataProperty: 'role_id'},
  { title: 'Organization Name', dataProperty: 'org_id'},
  { title: 'Branch Name', dataProperty: 'branch_id'}
]

const datas = [
  {
    id: 1,
    name: 'Mohanraj Kandasamy',
    email: 'example@gmail.com',
    phone: '1234567890',
    role_id: 'Admin',
    org_id: 'Jayamuragan',
    branch_id: 'Tharagampatti'
  },
  {
    id: 2,
    name: 'Mohanraj Kandasamy',
    email: 'example@gmail.com',
    phone: '1234567890',
    role_id: 'Admin',
    org_id: 'Jayamuragan',
    branch_id: 'Tharagampatti'
  }
]

const UserTable = () => {
  const dispatch = useDispatch()
  const hanldeOnEdit = (id: number) => {
    console.log('edit', id)
  }

  const handleOnRemove = (data: any) => {
    console.log('remove -item', data)
  }

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
    </>
  )
}
export default UserTable;
