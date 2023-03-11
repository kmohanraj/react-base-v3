import React, { FC } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ErrorPage from 'components/atoms/ErrorPage';
import { IAppRouteProps } from 'types/routes.types';
import Header from 'components/atoms/Header';
import Footer from 'components/atoms/Footer';
import 'styles/app-routes.scss';
import CONSTANTS from 'constants/constants';

const AppRoutes: FC<IAppRouteProps> = (props) => {
  const currentUserId = sessionStorage.getItem(
    CONSTANTS.SESSION_STORAGE.USER_ID_KEY
  );
  const isFirstLogin = sessionStorage.getItem(
    CONSTANTS.SESSION_STORAGE.IS_FIRST_LOGIN
  );
  return (
    <BrowserRouter>
      <Routes>
        {props.routeConfig.map((ele, index) => (
          <Route
            path={ele.path}
            element={
              !ele.isLoginRequired ? (
                ele.path.includes('login') &&
                currentUserId &&
                isFirstLogin === 'false' ? (
                  <Navigate to='/' />
                ) : (
                  <React.Fragment>
                    <ele.component />
                  </React.Fragment>
                )
              ) : currentUserId !== undefined &&
                currentUserId !== null &&
                isFirstLogin === 'false' ? (
                <React.Fragment>
                  <Header />
                  <div className='container'>
                    <ele.component />
                  </div>
                  <Footer />
                </React.Fragment>
              ) : (
                <Navigate to='/login' />
              )
            }
            key={index}
          />
        ))}
        <Route
          path='*'
          element={<ErrorPage title='404' message='Page Not found' />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
