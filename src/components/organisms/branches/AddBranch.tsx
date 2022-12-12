import React, { FC, useEffect } from 'react';
import TopPanel from 'components/molecules/TopPanel';
import arrowBack from 'assets/images/back_button.svg';
import { setBranch, setIsAddBranchBtnClicked, setIsEditBranchBtnClicked } from 'store/slice/branchs.slice';
import { useDispatch, useSelector } from 'react-redux';
import Input from 'components/atoms/TextField';
import 'styles/chit-form.scss';
import Button from 'components/atoms/Button';
import type { RootState } from 'store';
import CONSTANTS from 'constants/constants';
import BranchService from 'service/branch.service';
import { clearBranch } from 'store/slice/branchs.slice';
import useItToGetOrganizations from 'hooks/organization/useItToGetOrganizations';

const Select = React.lazy(() =>  import('components/atoms/Select'));

const { STATUS_CODE, SESSION_STORAGE } = CONSTANTS;

const AddBranch: FC = () => {
  const dispatch = useDispatch();
  const { branch, isEditBranchBtnClicked } = useSelector((state: RootState) => state.branch)
  const currentUserID = sessionStorage.getItem(SESSION_STORAGE.USER_ID_KEY)
  const [isOrgOptionLoading] = useItToGetOrganizations(Number(currentUserID))
  const { organizationOptions } = useSelector((state: RootState) => state.organization)

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    dispatch(setBranch({
      ...branch, [name]: value
    }))
  }

  const handleOnSelect = (name: any) => {
    dispatch(setBranch({
      ...branch, org_id: name.id
    }))
  }

  const handleOnSubmit = async () => {
    // const payload = {...branch, org_id: Number(branch.org_id)}
    const response = await BranchService.create(branch, Number(currentUserID))
    if (response?.status === STATUS_CODE.STATUS_200) {
      dispatch(setIsAddBranchBtnClicked(false));
      dispatch(clearBranch());
    }
  };

  const handleCheckCondition = () => {
    dispatch(setIsAddBranchBtnClicked(false))
    dispatch(clearBranch())
    dispatch(setIsEditBranchBtnClicked(false))
  }

  useEffect(() => {
    
  }, [isOrgOptionLoading, organizationOptions, branch])

  return (
    <>
      <div className='form-section'>
        <TopPanel panelType='breadcrumb'>
          <img
            src={arrowBack}
            alt='Back'
            onClick={handleCheckCondition}
          />
          <div>{isEditBranchBtnClicked ? 'Update' : 'Create'}</div>
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
          <Select
            inputId='org_id'
            placeholder='Select Organization'
            required
            value={branch.org_id}
            options={organizationOptions}
            isLoading={isOrgOptionLoading}
            onSelect={handleOnSelect}
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
            label={isEditBranchBtnClicked ? 'Update' : 'Create'}
            disabled={!branch.branch_name || !branch.branch_code || !branch.org_id}
            onClick={handleOnSubmit}
          />
        </div>
      </div>
    </>
  );
};
export default AddBranch;
