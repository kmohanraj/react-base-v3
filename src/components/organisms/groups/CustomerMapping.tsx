import React, { FC, useEffect } from 'react';
import Select from 'components/atoms/Select';
import useItToGetCustomers from 'hooks/customer/useItToGetCustomers';
import CONSTANTS from 'constants/constants';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import Button from 'components/atoms/Button';
import TopPanel from 'components/molecules/TopPanel';
import * as ManageCustomerSlice from 'store/slice/manage_customer.slice';
import * as ManageCustomerService from 'service/manage_customer.service';
import Input from 'components/atoms/TextField';
import moment from 'moment';
import { AxiosResponse } from 'axios';
import iziToast from 'izitoast';
import { ISelectOption } from 'types/components.types';

const collectionTypeOptions = [
  {
    id: 1,
    label: 'Daily'
  },
  {
    id: 2,
    label: 'Monthly'
  },
  {
    id: 3,
    label: 'Weekly'
  }
];

type CustomerMappingProps = {
  currentGroupId: number | null;
};

const { SESSION_STORAGE, STATUS_CODE } = CONSTANTS;

const CustomerMapping: FC<CustomerMappingProps> = ({ currentGroupId }) => {
  const dispatch = useDispatch();
  const currentUserID = sessionStorage.getItem(SESSION_STORAGE.USER_ID_KEY);
  const [isCustomerLoading] = useItToGetCustomers(Number(currentUserID));
  const { customerOptions } = useSelector((state: RootState) => state.customer);
  const { manageCustomer, isEditManageCustomer } = useSelector(
    (state: RootState) => state.manage_customer
  );

  const handleOnSelect = (value: ISelectOption, fieldName: string) => {
    dispatch(
      ManageCustomerSlice.setManageCustomer({
        ...manageCustomer,
        [fieldName]: value.id
      })
    );
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(
      ManageCustomerSlice.setManageCustomer({
        ...manageCustomer,
        [name]: value
      })
    );
  };

  const handleOnSubmit = () => {
    const { group_id, taken_amount, taken_position, ...filterData } =
      manageCustomer;
    const payload = {
      ...filterData,
      group_id: currentGroupId && currentGroupId,
      org_id: Number(sessionStorage.getItem(SESSION_STORAGE.CURRENT_ORG_ID))
    };
    if (isEditManageCustomer) {
      updateManageCustomer(payload);
    } else {
      // delete payload.id
      const { id, customer_name, customer_code, ...filterData } = payload;
      createManageCustomer(filterData);
    }
  };

  const createManageCustomer = async (createData: any) => {
    const response = await ManageCustomerService.create(
      createData,
      Number(currentUserID)
    );
    toastMessage(response);
  };

  const updateManageCustomer = async (payload: any) => {
    let {
      id,
      customer_name,
      customer_code,
      taken_at,
      taken_position,
      ...updateData
    } = payload;
    const today = moment().utcOffset(330).format();
    const payloadData = {
      id: id,
      data: {
        ...updateData,
        taken_at: today,
        taken_position: taken_position !== 0 ? Number(taken_position) : null
      }
    };
    const response = await ManageCustomerService.update(
      payloadData,
      Number(currentUserID)
    );
    toastMessage(response);
  };

  const toastMessage = (response: AxiosResponse) => {
    if (response.status === STATUS_CODE.STATUS_200) {
      dispatch(ManageCustomerSlice.setIsAddManageCustomer(false));
      dispatch(ManageCustomerSlice.setIsEditManageCustomer(false));
      dispatch(ManageCustomerSlice.clearManageCustomer());
      iziToast.success({
        title: CONSTANTS.TOAST_DEFAULTS.SUCCESS_TITLE,
        message: response?.data?.info
      });
    }
    if (response?.status === STATUS_CODE.STATUS_409) {
      iziToast.info({
        title: CONSTANTS.TOAST_DEFAULTS.SUCCESS_TITLE,
        message: response?.data?.info
      });
    }
  };
  const handleCheckCondition = () => {
    dispatch(ManageCustomerSlice.setIsAddManageCustomer(false));
    dispatch(ManageCustomerSlice.clearManageCustomer());
    dispatch(ManageCustomerSlice.setIsEditManageCustomer(false));
  };

  const checkCurrentOption = (options: any, value: any) => {
    if (isEditManageCustomer) {
      return options.filter((option: any) => option.id === value)[0];
    } else {
      return options[0];
    }
  };

  useEffect(() => {}, [isEditManageCustomer, isCustomerLoading]);

  return (
    <div className='form-section'>
      <TopPanel panelType='breadcrumb'>
        <div>
          {isEditManageCustomer
            ? 'Update Customer Mapping'
            : 'Add Customer Mapping'}
        </div>
      </TopPanel>
      <div className='chit-form'>
        <Select
          inputId='customer_id'
          placeholder='Select Customer'
          required
          value={checkCurrentOption(
            customerOptions,
            manageCustomer.customer_id
          )}
          onSelect={(value: any) => handleOnSelect(value, 'customer_id')}
          options={customerOptions}
          isLoading={isCustomerLoading}
        />
        <Select
          inputId='collection_type_id'
          placeholder='Select Collection Type'
          required
          value={checkCurrentOption(
            collectionTypeOptions,
            manageCustomer.collection_type_id
          )}
          onSelect={(value: any) => handleOnSelect(value, 'collection_type_id')}
          options={collectionTypeOptions}
        />
        {isEditManageCustomer && (
          <>
            <Input
              inputId='taken_amount'
              inputType='number'
              value={manageCustomer.taken_amount}
              onChange={handleOnChange}
              placeholder='Withdraw amount'
              required
            />
            <Input
              inputId='taken_at'
              value={moment().format('DD/MM/YYYY')}
              onChange={handleOnChange}
              placeholder='Taken Date'
              required
              isDisabled
            />
            <Input
              inputId='taken_position'
              inputType='number'
              value={manageCustomer.taken_position}
              onChange={handleOnChange}
              placeholder='Withdraw Position'
              required
            />
          </>
        )}
      </div>
      <div className='form-submit'>
        <Button type='ghost' label='Cancel' onClick={handleCheckCondition} />
        <Button
          type='primary'
          label={isEditManageCustomer ? 'Update' : 'Create'}
          onClick={handleOnSubmit}
          disabled={
            !manageCustomer.customer_id || !manageCustomer.collection_type_id
          }
        />
      </div>
    </div>
  );
};
export default CustomerMapping;
