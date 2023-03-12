import React, { FC, useState } from 'react';
import Input from 'components/atoms/TextField';
import TopPanel from 'components/molecules/TopPanel';
import { backButton } from 'constants/icons';
import * as OrgSlice from 'store/slice/organizations.slice';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'components/atoms/Button';
import 'styles/chit-form.scss';
import type { RootState } from 'store';
import organizationService from 'service/organization.service';
import CONSTANTS from 'constants/constants';
import iziToast from 'izitoast';
import { OrganizationType } from 'types/components.types';
import e from 'express';

const { SESSION_STORAGE, STATUS_CODE, TOAST_DEFAULTS, EMAIL_PATTERN, ERROR } =
  CONSTANTS;

const AddOrganization: FC = () => {
  const dispatch = useDispatch();
  const { organization, isEditOrgBtnClicked } = useSelector(
    (state: RootState) => state.organization
  );
  const currentUserID = sessionStorage.getItem(SESSION_STORAGE.USER_ID_KEY);
  const [updateChanges, setUpdateChanges] = useState({} as OrganizationType);
  const [emailErr, setEmailErr] = useState<string>('');

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(
      OrgSlice.setOrganization({
        ...organization,
        [name]: checkInputType(name, value)
      })
    );
    setUpdateChanges((prevState: OrganizationType) => ({
      ...prevState,
      [name]: value
    }));
  };

  const checkInputType = (name: string, value: string) => {
    if (
      name === 'branch_limit' ||
      name === 'group_limit' ||
      name === 'org_phone'
    ) {
      return value.replace(/[^0-9]+/g, '').substring(0, 10);
    } else if (name === 'org_email') {
      return emailValidation(value);
    } else if (name === 'org_address') {
      return value.replace(/[^a-zA-Z0-9\s,.'-]+/g, '').replace(/\s+\s+/g, '');
    } else {
      return value.replace(/[^a-zA-Z\s]+/g, '').replace(/\s+\s+/g, '');
    }
  };

  const emailValidation = (value: string) => {
    setEmailErr('');
    if (value.length > 0 && !EMAIL_PATTERN.test(value)) {
      setEmailErr(ERROR.USER.EMAIL_VALIDATION);
      return value;
    }
    return value;
  };

  const handleOnSubmit = async () => {
    const { id, ...filterData } = organization;
    if (isEditOrgBtnClicked) {
      const data = {
        id: id,
        data: filterData
      };
      if (Object.keys(updateChanges).length) {
        updateOrganization(data);
      } else {
        dispatch(OrgSlice.setIsAddOrgBtnClicked(false));
        dispatch(OrgSlice.clearOrganization());
      }
    } else {
      createOrganization(filterData);
    }
  };

  const createOrganization = async (filterData: any) => {
    const response = await organizationService.create(
      filterData,
      Number(currentUserID)
    );
    if (response?.status === STATUS_CODE.STATUS_200) {
      iziToast.success({
        title: TOAST_DEFAULTS.SUCCESS_TITLE,
        message: response?.data?.info
      });
      dispatch(OrgSlice.setIsAddOrgBtnClicked(false));
      dispatch(OrgSlice.clearOrganization());
    }
  };

  const updateOrganization = async (data: any) => {
    const response = await organizationService.update(
      data,
      Number(currentUserID)
    );
    if (response?.status === STATUS_CODE.STATUS_200) {
      iziToast.success({
        title: TOAST_DEFAULTS.SUCCESS_TITLE,
        message: response?.data?.info
      });
      dispatch(OrgSlice.setIsAddOrgBtnClicked(false));
      dispatch(OrgSlice.clearOrganization());
    }
  };

  return (
    <>
      <div className='form-section'>
        <TopPanel panelType='breadcrumb'>
          <img
            src={backButton}
            alt='Back'
            onClick={() => {
              dispatch(OrgSlice.setIsAddOrgBtnClicked(false));
              dispatch(OrgSlice.setIsEditOrgBtnClicked(false));
              dispatch(OrgSlice.clearOrganization());
            }}
          />
          <div>{isEditOrgBtnClicked ? 'Update' : 'Create'}</div>
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
            placeholder='Enter Organization Email'
            required
            error={emailErr}
          />

          <Input
            inputId='branch_limit'
            value={organization.branch_limit}
            onChange={handleOnChange}
            placeholder='Enter Branch Limit'
            required
          />
          <Input
            inputId='group_limit'
            value={organization.group_limit}
            onChange={handleOnChange}
            placeholder='Enter Group Limit'
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
            onClick={() => {
              dispatch(OrgSlice.setIsAddOrgBtnClicked(false));
              dispatch(OrgSlice.setIsEditOrgBtnClicked(false));
              dispatch(OrgSlice.clearOrganization());
            }}
          />
          <Button
            type='primary'
            label={isEditOrgBtnClicked ? 'Update' : 'Create'}
            onClick={() => handleOnSubmit()}
            disabled={
              !organization.org_name ||
              !organization.org_email ||
              !organization.branch_limit ||
              !organization.group_limit ||
              !organization.org_logo ||
              !organization.org_phone ||
              !organization.org_address ||
              emailErr.length !== 0
            }
          />
        </div>
      </div>
    </>
  );
};
export default AddOrganization;
