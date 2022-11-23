import React, { FC } from 'react';
import TopPanel from 'components/molecules/TopPanel';
import arrowBack from 'assets/images/back_button.svg';
import { setBranch, setIsAddBranchBtnClicked } from 'store/slice/branchs.slice';
import { useDispatch, useSelector } from 'react-redux';
import Input from 'components/atoms/TextField';
import 'styles/chit-form.scss';
import Button from 'components/atoms/Button';
import type { RootState } from 'store';

const AddBranch: FC = () => {
  const dispatch = useDispatch();
  const { branch } = useSelector((state: RootState) => state.branch)

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    dispatch(setBranch({
      ...branch, [name]: value
    }))
  }
  const handleOnSubmit = () => {
    console.log('submit', branch);
  };

  return (
    <>
      <TopPanel panelType='breadcrumb'>
        <img
          src={arrowBack}
          alt='Back'
          onClick={() => dispatch(setIsAddBranchBtnClicked(false))}
        />
        <div>Create</div>
      </TopPanel>

      <div className='chit-form'>
        <Input
          inputId='branch_name'
          value={branch.branch_name}
          onChange={handleOnChange}
          placeholder='Enter Branch Name'
          required
        />
        <Input
          inputId='branch_code'
          value={branch.branch_code}
          onChange={handleOnChange}
          placeholder='Enter Branch Code'
          required
        />
        <Input
          inputId='organization_id'
          value={branch.organization_id}
          onChange={handleOnChange}
          placeholder='Select Organization'
          required
        />
      </div>
      <div className='form-submit'>
        <Button
          type='ghost'
          label='Cancel'
          onClick={() => dispatch(setIsAddBranchBtnClicked(false))}
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
export default AddBranch;
