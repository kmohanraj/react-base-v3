import React, { FC } from 'react';
import arrowBack from 'assets/images/back_button.svg';
import TopPanel from 'components/molecules/TopPanel';
import Input from 'components/atoms/TextField';
import { setGroup, setIsAddGroupBtnClicked } from 'store/slice/groups.slice';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'components/atoms/Button';
import type { RootState } from 'store';

const AddGroup: FC = () => {
  const dispatch = useDispatch();
  const { group } = useSelector((state: RootState) => state.group)

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(setGroup({
      ...group, [name]: value
    }))
  }
  const handleOnSubmit = () => {
    console.log('submit', group);
  };
  return (
    <>
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
          inputId='chit_amount'
          value={group.chit_amount}
          onChange={handleOnChange}
          placeholder='Select Amount'
          required
        />
        <Input
          inputId='duration'
          value={group.duration}
          onChange={handleOnChange}
          placeholder='Select Duration'
          required
        />
        <Input
          inputId='start_date'
          value={group.start_date}
          onChange={handleOnChange}
          placeholder='Select Start Date'
          required
        />
        <Input
          inputId='end_date'
          value={group.end_date}
          onChange={handleOnChange}
          placeholder='Select End Date'
          required
        />
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
    </>
  );
};
export default AddGroup;
