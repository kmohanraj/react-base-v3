import React, { FC } from 'react';
import Input from 'components/atoms/TextField';
import TopPanel from 'components/molecules/TopPanel';
import arrowBack from 'assets/images/back_button.svg';
import { setIsAddOrgBtnClicked, setOrganization } from 'store/slice/organizations.slice';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'components/atoms/Button';
import 'styles/chit-form.scss';
import type { RootState } from 'store';


const AddOrganization: FC = () => {
  const dispatch = useDispatch();
  const { organization } = useSelector((state: RootState) => state.organization);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    console.error(name, value)
    dispatch(setOrganization({
      ...organization, [name]: value
    }))
  }

  const handleOnSubmit = () => {
    console.log('submit', organization);
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
          value={organization.org_name}
          onChange={handleOnChange}
          placeholder='Enter Organization Name'
          required
        />

        <Input
          inputId='org_email'
          value={organization.org_email}
          onChange={handleOnChange}
          placeholder='Enter Organization Mail'
          required
        />

        <Input
          inputId='branch_limit'
          value={organization.branch_limit}
          onChange={handleOnChange}
          placeholder='Enter Branch Limit'
          required
        />

        <Input
          inputId='org_logo'
          value={organization.org_logo}
          onChange={handleOnChange}
          placeholder='Upload Organization Logo'
          required
        />

        <Input
          inputId='org_phone'
          value={organization.org_phone}
          onChange={handleOnChange}
          placeholder='Enter Phone'
          required
        />

        <Input
          inputId='org_address'
          value={organization.org_address}
          onChange={handleOnChange}
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
