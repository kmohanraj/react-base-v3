import React, { FC } from 'react';
import TopPanel from 'components/molecules/TopPanel';
import arrowBack from 'assets/images/back_button.svg';
import { setBranch, setIsAddBranchBtnClicked } from 'store/slice/branchs.slice';
import { useDispatch, useSelector } from 'react-redux';
import Input from 'components/atoms/TextField';
import 'styles/chit-form.scss';
import Button from 'components/atoms/Button';
import type { RootState } from 'store';
import CONSTANTS from 'constants/constants';
import BranchService from 'service/branch.service';
import { clearBranch } from 'store/slice/branchs.slice';
import Select from 'components/atoms/Select';
import useItToGetOrganizations from 'hooks/organization/useItToGetOrganizations';

const { STATUS_CODE, SESSION_STORAGE } = CONSTANTS;


const options = [
  {
    id: 1,
    label: 'One'
  },
  {
    id: 2,
    label: 'Two'
  }
]
const options2 = [
  {
    id: 1,
    label: 'Chennai'
  },
  {
    id: 2,
    label: 'Bangalore'
  },
  {
    id: 3,
    label: 'Karur'
  },
  {
    id: 4,
    label: 'Trichy'
  },
  {
    id: 5,
    label: 'Coimbatore'
  },
  {
    id: 6,
    label: 'Ooty'
  },
  {
    id: 7,
    label: 'Kodaikanal kjdzgfkhadskfhjkdhfjkhsdjkhfjksdhfjkhsdjkhfjkdshjkfhsdjkhfkjsdhfkjhsdjkhfjksdhjkfhsdkjfhjksdhjkfhsdjkhfjksdhjk'
  },
  {
    id: 8,
    label: 'Namakkal'
  },
  {
    id: 9,
    label: 'Dindigul'
  },
  {
    id: 10,
    label: 'Manappari kjdshfkjhsdjkfhjkdsjvnjdsbfjkshedhfoieasiofeiowuiofuiofjdslkfhjdlksjfkljsdkljfklsdjklfjskldjfklsdjklfjsdlkjflksdjflkjsdklfjlskdjl'
  },
  {
    id: 11,
    label: 'Erode'
  },
  {
    id: 12,
    label: 'Madurai'
  },
  {
    id: 13,
    label: 'Tharagampatti'
  },
  {
    id: 14,
    label: 'Thogamalai'
  },
  {
    id: 15,
    label: 'Velliyanai'
  },
  {
    id: 17,
    label: 'Veerasingampatti'
  }
]

const AddBranch: FC = () => {
  const dispatch = useDispatch();
  const { branch } = useSelector((state: RootState) => state.branch)
  const { organizationOptions } = useSelector((state: RootState) => state.organization)
  const currentUserID = sessionStorage.getItem(SESSION_STORAGE.USER_ID_KEY)
  const [isOrgOptionLoading] = useItToGetOrganizations(Number(currentUserID))

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
    console.log('####', branch)
    // const payload = {...branch, org_id: Number(branch.org_id)}
    const response = await BranchService.create(branch, Number(currentUserID))
    if (response?.status === STATUS_CODE.STATUS_200) {
      dispatch(setIsAddBranchBtnClicked(false));
      dispatch(clearBranch());
    }
  };

  return (
    <>
      <div className='form-section'>
        <TopPanel panelType='breadcrumb'>
          <img
            src={arrowBack}
            alt='Back'
            onClick={() => dispatch(setIsAddBranchBtnClicked(false))}
          />
          <div>Create</div>
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
            onClick={() => {
              dispatch(setIsAddBranchBtnClicked(false))
              dispatch(clearBranch())
            }}
          />
          <Button
            type='primary'
            label='Create'
            disabled={!branch.branch_name || !branch.branch_code || !branch.org_id}
            onClick={handleOnSubmit}
          />
        </div>
      </div>
    </>
  );
};
export default AddBranch;
