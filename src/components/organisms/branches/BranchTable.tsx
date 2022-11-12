import Button from "components/atoms/Button";
import Table from "components/atoms/Table";
import TopPanel from "components/molecules/TopPanel";
import { setIsAddBranchBtnClicked } from "store/slice/branchs.slice";
import { useDispatch } from "react-redux";


const columns = [
  { title: 'Branch Name', dataProperty: 'branch_name'},
  { title: 'Branch Code', dataProperty: 'branch_code'},
  { title: 'Location', dataProperty: 'location'},
  { title: 'Organization Name', dataProperty: 'organization_id'}
]

const data = [
  {
    branch_name: 'Tharagampatti',
    branch_code: 'TP0012',
    location: 'Tharagampatti',
    organization_id: 'Jayamurugan'
  }
]

const BranchTable = () => {
  const dispatch = useDispatch();

  const handleOnEdit = () => {
    console.log('edit-branch')
  }

  const handleOnRemove = () => {
    console.log('remove-branch')
  }
  return (
    <>
      <TopPanel panelType="top-panel">
        <span className="top-panel-entity">No Results</span>
        <div className="top-panel-buttons">
          <Button type='ghost' label='Export CSV' onClick={() => console.log('add branch')} />
          <Button type='primary' label='Add Branch' onClick={() => dispatch(setIsAddBranchBtnClicked(true))} />
        </div>
      </TopPanel>
      <Table 
        tableName="branch-table"
        columns={columns}
        data={data}
        action={true}
        onEdit={handleOnEdit}
        onRemove={handleOnRemove}
      />
    </>
  )
}

export default BranchTable;
