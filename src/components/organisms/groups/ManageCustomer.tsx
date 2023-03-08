import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import 'styles/manage-customer.scss';
import moment from 'moment';
import Modal from 'components/atoms/Modal';
import Button from 'components/atoms/Button';
import * as GroupSlice from 'store/slice/groups.slice';
import * as CustomerSlice from 'store/slice/customers.slice';
import * as ManageCustomerSlice from 'store/slice/manage_customer.slice';
import * as CollectionSlice from 'store/slice/collection.slice';
import CustomerMapping from './CustomerMapping';
import TopPanel from 'components/molecules/TopPanel';
import useItToRupees from 'hooks/common/useItToRupees';
import Collection from '../collections/Collection';
import CollectionDetails from '../collections/CollectionDetails';
import CollectionDetailsTable from '../collections/CollectionDetailsTable';
import { addMoney, backButton, deleteIcon, edit } from 'constants/icons';
import useItToGetAllManages from 'hooks/manage_customer/useItToGetAllManages';
import CONSTANTS from 'constants/constants';
import * as ManageSlice from 'store/slice/manage_customer.slice';
import ConfirmationModal from 'components/molecules/ConfirmationModal';
import * as ManageCustomerService from 'service/manage_customer.service';
import iziToast from 'izitoast';

const { STATUS_CODE, TOAST_DEFAULTS, ROLE } = CONSTANTS;
const ManageCustomer = () => {
  const dispatch = useDispatch();
  const currentUserID = sessionStorage.getItem(
    CONSTANTS.SESSION_STORAGE.USER_ID_KEY
  );
  const currentUserRole = sessionStorage.getItem(
    CONSTANTS.SESSION_STORAGE.ROLE_KEY
  );
  const { group, isCollectionDetail } = useSelector(
    (state: RootState) => state.group
  );
  const {
    manageCustomers,
    isDeleteManageCustomer,
    isEditManageCustomer,
    isAddManageCustomer
  } = useSelector((state: RootState) => state.manage_customer);
  const { isAddCollection } = useSelector(
    (state: RootState) => state.collection
  );
  const [loading] = useItToGetAllManages(
    Number(currentUserID),
    Number(group.id)
  );
  const [title, setTitle] = useState<string>('');
  const [actionMode, setActionMode] = useState<string>('');
  const [manageCustomerId, setManageCustomerId] = useState<number>();

  const selectedGroup = [
    {
      title: 'Group Code:',
      value: group.group_code
    },
    {
      title: 'Chit Amount:',
      value: useItToRupees(group.amount)
    },
    {
      title: 'Total Customers:',
      value: group.total_members
    },
    {
      title: 'Duration:',
      value: group.duration
    },
    {
      title: 'Start Date:',
      value: moment(group.start_date).format('DD/MM/YYYY')
    },
    {
      title: 'End Date:',
      value: moment(group.end_date).format('DD/MM/YYYY')
    }
  ];

  const handleOnBackBtn = () => {
    dispatch(GroupSlice.setIsManageCustomer(false));
  };

  const handleOnCloseModal = () => {
    dispatch(CollectionSlice.setIsAddCollection(false));
    dispatch(ManageCustomerSlice.clearManageCustomer());
    dispatch(ManageCustomerSlice.setIsAddManageCustomer(false));
    dispatch(ManageCustomerSlice.setIsEditManageCustomer(false));
  };

  const handleOnAddCollection = () => {
    dispatch(CollectionSlice.setIsAddCollection(true));
  };

  const handleOnCollectionDetails = (customerCode: number) => {
    dispatch(GroupSlice.setIsCollectionDetail(true));
    dispatch(CustomerSlice.setCurrentCustomerCode(customerCode));
  };
  const handleOnRemove = (manageCustomer: any) => {
    setManageCustomerId(manageCustomer?.id);
    dispatch(ManageCustomerSlice.setIsDeleteManageCustomer(true));
    setTitle(manageCustomer.customer_code);
    setActionMode('Delete');
  };

  const handleOnEditManageCustomer = (manage: any) => {
    dispatch(ManageCustomerSlice.setManageCustomer(manage));
    dispatch(ManageCustomerSlice.setIsEditManageCustomer(true));
  };

  const deleteManageCustomer = async () => {
    const response = await ManageCustomerService.remove(
      Number(manageCustomerId),
      Number(currentUserID)
    );
    if (response?.status === STATUS_CODE.STATUS_200) {
      iziToast.success({
        title: TOAST_DEFAULTS.SUCCESS_TITLE,
        message: response?.data?.info
      });
      dispatch(
        ManageCustomerSlice.setManageCustomers(
          manageCustomers.filter((ele: any) => ele.id !== manageCustomerId)
        )
      );
      dispatch(ManageCustomerSlice.setIsDeleteManageCustomer(false));
    } else {
      iziToast.info({
        title: TOAST_DEFAULTS.SUCCESS_TITLE,
        message: response?.data?.info
      });
    }
  };

  const checkPrivilege = () => {
    if (Number(currentUserRole) === ROLE.EMPLOYEE_ID) {
      return false;
    } else {
      return true;
    }
  };

  if (isCollectionDetail) {
    return <CollectionDetailsTable />;
  }
  console.log('(((((', manageCustomers);
  return (
    <>
      <TopPanel panelType='breadcrumb'>
        <img src={backButton} alt='Back' onClick={handleOnBackBtn} />
        <div>Manage Customers</div>
      </TopPanel>
      <TopPanel panelType='top-panel'>
        <span className='top-panel-entity'>
          Total Customers {manageCustomers && manageCustomers.length}
        </span>
        <div className='top-panel-buttons'>
          {checkPrivilege() && (
            <Button
              type='primary'
              label='Manage Customer'
              onClick={() => {
                dispatch(ManageCustomerSlice.setIsAddManageCustomer(true));
              }}
            />
          )}
        </div>
      </TopPanel>

      <section className='manage-customer'>
        <section className='section'>
          {selectedGroup.map((data, i) => (
            <section key={i} className='group-content'>
              <div className='name'>{data.title}</div>
              <div className='value'>{data.value}</div>
            </section>
          ))}
        </section>
        <section className='section'>
          <h1>Due Left Customer List</h1>
        </section>
      </section>
      <section className='customer-section'>
        {manageCustomers.map((manage: any, index: number) => (
          <section className='item' key={index}>
            <div
              className='customer-info'
              onClick={() => {
                handleOnCollectionDetails(manage.customer_code);
                sessionStorage.setItem(
                  CONSTANTS.SESSION_STORAGE.CURRENT_MANAGE_CUSTOMER_ID,
                  manage.id
                );
                dispatch(ManageSlice.setSelectedManage(manage));
              }}
            >
              <div>
                Name: <span>{manage.customer_name}</span>
              </div>
              <div>
                Code: <span>{manage.customer_code}</span>
              </div>
              <div>
                Last Month: <span>{manage?.last_month}</span>
              </div>
              <div>
                Current Month: <span>{manage?.current_month}</span>
              </div>
            </div>
            <div className='actions'>
              {manage.taken_position && (
                <div className='customer-position'>{manage.taken_position}</div>
              )}
              <button
                className='add-collection-btn'
                onClick={() => handleOnEditManageCustomer(manage)}
              >
                <img src={edit} alt='Edit' />
              </button>
              <button
                className='add-collection-btn'
                onClick={() => {
                  dispatch(
                    CustomerSlice.setCurrentCustomerCode(manage.customer_code)
                  );
                  handleOnAddCollection();
                }}
              >
                <img src={addMoney} alt='Add Money' />
              </button>
              <button
                className='add-collection-btn'
                onClick={() => handleOnRemove(manage)}
              >
                <img src={deleteIcon} alt='Delete' />
              </button>
            </div>
          </section>
        ))}
      </section>
      <Modal
        show={isEditManageCustomer || isAddManageCustomer}
        onClose={handleOnCloseModal}
      >
        <CustomerMapping currentGroupId={group.id} />
      </Modal>
      <Modal show={isAddCollection} onClose={handleOnCloseModal}>
        <Collection />
      </Modal>
      <ConfirmationModal
        show={isDeleteManageCustomer}
        name={title}
        actionMode={actionMode}
        onClose={() => {
          dispatch(ManageCustomerSlice.setIsDeleteManageCustomer(false));
        }}
        onClick={deleteManageCustomer}
      />
    </>
  );
};

export default ManageCustomer;
