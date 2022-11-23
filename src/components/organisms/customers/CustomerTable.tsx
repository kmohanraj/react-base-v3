import Button from 'components/atoms/Button';
import Table from 'components/atoms/Table';
import TopPanel from 'components/molecules/TopPanel';
import { useDispatch } from 'react-redux';
import { setIsAddCustomerBtnClicked } from 'store/slice/customers.slice';
import customersData from 'mockData/customers.json';
import { useState } from 'react';
import Pagination from 'components/atoms/Pagination';

const columns = [
  { title: 'Customer ID', dataProperty: 'customer_id' },
  { title: 'Customer Name', dataProperty: 'customer_name' },
  { title: 'Organization Name', dataProperty: 'org_id' },
  { title: 'Branch Name', dataProperty: 'branch_id' },
  { title: 'Gender', dataProperty: 'gender' },
  { title: 'Locality', dataProperty: 'locality' },
  { title: 'District', dataProperty: 'district' },
];

const CustomerTable = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [perPageSize, setPerPageSize] = useState(10);

  const start = currentPage * perPageSize - perPageSize
  const end = start + perPageSize;
  const datas = customersData.slice(start, end)

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
        data={datas}
        action={true}
        onEdit={handleOnEdit}
        onRemove={handleOnRemove}
      />
      <Pagination
        perPage={perPageSize}
        totalPageRecords={customersData.length}
        currentPage={currentPage}
        maxVisibleButton={3}
        setCurrentPage={setCurrentPage}
        setPerPageSize={setPerPageSize}
      />
    </>
  );
};
export default CustomerTable;
