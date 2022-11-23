import React from 'react';
import TopPanel from 'components/molecules/TopPanel';
import arrowBack from 'assets/images/back_button.svg';
import { setCustomer, setIsAddCustomerBtnClicked } from 'store/slice/customers.slice';
import { useDispatch, useSelector } from 'react-redux';
import Input from 'components/atoms/TextField';
import Button from 'components/atoms/Button';
import { RootState } from 'store';

const AddCustomer = () => {
  const dispatch = useDispatch();
  const { customer } = useSelector((state: RootState) => state.customer)

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value} = e.target;
    dispatch(setCustomer({
      ...customer, [name]: value
    }))

  }
  const handleOnSubmit = () => {
    console.log('submit', customer);
  };
  return (
    <>
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
        <Input
          inputId='org_id'
          value={customer.org_id}
          onChange={handleOnChange}
          placeholder='Select Organization'
          required
        />
        <Input
          inputId='branch_id'
          value={customer.branch_id}
          onChange={handleOnChange}
          placeholder='Select Branch'
          required
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
        <Input
          inputId='gender'
          value={customer.gender}
          onChange={handleOnChange}
          placeholder='Select Gender'
          required
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
          inputId='pin_code'
          value={customer.pin_code}
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
        <Input
          inputId='id_proof'
          value={customer.id_proof}
          onChange={handleOnChange}
          placeholder='Select ID Proof'
          required
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
    </>
  );
};
export default AddCustomer;
