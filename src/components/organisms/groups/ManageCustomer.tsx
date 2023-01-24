import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import 'styles/manage-customer.scss';
import moment from 'moment';
import Modal from 'components/atoms/Modal';
import Button from 'components/atoms/Button';
import * as GroupSlice from 'store/slice/groups.slice';
import * as CustomerSlice from 'store/slice/customers.slice';
import CustomerMapping from './CustomerMapping';
import TopPanel from 'components/molecules/TopPanel';
import useItToRupees from 'hooks/common/useItToRupees';
import Collection from '../collections/Collection';
import CollectionDetails from '../collections/CollectionDetails';
import { addMoney, backButton } from 'constants/icons';
import useItToGetAllManages from 'hooks/manage_customer/useItToGetAllManages';
import CONSTANTS from 'constants/constants';
import * as ManageSlice from 'store/slice/manage_customer.slice';

const ManageCustomer = () => {
  const dispatch = useDispatch();
  const currentUserID = sessionStorage.getItem(CONSTANTS.SESSION_STORAGE.USER_ID_KEY)

  const {group, isCollectionDetail } = useSelector((state: RootState) => state.group);
  const { manage_customers } = useSelector((state: RootState) => state.manage_customer)
  const [loading] = useItToGetAllManages(Number(currentUserID))

  const [isMapToCustomer, setIsMapToCustomer] = useState(false);

  const selectedGroup = [
    {
      title: 'Group Code:',
      value: group.group_code,
    },
    {
      title: 'Chit Amount:',
      value: useItToRupees(group.amount),
    },
    {
      title: 'Total Customers:',
      value: group.total_members,
    },
    {
      title: 'Duration:',
      value: group.duration,
    },
    {
      title: 'Start Date:',
      value: moment(group.start_date).format('DD/MM/YYYY'),
    },
    {
      title: 'End Date:',
      value: moment(group.end_date).format('DD/MM/YYYY'),
    },
  ];

  const handleOnBackBtn = () => {
    dispatch(GroupSlice.setIsManageCustomerBtnClicked(false));
  };

  const handleModalOption = (isMapToCustomer: boolean) => {
    setIsMapToCustomer(isMapToCustomer);
    dispatch(GroupSlice.setIsModalShow(true));
  };

  const handleOnCloseModal = () => {
    dispatch(GroupSlice.setIsModalShow(false))
  }

  const handleOnCollectionDetails = (customerCode: number) => {
    dispatch(GroupSlice.setIsCollectionDetail(true))
    dispatch(CustomerSlice.setCurrentCustomerCode(customerCode))
  }

  if (isCollectionDetail) {
    return <CollectionDetails />
  }

  return (
    <>
      <TopPanel panelType='breadcrumb'>
        <img src={backButton} alt='Back' onClick={handleOnBackBtn} />
        <div>Manage Customers</div>
      </TopPanel>
      <TopPanel panelType="top-panel">
        <span className='top-panel-entity'>Total Customers { manage_customers && manage_customers.length}</span>
        <div className='top-panel-buttons'>
          <Button
            type='primary'
            label='Manage Customer'
            onClick={() => handleModalOption(true)}
          />
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
          <h1>Created Customer</h1>
        </section>
      </section>
      <section className='customer-section'>
        {manage_customers.map((manage: any) => (
          <section className='item'>
            <div className='customer-info' onClick={() => {
                handleOnCollectionDetails(manage.customer_code)
                sessionStorage.setItem(CONSTANTS.SESSION_STORAGE.CURRENT_MANAGE_CUSTOMER_ID, manage.id)
                dispatch(ManageSlice.setSelectedManage(manage))
              }
            }>
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
            <div>
              {manage.taken_position && (
                <div className='customer-position'>
                  {manage.taken_position}
                </div>
              )}
              <button
                className='add-collection-btn'
                onClick={() => {
                  dispatch(CustomerSlice.setCurrentCustomerCode(manage.code));
                  handleModalOption(false);
                }}
              >
                <img src={addMoney} alt="Add Money" />
              </button>
            </div>
          </section>
        ))}
      </section>
      <Modal onClose={handleOnCloseModal}>
        {isMapToCustomer ? (
          <CustomerMapping currentGroupId={group.id} />
        ) : (
          <Collection />
        )}
      </Modal>
    </>
  );
};

export default ManageCustomer;
