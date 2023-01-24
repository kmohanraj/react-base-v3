import React from 'react';
import TopPanel from 'components/molecules/TopPanel';
import { backButton } from 'constants/icons';
import * as CustomerSlice from 'store/slice/customers.slice';
import { useDispatch, useSelector } from 'react-redux';
import Input from 'components/atoms/TextField';
import Button from 'components/atoms/Button';
import { RootState } from 'store';
import Select from 'components/atoms/Select';
import useItToGetOrganizations from 'hooks/organization/useItToGetOrganizations';
import useToGetBranches from 'hooks/branch/useToGetBranches';
import CONSTANTS from 'constants/constants';
import * as customerService from 'service/customer.service';

const genderOptions = [
  {
    id: 1,
    label: 'Male'
  },
  {
    id: 2,
    label: 'Female'
  }
]

const idProofOptions = [
  {
    id: 1,
    label: 'Aadhar Card'
  },
  {
    id: 2,
    label: 'Votter Id'
  },
  {
    id: 3,
    label: 'Driving License'
  }
]

const AddCustomer = () => {
  const dispatch = useDispatch();
  const { customer, isEditCustomerBtnClicked } = useSelector((state: RootState) => state.customer)
  const { organizationOptions } = useSelector((state: RootState) => state.organization)
  const { branchOptions } = useSelector((state: RootState) => state.branch)
  const currentUserID = sessionStorage.getItem(CONSTANTS.SESSION_STORAGE.USER_ID_KEY)
  const [isOrgLoading] = useItToGetOrganizations(Number(currentUserID));
  const [isBranchLoading] = useToGetBranches(Number(currentUserID));

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value} = e.target;
    dispatch(CustomerSlice.setCustomer({
      ...customer, [name]: value
    }))
  }

  const handleOnSelect = (value: any, fieldName: string) => {
    dispatch(CustomerSlice.setCustomer({
      ...customer, [fieldName]: value.id
    }))
  }

  const handleOnSubmit = async () => {
    console.log('submit', customer);
    const response = await customerService.create(customer, Number(currentUserID))
    if (response) {
      dispatch(CustomerSlice.setIsAddCustomerBtnClicked(false))
    }
  };

  const handleCheckCondition = () => {
    dispatch(CustomerSlice.setIsAddCustomerBtnClicked(false))
    dispatch(CustomerSlice.clearCustomer())
    dispatch(CustomerSlice.setIsEditCustomerBtnClicked(false))
  }

  const checkCurrentOption = (options: any, value: any) => {
    if (isEditCustomerBtnClicked) {
      return options.filter((option: any) => option.id === value)[0]
    } else {
      return options[0]
    }
  }
  
  return (
    <>
      <div className='form-section'>
        <TopPanel panelType='breadcrumb'>
          <img
            src={backButton}
            alt='Back'
            onClick={handleCheckCondition}
          />
          <div>{isEditCustomerBtnClicked ? 'Update' : 'Create' }</div>
        </TopPanel>
        <div className='chit-form'>
          <Input
            inputId='customer_code'
            value={customer.customer_code}
            onChange={handleOnChange}
            placeholder='Enter Customer code'
            required
          />
          <Select
            inputId='org_id'
            placeholder='Select Organization'
            required
            options={organizationOptions}
            isLoading={isOrgLoading}
            value={checkCurrentOption(organizationOptions, customer.org_id)}
            onSelect={(value) => handleOnSelect(value, 'org_id')}
          />
          <Select
            inputId='branch_id'
            placeholder='Select Branch'
            required
            options={branchOptions}
            isLoading={isBranchLoading}
            value={checkCurrentOption(branchOptions, customer.branch_id)}
            onSelect={(value) => handleOnSelect(value, 'branch_id')}
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
          <Button
            type='ghost'
            label='Cancel'
            onClick={handleCheckCondition}
          />
          <Button
            type='primary'
            label={isEditCustomerBtnClicked ? 'Update' : 'Create' }
            onClick={handleOnSubmit}
          />
        </div>
      </div>
    </>
  );
};
export default AddCustomer;
