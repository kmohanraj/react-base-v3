import React from "react";
import TopPanel from "components/molecules/TopPanel";
import { backButton } from "constants/icons";
import Input from "components/atoms/TextField";
import { useDispatch, useSelector } from "react-redux";
import * as UserSlice from "store/slice/users.slice";
import Button from "components/atoms/Button";
import type { RootState } from "store";
import Select from "components/atoms/Select";
import useItToGetRoles from "hooks/role/useItToGetRoles";
import useToGetBranches from "hooks/branch/useToGetBranches";
import CONSTANTS from "constants/constants";
import UserService from "service/user.service";
import useItToGetOrganizations from "hooks/organization/useItToGetOrganizations";

const AddUser = () => {
  const dispatch = useDispatch();
  const { user, isEditUserBtnClicked } = useSelector((state: RootState) => state.user);
  const currentUserID = sessionStorage.getItem(CONSTANTS.SESSION_STORAGE.USER_ID_KEY)
  const [isOrgOptionloading] = useItToGetOrganizations(Number(currentUserID));
  const [isRoleOptionLoading] = useItToGetRoles(Number(currentUserID))
  const [isBranchOptionLoading] = useToGetBranches(Number(currentUserID))
  const { organizationOptions } = useSelector((state: RootState) => state.organization);
  const { roleOptions } = useSelector((state: RootState) => state.roles);
  const { branchOptions } = useSelector((state: RootState) => state.branch);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(UserSlice.setUser({
      ...user, [name]: value
    }))
  }

  const handleOnSelect = (value: any, name: string) => {
    dispatch(UserSlice.setUser({
      ...user, [name]: value?.id
    }))
  }
  const handleOnSubmit = async () => {
    console.log('submit', user)
  
    const {confirm_email, branch_id,  ...filterData} = user as any;
    if (Number(currentUserID) !== CONSTANTS.ROLE.SUPER_ID) {
      filterData.branch_id = branch_id
    }
    const response = await UserService.create(filterData, Number(currentUserID))
    if(response?.status === CONSTANTS.STATUS_CODE.STATUS_200) {
      dispatch(UserSlice.setIsAddUserBtnClicked(false))
    }
  }

  const handleCheckCondition = () => {
    dispatch(UserSlice.setIsAddUserBtnClicked(false))
    dispatch(UserSlice.clearUser())
    dispatch(UserSlice.setIsEditUserBtnClicked(false))
  }

  const checkCurrentOption = (options: any, value: any) => {
    if (isEditUserBtnClicked) {
      return options.filter((option: any) => option.id === value)[0]
    } else {
      return options[0]
    }
  }

  return (
    <>
      <div className='form-section'>
        <TopPanel panelType="breadcrumb">
          <img src={backButton} alt="Back" onClick={handleCheckCondition}  />
          <div>{isEditUserBtnClicked ? 'Update' : 'Create'}</div>
        </TopPanel>
        <div className="chit-form">
          <Input
            inputId="name"
            value={user.name}
            onChange={handleOnChange}
            placeholder="Enter Name"
            required
          />
          <Input
            inputId="email"
            value={user.email}
            onChange={handleOnChange}
            placeholder="Enter Email"
            required
          />
          <Input
            inputId="confirm_email"
            value={user.confirm_email}
            onChange={handleOnChange}
            placeholder="Confirm Email"
            required
          />
          <Input
            inputId="password"
            value={user.password}
            onChange={handleOnChange}
            placeholder="Enter Password"
            required
            message="Ex, Password@123"
            error=""
            inputType="password"
          />
          <Input
            inputId="phone"
            value={user.phone}
            onChange={handleOnChange}
            placeholder="Enter phone"
            required
          />
          <Select
            inputId="role_id"
            placeholder="Select Role"
            required
            value={checkCurrentOption(roleOptions, user.role_id)}
            options={roleOptions}
            isLoading={isRoleOptionLoading}
            onSelect={(value) => handleOnSelect(value, 'role_id')}
            isDisabled={ isEditUserBtnClicked && user.role_id === CONSTANTS.ROLE.ORG_ID}
          />
          <Select
            inputId="org_id"
            placeholder="Select Organization"
            required
            value={checkCurrentOption(organizationOptions, user.org_id)}
            options={organizationOptions}
            isLoading={isOrgOptionloading}
            onSelect={(value) => handleOnSelect(value, 'org_id')}
            isDisabled={isEditUserBtnClicked}
          />
          {currentUserID !== '1' && (
            <Select
              inputId="branch_id"
              placeholder="Select Branch"
              required
              value={checkCurrentOption(branchOptions , user.branch_id)}
              options={branchOptions}
              isLoading={isBranchOptionLoading}
              onSelect={(value) => handleOnSelect(value, 'branch_id')}
            />
          )}
          
        </div>
        <div className="form-submit">
          <Button type="ghost" label="Cancel" onClick={handleCheckCondition} />
          <Button type="primary" label={isEditUserBtnClicked ? 'Update' : 'Create'} onClick={() => handleOnSubmit()} />
        </div>
      </div>
    </>
  )
}
export default AddUser;
