import Button from 'components/atoms/Button';
import Table from 'components/atoms/Table';
import TopPanel from 'components/molecules/TopPanel';
import { useDispatch, useSelector } from 'react-redux';
import { clearCustomer, setCustomer, setIsAddCustomerBtnClicked, setIsEditCustomerBtnclicked } from 'store/slice/customers.slice';
import { useEffect, useState } from 'react';
import Pagination from 'components/atoms/Pagination';
import useItToGetCustomers from 'hooks/customer/useItToGetCustomers';
import CONSTANTS from 'constants/constants';
import { RootState } from 'store';
const columns = [
  { title: 'Customer ID', dataProperty: 'customer_id' },
  { title: 'Customer Name', dataProperty: 'customer_name' },
  { title: 'Organization Name', dataProperty: 'org_id' },
  { title: 'Branch Name', dataProperty: 'branch_id' },
  { title: 'Gender', dataProperty: 'gender' },
  { title: 'Locality', dataProperty: 'locality' },
  { title: 'District', dataProperty: 'district' },
];

const { SESSION_STORAGE } = CONSTANTS;

const CustomerTable = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [perPageSize, setPerPageSize] = useState(10);
  const { customersData } = useSelector((state: RootState) => state.customer)
  const currentUserID = sessionStorage.getItem(SESSION_STORAGE.USER_ID_KEY)

  const [isCustomersLoading] = useItToGetCustomers(Number(currentUserID))


  const start = currentPage * perPageSize - perPageSize
  const end = start + perPageSize;
  const datas = customersData.slice(start, end)

  const handleOnEdit = (data: any) => {
    console.log('0000000');
    dispatch(setIsAddCustomerBtnClicked(true))
    dispatch(setCustomer(data))
    dispatch(setIsEditCustomerBtnclicked(true))
  };
  const handleOnRemove = () => {
    console.log('&&&');
  };

  useEffect(() => {

  }, [isCustomersLoading])

  const handleCheckCondition = () => {
    dispatch(setIsAddCustomerBtnClicked(false))
    dispatch(clearCustomer())
    dispatch(setIsEditCustomerBtnclicked(true))
  }

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
