import React, { FC, useState } from 'react';
import Button from 'components/atoms/Button';
import Input from 'components/atoms/TextField';
import 'styles/login.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin } from 'store/slice/users.slice';
import type { RootState } from 'store';
import userService from 'service/user.service';
import CONSTANTS from 'constants/constants';
import iziToast from 'izitoast';
import * as Icon from 'constants/icons';
import cx from 'classnames';

const {
  SESSION_STORAGE,
  STATUS_CODE,
  TOAST_DEFAULTS,
  ERROR,
  EMAIL_PATTERN,
  PASSWORD_PATTERN
} = CONSTANTS;

const Login: FC = () => {
  const { login } = useSelector((state: RootState) => state.user);
  const [isFirst, setIsFirst] = useState<boolean>();
  const [isPasswordShow, setIsPasswordShow] = useState<boolean>(false);
  const [isNewPasswordShow, setIsNewPasswordShow] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [emailErr, setEmailErr] = useState<string>('');
  const [passwordErr, setPasswordErr] = useState<string>('');
  const isFirstClass = cx('login-form', { 'is-first': isFirst });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(
      setLogin({
        ...login,
        [name]: checkInputType(name, value)
      })
    );
  };

  const checkInputType = (name: string, value: string) => {
    if (name === 'phone') {
      return value.replace(/[^0-9]+/g, '').substring(0, 10);
    } else if (name === 'email') {
      return emailValidation(value);
    } else if (name === 'password') {
      return passwordValidation(value);
    } else {
      return value;
    }
  };

  const emailValidation = (value: string) => {
    setEmailErr('');
    if (value.length > 0 && !EMAIL_PATTERN.test(value)) {
      setEmailErr(ERROR.USER.EMAIL_VALIDATION);
      return value;
    }
    return value;
  };

  const passwordValidation = (value: string) => {
    setPasswordErr('');
    if (value.length > 0 && !PASSWORD_PATTERN.test(value)) {
      setPasswordErr(ERROR.USER.PASSWORD_VALIDATION);
      return value;
    }
    return value;
  };

  const handleOnSubmit = async () => {
    const response = await userService.login(login);
    if (response?.status === STATUS_CODE.STATUS_200) {
      sessionStorage.setItem(
        SESSION_STORAGE.AUTH_TOKEN_KEY,
        response.headers['authorization']
      );
      sessionStorage.setItem(
        SESSION_STORAGE.IS_FIRST_LOGIN,
        response?.data?.info?.isFirstLogin
      );
      sessionStorage.setItem(
        SESSION_STORAGE.USER_ID_KEY,
        response?.data?.info?.user
      );
      sessionStorage.setItem(
        SESSION_STORAGE.NAME_KEY,
        response?.data?.info?.name
      );
      sessionStorage.setItem(
        SESSION_STORAGE.ROLE_KEY,
        response?.data?.info?.role
      );
      sessionStorage.setItem(
        SESSION_STORAGE.CURRENT_ORG_ID,
        response?.data?.info?.org_id
      );
      sessionStorage.setItem(
        SESSION_STORAGE.LOGO,
        response?.data?.info?.org_logo
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      response.data?.info.isFirstLogin
        ? null
        : (window.location.pathname = '/');
      setIsFirst(response.data?.info.isFirstLogin ? true : false);
    }

    if (response?.status === STATUS_CODE.STATUS_200) {
      iziToast.success({
        title: TOAST_DEFAULTS.SUCCESS_TITLE,
        message: response?.data?.info
      });
    } else {
      iziToast.info({
        title: TOAST_DEFAULTS.INFO_TITLE,
        message: response?.data?.info
      });
    }
  };

  const handleOnResetPassword = async () => {
    const response = await userService.resetPasswordFirstLogin(
      login,
      Number(sessionStorage.getItem(CONSTANTS.SESSION_STORAGE.USER_ID_KEY))
    );
    if (response?.status === STATUS_CODE.STATUS_200) {
      sessionStorage.setItem(
        SESSION_STORAGE.IS_FIRST_LOGIN,
        response?.data?.info?.isFirstLogin
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      response?.data?.info?.isFirstLogin
        ? null
        : (window.location.pathname = '/');
    } else {
      iziToast.info({
        title: CONSTANTS.TOAST_DEFAULTS.INFO_TITLE,
        message: response?.data?.info
      });
    }
  };

  const checkFirstLoginCondition = () => {
    if (isFirst) {
      return !login.email || !login.password || passwordErr?.length !== 0;
    } else {
      return !login.email || emailErr.length !== 0;
    }
  };

  return (
    <>
      <div className='login-container'>
        <div className={isFirstClass}>
          <h1>Sign In</h1>
          <div className='wrapper'>
            <Input
              inputId='email'
              value={login.email}
              onChange={handleOnChange}
              placeholder='Enter Email'
              required
              isDisabled={isFirst}
              error={emailErr}
            />
            <Input
              inputType={isPasswordShow ? 'text' : 'password'}
              inputId={isFirst ? 'Old password' : 'password'}
              value={login.password}
              onChange={handleOnChange}
              placeholder={isFirst ? 'Old Password' : 'Enter Password'}
              required
              error={isFirst ? passwordErr : ''}
              sufFixIcon={
                isPasswordShow ? Icon.showPassword : Icon.hidePassword
              }
              suffixOnClick={() => setIsPasswordShow(!isPasswordShow)}
            />
          </div>
          {isFirst && (
            <div>
              <Input
                inputType={isNewPasswordShow ? 'text' : 'password'}
                inputId='new_password'
                value={login.new_password}
                onChange={handleOnChange}
                placeholder='Enter New Password'
                required
                error={passwordErr}
                sufFixIcon={
                  isNewPasswordShow ? Icon.showPassword : Icon.hidePassword
                }
                suffixOnClick={() => setIsNewPasswordShow(!isNewPasswordShow)}
              />
            </div>
          )}
          <div className='form-submit'>
            <Button
              type='primary'
              label='Login'
              onClick={isFirst ? handleOnResetPassword : handleOnSubmit}
              disabled={checkFirstLoginCondition()}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
