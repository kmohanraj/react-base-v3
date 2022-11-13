import { FC } from 'react';
import arrowBack from 'assets/images/back_button.svg';
import TopPanel from 'components/molecules/TopPanel';
import Input from 'components/atoms/TextField';
import { setIsAddGroupBtnClicked } from 'store/slice/groups.slice';
import { useDispatch } from 'react-redux';
import Button from 'components/atoms/Button';

const AddGroup: FC = () => {
  const dispatch = useDispatch();

  const handleOnSubmit = () => {
    console.log('submit');
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
          value=''
          onChange={() => {}}
          placeholder='Enter Group Code'
          required
        />
        <Input
          inputId='chit_amount'
          value=''
          onChange={() => {}}
          placeholder='Select Amount'
          required
        />
        <Input
          inputId='duration'
          value=''
          onChange={() => {}}
          placeholder='Select Duration'
          required
        />
        <Input
          inputId='start_date'
          value=''
          onChange={() => {}}
          placeholder='Select Start Date'
          required
        />
        <Input
          inputId='end_date'
          value=''
          onChange={() => {}}
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
