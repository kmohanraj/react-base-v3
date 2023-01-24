import Button from 'components/atoms/Button';
import Table from 'components/atoms/Table';
import TopPanel from 'components/molecules/TopPanel';
import { useDispatch, useSelector } from 'react-redux';
import * as CustomerSlice from 'store/slice/customers.slice';
import { useEffect, useState } from 'react';
import Pagination from 'components/atoms/Pagination';
import useItToGetCustomers from 'hooks/customer/useItToGetCustomers';
import CONSTANTS from 'constants/constants';
import { RootState } from 'store';

const columns = [
  { title: 'Customer Code', dataProperty: 'customer_code' },
  { title: 'Customer Name', dataProperty: 'customer_name' },
  { title: 'Organization Name', dataProperty: 'organizations', selector: 'org_name'},
  { title: 'Branch Name', dataProperty: 'branches', selector: 'branch_name' },
  { title: 'Gender', dataProperty: 'gender' },
  { title: 'Locality', dataProperty: 'locality' },
  { title: 'District', dataProperty: 'district' },
];

const { SESSION_STORAGE, ACTION_BTN } = CONSTANTS;

const CustomerTable = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [perPageSize, setPerPageSize] = useState(10);
  const { customersData } = useSelector((state: RootState) => state.customer)
  const currentUserID = sessionStorage.getItem(SESSION_STORAGE.USER_ID_KEY)

  const [isCustomersLoading] = useItToGetCustomers(Number(currentUserID))


  const start = currentPage * perPageSize - perPageSize
  const end = start + perPageSize;
  const customers = customersData.slice(start, end)

  const handleOnEdit = (data: any) => {
    dispatch(CustomerSlice.setIsAddCustomerBtnClicked(true))
    dispatch(CustomerSlice.setCustomer(data))
    dispatch(CustomerSlice.setIsEditCustomerBtnClicked(true))
  };
  const handleOnRemove = () => {
    console.log('&&&');
  };

  useEffect(() => {

  }, [isCustomersLoading])


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
            onClick={() => dispatch(CustomerSlice.setIsAddCustomerBtnClicked(true))}
          />
        </div>
      </TopPanel>
      <Table
        tableName='customer-table'
        columns={columns}
        data={customers}
        action={[ACTION_BTN.EDIT, ACTION_BTN.DELETE]}
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
