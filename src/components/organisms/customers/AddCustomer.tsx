import TopPanel from 'components/molecules/TopPanel';
import arrowBack from 'assets/images/back_button.svg';
import { setIsAddCustomerBtnClicked } from 'store/slice/customers.slice';
import { useDispatch } from 'react-redux';
import Input from 'components/atoms/TextField';
import Button from 'components/atoms/Button';

const AddCustomer = () => {
  const dispatch = useDispatch();

  const handleOnSubmit = () => {
    console.log('submit');
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
          value=''
          onChange={() => {}}
          placeholder='Enter Customer ID'
          required
        />
        <Input
          inputId='org_id'
          value=''
          onChange={() => {}}
          placeholder='Select Organization'
          required
        />
        <Input
          inputId='branch_id'
          value=''
          onChange={() => {}}
          placeholder='Select Branch'
          required
        />
        <Input
          inputId='customer_name'
          value=''
          onChange={() => {}}
          placeholder='Enter Name'
          required
        />
        <Input
          inputId='age'
          value=''
          onChange={() => {}}
          placeholder='Enter Age'
          required
        />
        <Input
          inputId='gender'
          value=''
          onChange={() => {}}
          placeholder='Select Gender'
          required
        />
        <Input
          inputId='phone'
          value=''
          onChange={() => {}}
          placeholder='Enter Phone'
          required
        />
        <Input
          inputId='alter_phone'
          value=''
          onChange={() => {}}
          placeholder='Enter Alternative Phone'
          required
        />
        <Input
          inputId='address'
          value=''
          onChange={() => {}}
          placeholder='Enter Address'
          required
        />
        <Input
          inputId='pin_code'
          value=''
          onChange={() => {}}
          placeholder='Enter Pincode'
          required
        />
        <Input
          inputId='nominee_name'
          value=''
          onChange={() => {}}
          placeholder='Enter Nominee Name'
          required
        />
        <Input
          inputId='nominee_phone'
          value=''
          onChange={() => {}}
          placeholder='Enter Nominee Phone'
          required
        />
        <Input
          inputId='id_proof'
          value=''
          onChange={() => {}}
          placeholder='Select ID Proof'
          required
        />
        <Input
          inputId='locality'
          value=''
          onChange={() => {}}
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
          onClick={() => handleOnSubmit()}
        />
      </div>
    </>
  );
};
export default AddCustomer;
