import React, { FC, useState } from 'react';
import { backButton } from 'constants/icons';
import TopPanel from 'components/molecules/TopPanel';
import Input from 'components/atoms/TextField';
import * as GroupSlice from 'store/slice/groups.slice';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'components/atoms/Button';
import type { RootState } from 'store';
import * as GroupService from 'service/group.service';
import CONSTANTS from 'constants/constants';
import Select from 'components/atoms/Select';
import useItToGetOrganizations from 'hooks/organization/useItToGetOrganizations';
import useToGetBranches from 'hooks/branch/useToGetBranches';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'styles/date-picker.scss';
import { AxiosResponse } from 'axios';
import { clearGroup } from 'store/slice/groups.slice';
import iziToast from 'izitoast';

const durationOptions = [
  {
    id: 1,
    label: '10 Months',
  },
  {
    id: 2,
    label: '20 Months',
  },
];

const { SESSION_STORAGE, STATUS_CODE } = CONSTANTS;

const AddGroup: FC = () => { 
  const dispatch = useDispatch();
  const { group, isEditGroupBtnClicked } = useSelector((state: RootState) => state.group);
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
  }
  const dateFormat: any = { ...group }
  dateFormat.start_date = new Date(group.start_date)
  dateFormat.end_date = new Date(group.end_date)

  const [groupData, setGroupData] = useState(isEditGroupBtnClicked ? dateFormat : initialState)
  
  const [startDate, setStartDate] = useState<any>(isEditGroupBtnClicked ? new Date(group.start_date) : initialState.start_date)
  const [endDate, setEndDate] = useState<any>(isEditGroupBtnClicked ? new Date(group.end_date) : initialState.end_date);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGroupData({...groupData, [name]: value})
  };

  const handleOnSelect = (value: any, fieldName: string) => {
    setGroupData({
      ...groupData, [fieldName]: value.id
    })
  };

  const handleOnSelectDate = (e: any, fieldName: string) => {
    const duration = durationOptions
      .filter((ele) => ele.id === groupData?.duration)[0]
      .label.split(' ')[0];
    setStartDate(e)
    if (fieldName === 'start_date' && duration) {
      const currentDate = new Date(e);
      const nextDate = currentDate.setMonth(
        currentDate.getMonth() + Number(duration)
      );
      const finalDate = new Date(nextDate);
      const resultDate: any = new Date(finalDate.setDate(finalDate.getDate() - 1))
      setEndDate(new Date(resultDate));
    }
  };

  const handleOnSubmit = async () => {
    const { start_date, end_date, ...filterData } = groupData
    const data = {
      ...filterData,
      start_date: new Date(startDate),
      end_date: new Date(endDate)
    }
    isEditGroupBtnClicked ? updateGroup(data) : createGroup(data);
  };

  const createGroup = async (data: any) => {
    const response = await GroupService.create(data, Number(currentUserID));
    toastMessage(response)
  };

  const updateGroup = async (data: any) => {
    const { id, ...filterData } = data;
    const payload = { id: id, data: filterData };
    const response = await GroupService.update(payload, Number(currentUserID));
    toastMessage(response);
  };

  const toastMessage = (response: AxiosResponse) => {
    if (response.status === STATUS_CODE.STATUS_200) {
      dispatch(GroupSlice.setIsAddGroupBtnClicked(false));
      dispatch(clearGroup());
      iziToast.info({
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
    dispatch(GroupSlice.setIsAddGroupBtnClicked(false))
    dispatch(GroupSlice.setIsEditGroupBtnClicked(false))
  }

  const checkCurrentOption = (options: any, value: number) => {
    if (isEditGroupBtnClicked) {
      return options.filter((option: any) => option.id === value)[0]
    } else {
      return options[0]
    }
  }

  return (
    <>
      <div className='form-section'>
        <TopPanel panelType='breadcrumb'>
          <img
            src={backButton}
            alt='Back'
            onClick={handleOnCheckCondition}
          />
          <div>{isEditGroupBtnClicked ? 'Update' : 'Create'}</div>
        </TopPanel>
        <div className='chit-form'>
          <Input
            inputId='group_code'
            value={groupData.group_code}
            onChange={handleOnChange}
            placeholder='Enter Group Code'
            required
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
          />
          <Select
            inputId='org_id'
            placeholder='Select Organization'
            required
            options={organizationOptions}
            value={checkCurrentOption(organizationOptions, groupData.org_id)}
            onSelect={(value) => handleOnSelect(value, 'org_id')}
            isLoading={isOrgLoading}
          />
          <Select
            inputId='branch_id'
            placeholder='Select Branch'
            required
            options={branchOptions}
            value={checkCurrentOption(branchOptions, groupData.branch_id)}
            onSelect={(value) => handleOnSelect(value, 'branch_id')}
            isLoading={isBranchLoading}
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
            label={isEditGroupBtnClicked ? 'Update' : 'Create'}
            onClick={() => handleOnSubmit()}
          />
        </div>
      </div>
    </>
  );
};
export default AddGroup;
