import React from 'react';
import TopPanel from 'components/molecules/TopPanel';
import arrowBack from 'assets/images/back_button.svg';
import { setCustomer, setIsAddCustomerBtnClicked } from 'store/slice/customers.slice';
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
  const { customer } = useSelector((state: RootState) => state.customer)
  const { organizationOptions } = useSelector((state: RootState) => state.organization)
  const { branchOptions } = useSelector((state: RootState) => state.branch)
  const currentUserID = sessionStorage.getItem(CONSTANTS.SESSION_STORAGE.USER_ID_KEY)
  const [isOrgLoading] = useItToGetOrganizations(Number(currentUserID));
  const [isBranchLoading] = useToGetBranches(Number(currentUserID));

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value} = e.target;
    dispatch(setCustomer({
      ...customer, [name]: value
    }))
  }

  const handleOnSelect = (value: any, fieldName: string) => {
    dispatch(setCustomer({
      ...customer, [fieldName]: value.id
    }))
  }

  const handleOnSubmit = async () => {
    console.log('submit', customer);
    // const response = await customerService.create(customer, Number(currentUserID))
    // console.log('response---', response)
    // if (response) {
    //   dispatch(setIsAddCustomerBtnClicked(false))
    // }
  };

  return (
    <>
      <div className='form-section'>
        <TopPanel panelType='breadcrumb'>
          <img
            src={arrowBack}
            alt='Back'
            onClick={() => dispatch(setIsAddCustomerBtnClicked(false))}
          />
          <div>Create</div>
        </TopPanel>
        <div className='chit-form'>
          <Input
            inputId='customer_id'
            value={customer.customer_id}
            onChange={handleOnChange}
            placeholder='Enter Customer ID'
            required
          />
          <Select
            inputId='org_id'
            placeholder='Select Organization'
            required
            options={organizationOptions}
            isLoading={isOrgLoading}
            value={customer.org_id}
            onSelect={(value) => handleOnSelect(value, 'org_id')}
          />
          <Select
            inputId='branch_id'
            placeholder='Select Branch'
            required
            options={branchOptions}
            isLoading={isBranchLoading}
            value={customer.branch_id}
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
            value={customer.gender}
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
            inputId='id_prrof'
            placeholder='Select ID Proof'
            required
            options={idProofOptions}
            value={customer.id_proof}
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
            onClick={() => dispatch(setIsAddCustomerBtnClicked(false))}
          />
          <Button
            type='primary'
            label='Create'
            onClick={handleOnSubmit}
          />
        </div>
      </div>
    </>
  );
};
export default AddCustomer;
