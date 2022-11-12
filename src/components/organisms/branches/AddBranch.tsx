import { FC } from "react";
import TopPanel from "components/molecules/TopPanel";
import arrowBack from 'assets/images/back_button.svg';
import { setIsAddBranchBtnClicked } from "store/slice/branchs.slice";
import { useDispatch } from "react-redux";
import Input from "components/atoms/TextField";
import "styles/chit-form.scss";
import Button from "components/atoms/Button";

const AddBranch: FC = () => {

  const dispatch = useDispatch()
  const handleOnSubmit = () => {
    console.log('submit')
    alert()
  }

  return (
    <>
      <TopPanel panelType="breadcrumb">
        <img src={arrowBack} alt="Back" onClick={() => dispatch(setIsAddBranchBtnClicked(false)) }  />
        <div>Create</div>
      </TopPanel>
      
      <div className="chit-form">
        <Input 
          inputId="branch_name"
          value=""
          onChange={() => {}}
          placeholder="Enter Branch Name"
          required
        />
        <Input
          inputId="branch_code"
          value=""
          onChange={() => {}}
          placeholder="Enter Branch Code"
          required
        />
        <Input
          inputId="organization_id"
          value=""
          onChange={() => {}}
          placeholder="Select Organization"
          required
        />
      </div>
      <div className="form-submit">
        <Button type="ghost" label="Cancel" onClick={() => dispatch(setIsAddBranchBtnClicked(false))} />
        <Button type="primary" label="Create" onClick={() => handleOnSubmit()} />
      </div>
    </>
  )
}
export default AddBranch;
