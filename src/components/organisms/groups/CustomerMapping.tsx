import React, { FC, lazy, useEffect } from 'react';
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
import useItToGetAllManages from 'hooks/manage_customer/useItToGetAllManages';
import { collectionTypeOptions } from 'constants/options'
const Select = lazy(() => import('components/atoms/Select'));


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

  const { group } = useSelector((state: RootState) => state.group);
  const [loading, handleRefreshManage] = useItToGetAllManages(Number(currentUserID), Number(group?.id))

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
        [name]: checkInputType(name, value)
      })
    );
  };

  const checkInputType = (name: string, value: string) => {
    if (name === 'taken_amount') {
      return value.replace(/[^0-9]+/g, '').substring(0,8)
    } else if (name === 'taken_position') {
      return value.replace(/[^0-9]+/g, '').substring(0,2)
    } else {
      return value
    }
  }

  const handleOnSubmit = () => {
    const { group_id, ...filterData } =
      manageCustomer;
    const payload = {
      ...filterData,
      group_id: currentGroupId && currentGroupId,
      org_id: Number(sessionStorage.getItem(SESSION_STORAGE.CURRENT_ORG_ID))
    };
    if (isEditManageCustomer) {
      updateManageCustomer(payload);
    } else {
      const { id, customer_name, customer_code, ...filterData } = payload;
      createManageCustomer(filterData);
    }
  };

  const createManageCustomer = async (createData: any) => {
    const {taken_position, taken_amount, ...payload} = createData;
    const response = await ManageCustomerService.create(
      payload,
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
      handleRefreshManage(true)
    } else {
      iziToast.info({
        title: CONSTANTS.TOAST_DEFAULTS.INFO_TITLE,
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
    }
    return options;
  };

  const checkRequiredFiled = () => {
    if (isEditManageCustomer) {
      return !manageCustomer.customer_id || !manageCustomer.collection_type_id || !manageCustomer.taken_position || !manageCustomer.taken_amount
    } else {
      return !manageCustomer.customer_id || !manageCustomer.collection_type_id
    }
  }

  const handleOneClear = (field: any) => {
    dispatch(ManageCustomerSlice.setManageCustomer({
      ...manageCustomer, [field]: null
    }))
  }

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
          isDisabled={isEditManageCustomer}
          onClear={handleOneClear}
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
          isDisabled={isEditManageCustomer}
          onClear={handleOneClear}
        />
        {isEditManageCustomer && (
          <>
            <Input
              inputId='taken_amount'
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
          disabled={checkRequiredFiled()}
        />
      </div>
    </div>
  );
};
export default CustomerMapping;
