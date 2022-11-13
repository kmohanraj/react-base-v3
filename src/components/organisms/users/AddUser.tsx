import TopPanel from "components/molecules/TopPanel";
import React from "react";
import arrowBack from 'assets/images/back_button.svg';
import Input from "components/atoms/TextField";
import { useDispatch } from "react-redux";
import { setIsAddUserBtnClicked } from "store/slice/users.slice";
import Button from "components/atoms/Button";
const AddUser = () => {
  const dispatch = useDispatch();

  const handleOnSubmit = () => {
    console.log('submit')
  }
  return (
    <>
       <TopPanel panelType="breadcrumb">
        <img src={arrowBack} alt="Back" onClick={() =>dispatch(setIsAddUserBtnClicked(false))}  />
        <div>Create</div>
      </TopPanel>
      <div className="chit-form">
        <Input
          inputId="name"
          value=""
          onChange={() => {}}
          placeholder="Enter Name"
          required
        />
        <Input
          inputId="email"
          value=""
          onChange={() => {}}
          placeholder="Enter Email"
          required
        />
        <Input
          inputId="confirm_email"
          value=""
          onChange={() => {}}
          placeholder="Confirm Email"
          required
        />
        <Input
          inputId="password"
          value=""
          onChange={() => {}}
          placeholder="Enter Password"
          required
          message="Ex, Password@123"
          error=""
        />
        <Input
          inputId="phone"
          value=""
          onChange={() => {}}
          placeholder="Enter phone"
          required
        />
        <Input
          inputId="role_id"
          value=""
          onChange={() => {}}
          placeholder="Select Role"
          required
        />
        <Input
          inputId="org_id"
          value=""
          onChange={() => {}}
          placeholder="Select Organization"
          required
        />
        <Input
          inputId="branch_id"
          value=""
          onChange={() => {}}
          placeholder="Select Branch"
          required
        />
      </div>
      <div className="form-submit">
        <Button type="ghost" label="Cancel" onClick={() => dispatch(setIsAddUserBtnClicked(false))} />
        <Button type="primary" label="Create" onClick={() => handleOnSubmit()} />
      </div>
    </>
  )
}
export default AddUser;
