import Button from 'components/atoms/Button';
import Table from 'components/atoms/Table';
import TopPanel from 'components/molecules/TopPanel';
import { useDispatch } from 'react-redux';
import { setIsAddCustomerBtnClicked } from 'store/slice/customers.slice';

const columns = [
  { title: 'Customer ID', dataProperty: 'customer_id' },
  { title: 'Customer Name', dataProperty: 'customer_name' },
  { title: 'Organization Name', dataProperty: 'org_id' },
  { title: 'Branch Name', dataProperty: 'branch_id' },
  { title: 'Gender', dataProperty: 'gender' },
  { title: 'Locality', dataProperty: 'locality' },
  { title: 'District', dataProperty: 'district' },
];

const data = [
  {
    customer_id: 'ABCD01234',
    customer_name: 'Sakthivel',
    org_id: 'Jayamurugan',
    branch_id: 'Tharagampatti',
    gender: 'Male',
    locality: 'Tharagampatti',
    district: 'Karur',
  },
];

const CustomerTable = () => {
  const dispatch = useDispatch();
  const handleOnEdit = () => {
    console.log('0000000');
  };
  const handleOnRemove = () => {
    console.log('&&&');
  };

  return (
    <>
      <TopPanel panelType='top-panel'>
        <span className='top-panel-entity'>No Results</span>
        <div className='top-panel-buttons'>
          <Button
            type='ghost'
            label='Export CSV'
            onClick={() => console.log('add branch')}
          />
          <Button
            type='primary'
            label='Add Customer'
            onClick={() => dispatch(setIsAddCustomerBtnClicked(true))}
          />
        </div>
      </TopPanel>
      <Table
        tableName='customer-table'
        columns={columns}
        data={data}
        action={true}
        onEdit={handleOnEdit}
        onRemove={handleOnRemove}
      />
    </>
  );
};
export default CustomerTable;
