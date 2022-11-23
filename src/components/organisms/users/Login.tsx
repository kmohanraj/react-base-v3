import React, { FC } from 'react';
import Button from 'components/atoms/Button';
import Input from 'components/atoms/TextField';
import 'styles/login.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin } from 'store/slice/users.slice';
import type { RootState } from 'store';
import userService from 'service/user.service';
import CONSTANTS from 'constants/constants';

const Login: FC = () => {
  const { login } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(setLogin({
      ...login, [name]: value
    }))
  }

  const handlOnSubmit = async () => {
    const response = await userService.login(login)
    sessionStorage.setItem(CONSTANTS.SESSION_STORAGE.AUTH_TOKEN_KEY, response.headers['authorization'])
    sessionStorage.setItem(CONSTANTS.SESSION_STORAGE.FIRST_LOGIN_STATUS_KEY, 'false')
  }
  
  return (
    <div className='login-container'>
      <div className='login-form'>
        <h3>Login</h3>
        <Input
          inputId='email'
          value={login.email}
          onChange={handleOnChange}
          placeholder='Enter Email'
          required
          message='Eg: example@gmail.com'
        />
        <Input
          inputType='password'
          inputId='password'
          value={login.password}
          onChange={handleOnChange}
          placeholder='Enter Password'
          required
          message='Eg: Password@123'
        />
        <div className="form-submit">
          <Button type="primary" label="Login" onClick={handlOnSubmit} />
        </div>
      </div>
    </div>
   
  );
};
export default Login;
