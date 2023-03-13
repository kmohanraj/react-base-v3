import React, { FC, lazy, useState } from 'react';
import { backButton } from 'constants/icons';
import TopPanel from 'components/molecules/TopPanel';
import Input from 'components/atoms/TextField';
import * as GroupSlice from 'store/slice/groups.slice';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'components/atoms/Button';
import type { RootState } from 'store';
import * as GroupService from 'service/group.service';
import CONSTANTS from 'constants/constants';
import useItToGetOrganizations from 'hooks/organization/useItToGetOrganizations';
import useToGetBranches from 'hooks/branch/useToGetBranches';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'styles/date-picker.scss';
import { AxiosResponse } from 'axios';
import iziToast from 'izitoast';
import { ISelectOption } from 'types/components.types';
import { durationOptions } from 'constants/options';
const Select = lazy(() => import('components/atoms/Select'))


const { SESSION_STORAGE, STATUS_CODE } = CONSTANTS;

const AddGroup: FC = () => {
  const dispatch = useDispatch();
  const { group, isEditGroup } = useSelector((state: RootState) => state.group);
  const { organizationOptions } = useSelector(
    (state: RootState) => state.organization
  );
  const { branchOptions } = useSelector((state: RootState) => state.branch);
  const currentUserID = sessionStorage.getItem(SESSION_STORAGE.USER_ID_KEY);
  const [isOrgLoading] = useItToGetOrganizations(Number(currentUserID));
  const [isBranchLoading] = useToGetBranches(Number(currentUserID));

  const initialState = {
    group_code: '',
    amount: '',
    total_members: '',
    duration: null,
    org_id: null,
    branch_id: null,
    start_date: null,
    end_date: null
  };
  const dateFormat: any = { ...group };
  dateFormat.start_date = new Date(group.start_date);
  dateFormat.end_date = new Date(group.end_date);

  const [groupData, setGroupData] = useState(
    isEditGroup ? dateFormat : initialState
  );
  const [startDate, setStartDate] = useState<any>(
    isEditGroup ? new Date(group.start_date) : initialState.start_date
  );
  const [endDate, setEndDate] = useState<any>(
    isEditGroup ? new Date(group.end_date) : initialState.end_date
  );

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGroupData({ ...groupData, [name]: checkInputType(name, value) });
  };

  const checkInputType = (name: string, value: string) => {
    if(name === 'group_code') {
      return value.replace(/[^0-9A-Z]+/g, '')
    } else if (name === 'amount' || name === 'total_members' || name === 'duration') {
      return value.replace(/[^0-9]+/g, '')
    } else  {
      return value
    }
  }

  const handleOnSelect = (value: ISelectOption, fieldName: string) => {
    setGroupData({
      ...groupData,
      [fieldName]: value.id
    });
  };

  const handleOnSelectDate = (e: any, fieldName: string) => {
    const duration = durationOptions
      .filter((ele) => ele.id === groupData?.duration)[0]
      .label.split(' ')[0];
    setStartDate(e);
    if (fieldName === 'start_date' && duration) {
      const currentDate = new Date(e);
      const nextDate = currentDate.setMonth(
        currentDate.getMonth() + Number(duration)
      );
      const finalDate = new Date(nextDate);
      const resultDate: any = new Date(
        finalDate.setDate(finalDate.getDate() - 1)
      );
      setEndDate(new Date(resultDate));
    }
  };

  const handleOnSubmit = async () => {
    const { start_date, end_date, ...filterData } = groupData;
    const data = {
      ...filterData,
      start_date: new Date(startDate),
      end_date: new Date(endDate)
    };
    isEditGroup ? updateGroup(data) : createGroup(data);
  };

  const createGroup = async (data: any) => {
    const response = await GroupService.create(data, Number(currentUserID));
    toastMessage(response);
  };

  const updateGroup = async (data: any) => {
    const { id, ...filterData } = data;
    const payload = { id: id, data: filterData };
    const response = await GroupService.update(payload, Number(currentUserID));
    toastMessage(response);
  };

  const toastMessage = (response: AxiosResponse) => {
    if (response.status === STATUS_CODE.STATUS_200) {
      dispatch(GroupSlice.setIsAddGroup(false));
      dispatch(GroupSlice.clearGroup());
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

  const handleOnCheckCondition = () => {
    dispatch(GroupSlice.setIsAddGroup(false));
    dispatch(GroupSlice.setIsEditGroup(false));
  };

  const checkCurrentOption = (options: any, value: number) => {
    if (isEditGroup) {
      return options.filter((option: any) => option.id === value)[0];
    }
    return options;
  };

  const handleOneClear = (field: any) => {
    dispatch(GroupSlice.setGroup({
      ...group, [field]: null
    }))
  }

  console.log("GROUP", group)
  return (
    <>
      <div className='form-section'>
        <TopPanel panelType='breadcrumb'>
          <img src={backButton} alt='Back' onClick={handleOnCheckCondition} />
          <div>{isEditGroup ? 'Update' : 'Create'}</div>
        </TopPanel>
        <div className='chit-form'>
          <Input
            inputId='group_code'
            value={groupData.group_code}
            onChange={handleOnChange}
            placeholder='Enter Group Code'
            required
            message='Ex, AB0123'
          />
          <Input
            inputId='amount'
            value={groupData.amount}
            onChange={handleOnChange}
            placeholder='Select Amount'
            required
          />
          <Input
            inputId='total_members'
            value={groupData.total_members}
            onChange={handleOnChange}
            placeholder='Enter Total Members'
            required
          />
          {/* <Input
            inputId='duration'
            value={group.duration || ''}
            onChange={handleOnChange}
            placeholder='Enter Duration'
            required
          /> */}
          <Select
            inputId='duration'
            placeholder='Select Duration'
            required
            value={checkCurrentOption(durationOptions, groupData.duration)}
            options={durationOptions}
            onSelect={(value) => handleOnSelect(value, 'duration')}
            onClear={handleOneClear}
          />
          <Select
            inputId='org_id'
            placeholder='Select Organization'
            required
            options={organizationOptions}
            value={checkCurrentOption(organizationOptions, groupData.org_id)}
            onSelect={(value) => handleOnSelect(value, 'org_id')}
            isLoading={isOrgLoading}
            onClear={handleOneClear}
          />
          <Select
            inputId='branch_id'
            placeholder='Select Branch'
            required
            options={branchOptions}
            value={checkCurrentOption(branchOptions, groupData.branch_id)}
            onSelect={(value) => handleOnSelect(value, 'branch_id')}
            isLoading={isBranchLoading}
            onClear={handleOneClear}
          />
          <DatePicker
            name='start_date'
            placeholderText='MM - DD - YYYY'
            selected={startDate}
            onChange={(e: any) => handleOnSelectDate(e, 'start_date')}
            selectsStart
            disabledKeyboardNavigation
            startDate={startDate}
            maxDate={groupData.end_date as any}
            dateFormat='dd/MM/yyyy'
            className='chit-start-date-field chit-date'
            disabled={!groupData.duration}
            autoComplete="off"
          />
          <DatePicker
            name='end_date'
            placeholderText='MM - DD - YYYY'
            selected={endDate}
            autoComplete='nope'
            onChange={(e: any) => handleOnSelectDate(e, 'end_date')}
            selectsEnd
            disabledKeyboardNavigation
            minDate={endDate}
            maxDate={endDate}
            dateFormat='dd/MM/yyyy'
            className='chit-start-date-field chit-date'
            disabled
          />
          {/* <Input
            inputId='start_date'
            value={group.start_date}
            onChange={handleOnChange}
            placeholder='Select Start Date'
            required
            inputType='date'
            
          />
          <Input
            inputId='end_date'
            value={group.end_date}
            onChange={handleOnChange}
            placeholder='Select End Date'
            required
            inputType='date'
          /> */}
        </div>
        <div className='form-submit'>
          <Button
            type='ghost'
            label='Cancel'
            onClick={handleOnCheckCondition}
          />
          <Button
            type='primary'
            label={isEditGroup ? 'Update' : 'Create'}
            onClick={() => handleOnSubmit()}
            disabled={
              !groupData.group_code ||
              !groupData.amount ||
              !groupData.total_members ||
              !groupData.duration ||
              !groupData.org_id ||
              !groupData.branch_id ||
              !startDate
            }
          />
        </div>
      </div>
    </>
  );
};
export default AddGroup;
