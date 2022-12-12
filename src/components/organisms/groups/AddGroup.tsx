import React, { FC, useState } from 'react';
import arrowBack from 'assets/images/back_button.svg';
import TopPanel from 'components/molecules/TopPanel';
import Input from 'components/atoms/TextField';
import { setGroup, setIsAddGroupBtnClicked } from 'store/slice/groups.slice';
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
  const { group } = useSelector((state: RootState) => state.group);
  const { organizationOptions } = useSelector(
    (state: RootState) => state.organization
  );
  const { branchOptions } = useSelector((state: RootState) => state.branch);
  const currentUserID = sessionStorage.getItem(SESSION_STORAGE.USER_ID_KEY);
  const [isOrgLoading] = useItToGetOrganizations(Number(currentUserID));
  const [isBranchLoading] = useToGetBranches(Number(currentUserID));

  const [endDate, setEndDate] = useState<any>();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(
      setGroup({
        ...group,
        [name]: value,
      })
    );
  };

  const handleOnSelect = (value: any, fieldName: string) => {
    dispatch(
      setGroup({
        ...group,
        [fieldName]: value.id,
      })
    );
  };

  const handleOnSelectDate = (e: Date, fieldName: string) => {
    const duration = durationOptions
      .filter((ele) => ele.id === group.duration)[0]
      .label.split(' ')[0];
    dispatch(
      setGroup({
        ...group,
        [fieldName]: e,
      })
    );
    if (fieldName === 'start_date' && group.duration) {
      const currentDate = new Date(e);
      const nextDate = currentDate.setMonth(
        currentDate.getMonth() + Number(duration)
      );
      const finalDate = new Date(nextDate);
      const resultDate = finalDate.setDate(finalDate.getDate() - 1)
      setEndDate(new Date(resultDate));
    }
  };

  const handleOnSubmit = async () => {
    console.log('submit', group);
    await createGroup();
  };

  const createGroup = async () => {
    const response = await GroupService.create(group, Number(currentUserID));
    if (response?.status === STATUS_CODE.STATUS_200) {
      dispatch(setIsAddGroupBtnClicked(false));
    }
  };

  console.log('group---end-date-and-start-date', endDate);

  return (
    <>
      <div className='form-section'>
        <TopPanel panelType='breadcrumb'>
          <img
            src={arrowBack}
            alt='Back'
            onClick={() => dispatch(setIsAddGroupBtnClicked(false))}
          />
          <div>Create</div>
        </TopPanel>
        <div className='chit-form'>
          <Input
            inputId='group_code'
            value={group.group_code}
            onChange={handleOnChange}
            placeholder='Enter Group Code'
            required
          />
          <Input
            inputId='amount'
            value={group.amount}
            onChange={handleOnChange}
            placeholder='Select Amount'
            required
          />
          <Input
            inputId='total_members'
            value={group.total_members}
            onChange={handleOnChange}
            placeholder='Enter Total Members'
            required
          />
          <Select
            inputId='duration'
            placeholder='Select Duration'
            required
            value={group.duration}
            options={durationOptions}
            onSelect={(value) => handleOnSelect(value, 'duration')}
          />
          <Select
            inputId='org_id'
            placeholder='Select Organization'
            required
            options={organizationOptions}
            value={group.org_id}
            onSelect={(value) => handleOnSelect(value, 'org_id')}
            isLoading={isOrgLoading}
          />
          <Select
            inputId='branch_id'
            placeholder='Select Branch'
            required
            options={branchOptions}
            value={group.branch_id}
            onSelect={(value) => handleOnSelect(value, 'branch_id')}
            isLoading={isBranchLoading}
          />
          <DatePicker
            name='start_date'
            placeholderText='MM - DD - YYYY'
            selected={group.start_date}
            onChange={(e: Date) => handleOnSelectDate(e, 'start_date')}
            selectsStart
            disabledKeyboardNavigation
            startDate={group.start_date}
            maxDate={group.end_date}
            dateFormat='dd/MM/yyyy'
            className='chit-start-date-field'
            disabled={!group.duration}
          />
          <DatePicker
            name='end_date'
            placeholderText='MM - DD - YYYY'
            selected={group.end_date || endDate}
            autoComplete='nope'
            onChange={(e: Date) => handleOnSelectDate(e, 'end_date')}
            selectsEnd
            disabledKeyboardNavigation
            minDate={endDate}
            maxDate={endDate}
            dateFormat='dd/MM/yyyy'
            className='chit-start-date-field'
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
            onClick={() => dispatch(setIsAddGroupBtnClicked(false))}
          />
          <Button
            type='primary'
            label='Create'
            onClick={() => handleOnSubmit()}
          />
        </div>
      </div>
    </>
  );
};
export default AddGroup;
