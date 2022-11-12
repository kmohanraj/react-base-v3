import Button from "components/atoms/Button";
import Table from "components/atoms/Table";
import TopPanel from "components/molecules/TopPanel";
import { useDispatch } from "react-redux";
import { setIsAddOrgBtnClicked } from "store/slice/organizations.slice";

const columns = [
  { title: 'Organization Name', dataProperty: 'organization_name'},
  { title: 'Organization Email', dataProperty: 'organization_email'},
  { title: 'Branch Limit', dataProperty: 'branch_limit'},
  { title: 'Phone', dataProperty: 'phone'},
  { title: 'Status', dataProperty: 'status'}
]

const datas = [
  {
    id: 1,
    organization_name: 'Test',
    organization_email: 'example@gmail.com',
    branch_limit: '1',
    phone: '1234567890',
    status: 'Active'
  },
  {
    id: 2,
    organization_name: 'Test',
    organization_email: 'example@gmail.com',
    branch_limit: '1',
    phone: '1234567890',
    status: 'Active'
  }
]

const OrganizationTable = () => {
  const dispatch = useDispatch()

  const hanldeOnEdit = (data: any) => {
    console.log('edit', data)
  }

  const handleOnRemove = (id: number) => {
    console.log('remove -item', id)
  }

  return (
    <>
      <TopPanel panelType="top-panel">
        <span className="top-panel-entity">No Results</span>
        <div className="top-panel-buttons">
          <Button type='ghost' label='Export CSV' onClick={() => console.log('add organization')}  />
          <Button type='primary' label='Add Organization' onClick={() => dispatch(setIsAddOrgBtnClicked(true))} />
        </div>
      </TopPanel>
      <Table
        tableName="organization-table"
        columns={columns}
        data={datas}
        action={true}
        onEdit={hanldeOnEdit}
        onRemove={handleOnRemove}
      />
    </>
   
  )
}
export default OrganizationTable;
