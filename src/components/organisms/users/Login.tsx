import React, { FC } from 'react';
import Button from 'components/atoms/Button';
import Input from 'components/atoms/TextField';
import 'styles/login.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin } from 'store/slice/users.slice';
import type { RootState } from 'store';
import userService from 'service/user.service';
import CONSTANTS from 'constants/constants';
import iziToast from 'izitoast';

const { SESSION_STORAGE, STATUS_CODE, TOAST_DEFAULTS } = CONSTANTS;

const Login: FC = () => {
  const { login } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch();
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(setLogin({
      ...login, [name]: value
    }))
  }

  const handleOnSubmit = async () => {
    const response = await userService.login(login)
    if (response?.status === STATUS_CODE.STATUS_200) {
      sessionStorage.setItem(SESSION_STORAGE.AUTH_TOKEN_KEY, response.headers['authorization'])
      sessionStorage.setItem(SESSION_STORAGE.FIRST_LOGIN_STATUS_KEY, response?.data?.info?.isFirstLogin)
      sessionStorage.setItem(SESSION_STORAGE.USER_ID_KEY, response?.data?.info?.user)
      sessionStorage.setItem(SESSION_STORAGE.NAME_KEY, response?.data?.info?.name)
      sessionStorage.setItem(SESSION_STORAGE.ROLE_KEY, response?.data?.info?.role)
      sessionStorage.setItem(SESSION_STORAGE.CURRENT_ORG_ID, response?.data?.info?.org_id)
      window.location.pathname = '/'
    }

    if (response?.status !== STATUS_CODE.STATUS_200) {
      iziToast.info({
        title: TOAST_DEFAULTS.SUCCESS_TITLE,
        message: response?.data?.info
      })
    }
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
          <Button type="primary" label="Login" onClick={handleOnSubmit} />
        </div>
      </div>
    </div>
   
  );
};
export default Login;
