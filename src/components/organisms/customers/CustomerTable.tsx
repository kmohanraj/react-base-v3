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
// import { setIsModalShow } from 'store/slice/groups.slice';
import ConfirmationModal from 'components/molecules/ConfirmationModal';
import * as CustomerService from 'service/customer.service';
import iziToast from 'izitoast';
import { genderOptions } from 'constants/options';

const columns = [
  { title: 'Customer Code', dataProperty: 'customer_code' },
  { title: 'Customer Name', dataProperty: 'customer_name' },
  {
    title: 'Organization Name',
    dataProperty: 'organizations',
    selector: 'org_name'
  },
  { title: 'Branch Name', dataProperty: 'branches', selector: 'branch_name' },
  { title: 'Gender', dataProperty: 'gender', options: genderOptions },
  { title: 'Locality', dataProperty: 'locality' },
  { title: 'District', dataProperty: 'district' }
];

const { SESSION_STORAGE, ACTION_BTN, STATUS_CODE, TOAST_DEFAULTS, ROLE } =
  CONSTANTS;

const CustomerTable = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [perPageSize, setPerPageSize] = useState(10);
  const { customersData, isDeleteCustomer } = useSelector(
    (state: RootState) => state.customer
  );
  const currentUserID = sessionStorage.getItem(SESSION_STORAGE.USER_ID_KEY);
  const currentUserRole = sessionStorage.getItem(SESSION_STORAGE.ROLE_KEY);
  const [title, setTitle] = useState<string>('');
  const [actionMode, setActionMode] = useState<string>('');
  const [customerId, setCustomerId] = useState<number>();
  const [isCustomersLoading] = useItToGetCustomers(Number(currentUserID));
  const [pageList, setPageList] = useState([])

  const handleOnEdit = (data: any) => {
    dispatch(CustomerSlice.setIsAddCustomerBtnClicked(true));
    dispatch(CustomerSlice.setCustomer(data));
    dispatch(
      CustomerSlice.setCustomer(
        customersData.filter((ele: any) => ele.id === data.id)[0]
      )
    );
    dispatch(CustomerSlice.setIsEditCustomerBtnClicked(true));
  };
  const handleOnRemove = (data: any) => {
    dispatch(CustomerSlice.setIsDeleteCustomerBtnClicked(true));
    setCustomerId(data.id);
    setTitle(data.customer_code);
    setActionMode('Delete');
  };

  const deleteCustomer = async () => {
    const response = await CustomerService.remove(
      Number(customerId),
      Number(currentUserID)
    );
    if (response?.status === STATUS_CODE.STATUS_200) {
      iziToast.success({
        title: TOAST_DEFAULTS.SUCCESS_TITLE,
        message: response?.data?.info
      });
      dispatch(
        CustomerSlice.setCustomersData(
          customersData.filter((ele: any) => ele.id !== customerId)
        )
      );
      setPageList(pageList.filter((ele: any) => ele.id !== customerId))
      dispatch(CustomerSlice.setIsDeleteCustomerBtnClicked(false));
    } else {
      iziToast.info({
        title: TOAST_DEFAULTS.INFO_TITLE,
        message: response?.data?.info
      });
    }
  };

  const checkActionPrivilege = () => {
    if (Number(currentUserRole) === ROLE.EMPLOYEE_ID) {
      return [ACTION_BTN.EDIT];
    } else {
      return [ACTION_BTN.EDIT, ACTION_BTN.DELETE];
    }
  };

  const pagination = () => {
    const start = currentPage * perPageSize - perPageSize;
    const end = Number(start) + perPageSize;
    setPageList(customersData?.length ? customersData.slice(Number(start), end) : []);
  }

  useEffect(() => {
    pagination()
  }, [isCustomersLoading, currentPage]);

  return (
    <>
      <TopPanel panelType='top-panel'>
        <div className='top-panel-entity'>
          {customersData?.length}{' '}
          {customersData?.length > 1 ? 'Customers' : 'Customer'}
        </div>
        <div className='top-panel-buttons'>
          <Button
            type='ghost'
            label='Export CSV'
            onClick={() => console.log('add branch')}
          />
          <Button
            type='primary'
            label='Add Customer'
            onClick={() =>
              dispatch(CustomerSlice.setIsAddCustomerBtnClicked(true))
            }
          />
        </div>
      </TopPanel>
      <Table
        tableName='customer-table'
        columns={columns}
        data={pageList}
        action={checkActionPrivilege()}
        onEdit={handleOnEdit}
        onRemove={handleOnRemove}
      />
      <Pagination
        perPage={perPageSize}
        totalPageRecords={customersData?.length}
        currentPage={currentPage}
        maxVisibleButton={3}
        setCurrentPage={setCurrentPage}
        setPerPageSize={setPerPageSize}
      />
      <ConfirmationModal
        show={isDeleteCustomer}
        name={title}
        actionMode={actionMode}
        onClose={() => {
          dispatch(CustomerSlice.setIsDeleteCustomerBtnClicked(false));
        }}
        onClick={deleteCustomer}
      />
    </>
  );
};
export default CustomerTable;
