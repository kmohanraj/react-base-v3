import React, { useState } from 'react';
import TopPanel from 'components/molecules/TopPanel';
import { backButton } from 'constants/icons';
import Input from 'components/atoms/TextField';
import { useDispatch, useSelector } from 'react-redux';
import * as UserSlice from 'store/slice/users.slice';
import Button from 'components/atoms/Button';
import type { RootState } from 'store';
import Select from 'components/atoms/Select';
import useItToGetRoles from 'hooks/role/useItToGetRoles';
import useToGetBranches from 'hooks/branch/useToGetBranches';
import CONSTANTS from 'constants/constants';
import UserService from 'service/user.service';
import useItToGetOrganizations from 'hooks/organization/useItToGetOrganizations';
import { AxiosResponse } from 'axios';
import iziToast from 'izitoast';
import * as Icon from 'constants/icons';

const { STATUS_CODE, TOAST_DEFAULTS } = CONSTANTS;

const AddUser = () => {
  const [isPasswordShow, setIsPasswordShow] = useState<boolean>(false)
  const dispatch = useDispatch();
  const { user, isEditUser } = useSelector(
    (state: RootState) => state.user
  );
  const currentUserID = sessionStorage.getItem(
    CONSTANTS.SESSION_STORAGE.USER_ID_KEY
  );
  const [isOrgOptionLoading] = useItToGetOrganizations(Number(currentUserID));
  const [isRoleOptionLoading] = useItToGetRoles(Number(currentUserID));
  const [isBranchOptionLoading] = useToGetBranches(Number(currentUserID));
  const { organizationOptions } = useSelector(
    (state: RootState) => state.organization
  );
  const { roleOptions } = useSelector((state: RootState) => state.roles);
  const { branchOptions } = useSelector((state: RootState) => state.branch);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(
      UserSlice.setUser({
        ...user,
        [name]: value
      })
    );
  };

  const handleOnSelect = (value: any, name: string) => {
    dispatch(
      UserSlice.setUser({
        ...user,
        [name]: value?.id
      })
    );
  };

  const handleOnSubmit = async () => {
    const { confirm_email, branch_id, ...filterData } = user as any;
    if (Number(currentUserID) !== CONSTANTS.ROLE.SUPER_ID) {
      filterData.branch_id = branch_id;
    }
   
    isEditUser ?  updateUser(filterData) : registerUser(filterData)
  };

  const registerUser = async (filterData: any) => {
    const response = await UserService.register(
      filterData,
      Number(currentUserID)
    );
    toastMessage(response)
  }

  const updateUser = async (filterData: any) => {
    const { id, roles, organizations, branches,is_active, access_token, ...filter} = filterData;
    const payload = { id: id, data: filter }
    const response = await UserService.update(payload, Number(currentUserID))
    toastMessage(response)
  }
  const toastMessage = (response: AxiosResponse) => {
    if (response.status === STATUS_CODE.STATUS_200) {
      dispatch(UserSlice.setIsAddUser(false));
      dispatch(UserSlice.setIsEditUser(false))
      dispatch(UserSlice.clearUser());
      iziToast.success({
        title: TOAST_DEFAULTS.SUCCESS_TITLE,
        message: response?.data?.info
      });
    }
    if (response?.status === STATUS_CODE.STATUS_409) {
      iziToast.info({
        title: TOAST_DEFAULTS.SUCCESS_TITLE,
        message: response?.data?.info
      });
    }
  };

  const handleCheckCondition = () => {
    dispatch(UserSlice.setIsAddUser(false));
    dispatch(UserSlice.clearUser());
    dispatch(UserSlice.setIsEditUser(false));
  };

  const checkCurrentOption = (options: any, value: any) => {
    if (isEditUser) {
      return options.filter((option: any) => option.id === value)[0];
    } else {
      return options[0];
    }
  };

  return (
    <>
      <div className='form-section'>
        <TopPanel panelType='breadcrumb'>
          <img src={backButton} alt='Back' onClick={handleCheckCondition} />
          <div>{isEditUser ? 'Update' : 'Create'}</div>
        </TopPanel>
        <div className='chit-form'>
          <Input
            inputId='name'
            value={user.name}
            onChange={handleOnChange}
            placeholder='Enter Name'
            required
          />
          <Input
            inputId='email'
            value={user.email}
            onChange={handleOnChange}
            placeholder='Enter Email'
            required
          />
          {/* <Input
            inputId='confirm_email'
            value={user.confirm_email}
            onChange={handleOnChange}
            placeholder='Confirm Email'
            required
          /> */}
          <Input
            inputId='password'
            value={user.password}
            onChange={handleOnChange}
            placeholder='Enter Password'
            required
            message='Ex, Password@123'
            error=''
            inputType={isPasswordShow ? 'text' : 'password'}
            sufFixIcon={isPasswordShow ? Icon.showPassword : Icon.hidePassword } 
            suffixOnClick={() =>  setIsPasswordShow(!isPasswordShow)}
          />
          <Input
            inputId='phone'
            value={user.phone}
            onChange={handleOnChange}
            placeholder='Enter phone'
            required
          />
          <Select
            inputId='role_id'
            placeholder='Select Role'
            required
            value={checkCurrentOption(roleOptions, user.role_id)}
            options={roleOptions}
            isLoading={isRoleOptionLoading}
            onSelect={(value) => handleOnSelect(value, 'role_id')}
            isDisabled={
              isEditUser && user.role_id === CONSTANTS.ROLE.ORG_ID
            }
          />
          <Select
            inputId='org_id'
            placeholder='Select Organization'
            required
            value={checkCurrentOption(organizationOptions, user.org_id)}
            options={organizationOptions}
            isLoading={isOrgOptionLoading}
            onSelect={(value) => handleOnSelect(value, 'org_id')}
            isDisabled={isEditUser}
          />
          {currentUserID !== '1' && (
            <Select
              inputId='branch_id'
              placeholder='Select Branch'
              required
              value={checkCurrentOption(branchOptions, user.branch_id)}
              options={branchOptions}
              isLoading={isBranchOptionLoading}
              onSelect={(value) => handleOnSelect(value, 'branch_id')}
            />
          )}
        </div>
        <div className='form-submit'>
          <Button type='ghost' label='Cancel' onClick={handleCheckCondition} />
          <Button
            type='primary'
            label={isEditUser ? 'Update' : 'Create'}
            onClick={() => handleOnSubmit()}
          />
        </div>
      </div>
    </>
  );
};
export default AddUser;
