import { FC } from 'react';
import Input from 'components/atoms/TextField';
import TopPanel from 'components/molecules/TopPanel';
import arrowBack from 'assets/images/back_button.svg';
import { setIsAddOrgBtnClicked } from 'store/slice/organizations.slice';
import { useDispatch } from 'react-redux';
import Button from 'components/atoms/Button';
import 'styles/chit-form.scss';

const AddOrganization: FC = () => {
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
          onClick={() => dispatch(setIsAddOrgBtnClicked(false))}
        />
        <div>Create</div>
      </TopPanel>
      <div className='chit-form'>
        <Input
          inputId='org_name'
          value=''
          onChange={() => {}}
          placeholder='Enter Organization Name'
          required
        />

        <Input
          inputId='org_email'
          value=''
          onChange={() => {}}
          placeholder='Enter Organization Mail'
          required
        />

        <Input
          inputId='branch_limit'
          value=''
          onChange={() => {}}
          placeholder='Enter Branch Limit'
          required
        />

        <Input
          inputId='org_logo'
          value=''
          onChange={() => {}}
          placeholder='Upload Organization Logo'
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
          inputId='address'
          value=''
          onChange={() => {}}
          placeholder='Enter Organization Address'
          required
        />
      </div>
      <div className='form-submit'>
        <Button
          type='ghost'
          label='Cancel'
          onClick={() => dispatch(setIsAddOrgBtnClicked(false))}
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
export default AddOrganization;
