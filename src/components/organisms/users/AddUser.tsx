import React from "react";
import TopPanel from "components/molecules/TopPanel";
import arrowBack from 'assets/images/back_button.svg';
import Input from "components/atoms/TextField";
import { useDispatch, useSelector } from "react-redux";
import { setIsAddUserBtnClicked, setUser } from "store/slice/users.slice";
import Button from "components/atoms/Button";
import type { RootState } from "store";

const AddUser = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(setUser({
      ...user, [name]: value
    }))
  }
  const handleOnSubmit = () => {
    console.log('submit', user)
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
        <Input
          inputId="role_id"
          value={user.role_id}
          onChange={handleOnChange}
          placeholder="Select Role"
          required
        />
        <Input
          inputId="org_id"
          value={user.org_id}
          onChange={handleOnChange}
          placeholder="Select Organization"
          required
        />
        <Input
          inputId="branch_id"
          value={user.branch_id}
          onChange={handleOnChange}
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
