import React, { FC, useCallback, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ErrorPage from "components/atoms/ErrorPage";
import { IAppRouteProps } from "types/routes.types";
import Header from "components/atoms/v2/Navbar";
import Footer from "components/atoms/Footer";
import "styles/app-routes.scss";
import CONSTANTS from "constants/constants";
import SessionExpired from "components/molecules/SessionExpired";

const AppRoutes: FC<IAppRouteProps> = (props) => {
  const currentUserId = sessionStorage.getItem(
    CONSTANTS.SESSION_STORAGE.USER_ID_KEY
  );
  const isFirstLogin = sessionStorage.getItem(
    CONSTANTS.SESSION_STORAGE.IS_FIRST_LOGIN
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [events, setEvents] = useState(["click", "load", "scroll"]);
  const [isExpired, setIsExpired] = useState(false);

  const parseJwt = (token: string) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  let resetTime = useCallback(() => {
    const decodeJwt = parseJwt(
      String(sessionStorage.getItem(CONSTANTS.SESSION_STORAGE.AUTH_TOKEN_KEY))
    );
    if (decodeJwt?.exp * 1000 < Date.now()) {
      setIsExpired(true);
    }
  }, []);

  const handleOnClearSession = () => {
    setIsExpired(false);
    sessionStorage.clear();
    window.location.pathname = "/login";
  };

  useEffect(() => {
    events.forEach((event) => {
      window.addEventListener(event, resetTime);
    });
  }, [events, resetTime]);

  return (
    <BrowserRouter>
      <Routes>
        {props.routeConfig.map((ele, index) => (
          <Route
            path={ele.path}
            element={
              !ele.isLoginRequired ? (
                ele.path.includes("login") &&
                currentUserId &&
                isFirstLogin === "false" ? (
                  <Navigate to="/" />
                ) : (
                  <React.Fragment>
                    <ele.component />
                  </React.Fragment>
                )
              ) : currentUserId !== undefined &&
                currentUserId !== null &&
                isFirstLogin === "false" ? (
                <React.Fragment>
                  <Header />
                  <div className="container">
                    <ele.component />
                  </div>
                  <Footer />
                </React.Fragment>
              ) : (
                <Navigate to="/login" />
              )
            }
            key={index}
          />
        ))}
        <Route
          path="*"
          element={<ErrorPage title="404" message="Page Not found" />}
        />
      </Routes>
      <SessionExpired
        show={isExpired}
        title={"Your session has timed out. Please log in again"}
        actionMode={"Login"}
        onClick={handleOnClearSession}
      />
    </BrowserRouter>
  );
};

export default AppRoutes;
