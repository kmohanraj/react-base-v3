import React, { lazy, useEffect } from 'react';
import TopPanel from 'components/molecules/TopPanel';
import { backButton } from 'constants/icons';
import * as CustomerSlice from 'store/slice/customers.slice';
import { useDispatch, useSelector } from 'react-redux';
import Input from 'components/atoms/TextField';
import Button from 'components/atoms/Button';
import { RootState } from 'store';
import useItToGetOrganizations from 'hooks/organization/useItToGetOrganizations';
import useToGetBranches from 'hooks/branch/useToGetBranches';
import CONSTANTS from 'constants/constants';
import * as customerService from 'service/customer.service';
import { AxiosResponse } from 'axios';
import iziToast from 'izitoast';
import { ISelectOption } from 'types/components.types';
import { genderOptions, idProofOptions } from 'constants/options';
const Select = lazy(() => import('components/atoms/Select'));

const { STATUS_CODE } = CONSTANTS;

const AddCustomer = () => {
  const dispatch = useDispatch();
  const { customer, isEditCustomer } = useSelector(
    (state: RootState) => state.customer
  );
  const { branchOptions } = useSelector((state: RootState) => state.branch);
  const currentUserID = sessionStorage.getItem(
    CONSTANTS.SESSION_STORAGE.USER_ID_KEY
  );
  const [isOrgLoading] = useItToGetOrganizations(Number(currentUserID));
  const { organizationOptions } = useSelector(
    (state: RootState) => state.organization
  );
  const [isBranchLoading] = useToGetBranches(Number(currentUserID));

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(
      CustomerSlice.setCustomer({
        ...customer,
        [name]: checkInputType(name, value)
      })
    );
  };

  const checkInputType = (name: string, value: string) => {
    if (name === 'customer_code') {
      return value.replace(/[^0-9A-Z]+/g, '');
    } else if (
      name === 'phone' ||
      name === 'alter_phone' ||
      name === 'nominee_phone'
    ) {
      return value.replace(/[^0-9]+/g, '').substring(0, 10);
    } else if (name === 'pincode') {
      return value.replace(/[^0-9]+/g, '').substring(0, 6);
    } else if (name === 'age') {
      return value.replace(/[^0-9]+/g, '').substring(0, 2);
    } else if(name === 'address') {
      return value.replace(/[^a-zA-Z0-9\s,.'-]+/g, '').replace(/\s+\s+/g, '');
    } else {
      return value.replace(/[^a-zA-Z\s]+/g, '').replace(/\s+\s+/g, '');
    }
  };

  const handleOnSelect = (value: ISelectOption, fieldName: string) => {
    dispatch(
      CustomerSlice.setCustomer({
        ...customer,
        [fieldName]: value.id
      })
    );
  };

  const handleOnSubmit = () => {
    isEditCustomer ? updateBranch() : createCustomer();
  };

  const createCustomer = async () => {
    const { id, organizations, branches, ...data } = customer;
    const response = await customerService.create(data, Number(currentUserID));
    toastMessage(response);
  };
  const updateBranch = async () => {
    const { id, organizations, branches, ...data } = customer;
    const payload = { id: id, data: data };
    const response = await customerService.update(
      payload,
      Number(currentUserID)
    );
    toastMessage(response);
  };

  const toastMessage = (response: AxiosResponse) => {
    if (response.status === STATUS_CODE.STATUS_200) {
      dispatch(CustomerSlice.setIsAddCustomerBtnClicked(false));
      dispatch(CustomerSlice.clearCustomer());
      iziToast.success({
        title: CONSTANTS.TOAST_DEFAULTS.SUCCESS_TITLE,
        message: response?.data?.info
      });
    } else {
      iziToast.info({
        title: CONSTANTS.TOAST_DEFAULTS.SUCCESS_TITLE,
        message: response?.data?.info
      });
    }
  };

  const handleCheckCondition = () => {
    dispatch(CustomerSlice.setIsAddCustomerBtnClicked(false));
    dispatch(CustomerSlice.clearCustomer());
    dispatch(CustomerSlice.setIsEditCustomerBtnClicked(false));
  };

  const checkCurrentOption = (options: any, value: any) => {
    if (isEditCustomer) {
      return options.filter((option: any) => option.id === value)[0];
    }
    return options;
  };

  const handleOneClear = (field: any) => {
    dispatch(
      CustomerSlice.setCustomer({
        ...customer,
        [field]: null
      })
    );
  };

  useEffect(() => {}, [isOrgLoading, organizationOptions]);
  return (
    <>
      <div className='form-section'>
        <TopPanel panelType='breadcrumb'>
          <img src={backButton} alt='Back' onClick={handleCheckCondition} />
          <div>{isEditCustomer ? 'Update' : 'Create'}</div>
        </TopPanel>
        <div className='chit-form'>
          <Input
            inputId='customer_code'
            value={customer.customer_code}
            onChange={handleOnChange}
            placeholder='Enter Customer code'
            required
            message='Ex, ABCD0001'
          />
          <Select
            inputId='org_id'
            placeholder='Select Organization'
            required
            options={organizationOptions}
            isLoading={isOrgLoading}
            value={checkCurrentOption(organizationOptions, customer.org_id)}
            onSelect={(value) => handleOnSelect(value, 'org_id')}
            onClear={handleOneClear}
          />
          <Select
            inputId='branch_id'
            placeholder='Select Branch'
            required
            options={branchOptions}
            isLoading={isBranchLoading}
            value={checkCurrentOption(branchOptions, customer.branch_id)}
            onSelect={(value) => handleOnSelect(value, 'branch_id')}
            onClear={handleOneClear}
          />
          <Input
            inputId='customer_name'
            value={customer.customer_name}
            onChange={handleOnChange}
            placeholder='Enter Name'
            required
          />
          <Input
            inputId='age'
            value={customer.age}
            onChange={handleOnChange}
            placeholder='Enter Age'
            required
          />
          <Select
            inputId='gender'
            placeholder='Select Gender'
            required
            options={genderOptions}
            value={checkCurrentOption(genderOptions, customer.gender)}
            onSelect={(value) => handleOnSelect(value, 'gender')}
            onClear={handleOneClear}
          />
          <Input
            inputId='phone'
            value={customer.phone}
            onChange={handleOnChange}
            placeholder='Enter Phone'
            required
          />
          <Input
            inputId='alter_phone'
            value={customer.alter_phone}
            onChange={handleOnChange}
            placeholder='Enter Alternative Phone'
            required
          />
          <Input
            inputId='address'
            value={customer.address}
            onChange={handleOnChange}
            placeholder='Enter Address'
            required
          />
          <Input
            inputId='pincode'
            value={customer.pincode}
            onChange={handleOnChange}
            placeholder='Enter Pincode'
            required
          />
          <Input
            inputId='nominee_name'
            value={customer.nominee_name}
            onChange={handleOnChange}
            placeholder='Enter Nominee Name'
            required
          />
          <Input
            inputId='nominee_phone'
            value={customer.nominee_phone}
            onChange={handleOnChange}
            placeholder='Enter Nominee Phone'
            required
          />
          <Select
            inputId='id_proof'
            placeholder='Select ID Proof'
            required
            options={idProofOptions}
            value={checkCurrentOption(idProofOptions, customer.id_proof)}
            onSelect={(value) => handleOnSelect(value, 'id_proof')}
            onClear={handleOneClear}
          />
          <Input
            inputId='locality'
            value={customer.locality}
            onChange={handleOnChange}
            placeholder='Select Locality'
            required
          />
        </div>
        <div className='form-submit'>
          <Button type='ghost' label='Cancel' onClick={handleCheckCondition} />
          <Button
            type='primary'
            label={isEditCustomer ? 'Update' : 'Create'}
            onClick={handleOnSubmit}
            disabled={
              !customer.customer_code ||
              !customer.org_id ||
              !customer.branch_id ||
              !customer.customer_name ||
              !customer.age ||
              !customer.gender ||
              !customer.phone ||
              !customer.alter_phone ||
              !customer.address ||
              !customer.pincode ||
              !customer.nominee_name ||
              !customer.nominee_phone ||
              !customer.id_proof ||
              !customer.locality
            }
          />
        </div>
      </div>
    </>
  );
};
export default AddCustomer;
