import React, { FC } from 'react';
import TopPanel from 'components/molecules/TopPanel';
import { backButton } from 'constants/icons';
import * as BranchSlice from 'store/slice/branches.slice';
import { useDispatch, useSelector } from 'react-redux';
import Input from 'components/atoms/TextField';
import 'styles/chit-form.scss';
import Button from 'components/atoms/Button';
import type { RootState } from 'store';
import CONSTANTS from 'constants/constants';
import BranchService from 'service/branch.service';
import { clearBranch } from 'store/slice/branches.slice';
import useItToGetOrganizations from 'hooks/organization/useItToGetOrganizations';
import iziToast from 'izitoast';
import { AxiosResponse } from 'axios';
import { ISelectOption } from 'types/components.types';

const Select = React.lazy(() => import('components/atoms/Select'));

const { STATUS_CODE, SESSION_STORAGE } = CONSTANTS;

const AddBranch: FC = () => {
  const dispatch = useDispatch();
  const { branch, isEditBranchBtnClicked } = useSelector(
    (state: RootState) => state.branch
  );
  const currentUserID = sessionStorage.getItem(SESSION_STORAGE.USER_ID_KEY);
  const [isOrgOptionLoading] = useItToGetOrganizations(Number(currentUserID));
  const { organizationOptions } = useSelector(
    (state: RootState) => state.organization
  );

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(
      BranchSlice.setBranch({
        ...branch,
        [name]: value
      })
    );
  };

  const handleOnSelect = (data: ISelectOption) => {
    dispatch(
      BranchSlice.setBranch({
        ...branch,
        org_id: data.id
      })
    );
  };

  const handleOnSubmit = async () => {
    isEditBranchBtnClicked ? updateBranch() : createBranch();
  };

  const createBranch = async () => {
    const { id, organizations, ...data } = branch;
    const response = await BranchService.create(data, Number(currentUserID));
    toastMessage(response);
  };

  const updateBranch = async () => {
    const { id, organizations, ...data } = branch;
    const payload = { id: id, data: data };
    const response = await BranchService.update(payload, Number(currentUserID));
    toastMessage(response);
  };

  const toastMessage = (response: AxiosResponse) => {
    if (response.status === STATUS_CODE.STATUS_200) {
      dispatch(BranchSlice.setIsAddBranchBtnClicked(false));
      dispatch(clearBranch());
      iziToast.success({
        title: CONSTANTS.TOAST_DEFAULTS.SUCCESS_TITLE,
        message: response?.data?.info
      });
    }
    if (response?.status === STATUS_CODE.STATUS_409) {
      iziToast.info({
        title: CONSTANTS.TOAST_DEFAULTS.SUCCESS_TITLE,
        message: response?.data?.info
      });
    }
  };

  const handleCheckCondition = () => {
    dispatch(BranchSlice.setIsAddBranchBtnClicked(false));
    dispatch(clearBranch());
    dispatch(BranchSlice.setIsEditBranchBtnClicked(false));
  };

  const checkCurrentOption = (options: ISelectOption[], value: any) => {
    if (isEditBranchBtnClicked) {
      return options.filter((option: any) => option.id === value)[0];
    } else {
      console.log('____', options);
      if (options.length) {
        console.log('____>>>>>>>', options[0].label);
      }
      return options[0];
    }
  };

  return (
    <>
      <div className='form-section'>
        <TopPanel panelType='breadcrumb'>
          <img src={backButton} alt='Back' onClick={handleCheckCondition} />
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
            value={checkCurrentOption(organizationOptions, branch.org_id)}
            options={organizationOptions}
            isLoading={isOrgOptionLoading}
            onSelect={handleOnSelect}
            isDisabled={isEditBranchBtnClicked}
          />
        </div>
        <div className='form-submit'>
          <Button type='ghost' label='Cancel' onClick={handleCheckCondition} />
          <Button
            type='primary'
            label={isEditBranchBtnClicked ? 'Update' : 'Create'}
            disabled={
              !branch.branch_name || !branch.branch_code || !branch.org_id
            }
            onClick={handleOnSubmit}
          />
        </div>
      </div>
    </>
  );
};
export default AddBranch;
