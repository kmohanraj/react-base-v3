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
import arrowBack from 'assets/images/back_button.svg';
import useItToRupees from 'hooks/common/useItToRupees';
import Collection from '../collections/Collection';
import CollectionDetails from '../collections/CollectionDetails';

const ManageCustomer = () => {
  const dispatch = useDispatch();

  const {group, isCollectionDetail } = useSelector((state: RootState) => state.group);
  // const { organizationOptions } = useSelector(
  //   (state: RootState) => state.organization
  // );

  const [isMapToCustomer, setIsMapToCustomer] = useState(false);

  const slectedGroup = [
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

  const cutomersData = [
    {
      name: 'Mohanraj Kandasamy',
      code: 'ABCD0012',
      last_month: useItToRupees('2900'),
      current_month: useItToRupees('5600'),
      delevered_position: '1',
    },
    {
      name: 'Santhoash',
      code: 'ABCD0013',
      last_month: useItToRupees('1900'),
      current_month: useItToRupees('1100'),
    },
    {
      name: 'Sakthi',
      code: 'ABCD0014',
      last_month: useItToRupees('1900'),
      current_month: useItToRupees('1100'),
      delevered_position: '2',
    },
    {
      name: 'Ananya',
      code: 'ABCD0015',
      last_month: useItToRupees('1900'),
      current_month: useItToRupees('1100'),
    },
    {
      name: 'Ranjitha',
      code: 'ABCD0016',
      last_month: useItToRupees('1900'),
      current_month: useItToRupees('1100'),
    },
    {
      name: 'Kandasamy',
      code: 'ABCD0017',
      last_month: useItToRupees('1900'),
      current_month: useItToRupees('1100'),
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
        <img src={arrowBack} alt='Back' onClick={handleOnBackBtn} />
        <div>Manage Customers</div>
      </TopPanel>
      <TopPanel panelType="top-panel">
        <span className='top-panel-entity'>Total Customers { cutomersData && cutomersData.length}</span>
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
          {slectedGroup.map((data, i) => (
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
        {cutomersData.map((customer: any) => (
          <section className='item'>
            <div className='customer-info' onClick={() => handleOnCollectionDetails(customer.code)}>
              <div>
                Name: <span>{customer.name}</span>
              </div>
              <div>
                Code: <span>{customer.code}</span>
              </div>
              <div>
                Last Month: <span>{customer.last_month}</span>
              </div>
              <div>
                Current Month: <span>{customer.current_month}</span>
              </div>
            </div>
            <div>
              {customer.delevered_position && (
                <div className='customer-position'>
                  {customer.delevered_position}
                </div>
              )}
              <button
                className='add-collection-btn'
                onClick={() => {
                  dispatch(CustomerSlice.setCurrentCustomerCode(customer.code));
                  handleModalOption(false);
                }}
              >
                +
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
