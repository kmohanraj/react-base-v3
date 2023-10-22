import React, { useState } from "react";
import { Link } from "react-router-dom";
import "styles/header.scss";
import CONSTANTS from "constants/constants";
import cx from "classnames";

export interface IMenusProps {
  path: string;
  name: string;
}

const menuConfigs = [
  {
    path: "/",
    name: "Dashboard",
  },
  {
    path: "#",
    name: "Organizations",
  },
  {
    path: "#",
    name: "Branches",
  },
  {
    path: "#",
    name: "Users",
  },
  {
    path: "#",
    name: "Customers",
  },
  {
    path: "#",
    name: "Groups",
  },
];

const Header = () => {
  const [isToggle, setIsToggle] = useState(false);
  const currentUserName = sessionStorage.getItem(
    CONSTANTS.SESSION_STORAGE.NAME_KEY
  );
  const currentUserRole = sessionStorage.getItem(
    CONSTANTS.SESSION_STORAGE.ROLE_KEY
  );
  const orgLogo = sessionStorage.getItem(CONSTANTS.SESSION_STORAGE.LOGO);
  const isMenuOpenClass = cx({ show: isToggle });
  const [isProfileShow, setIsProfileShow] = useState(false);

  const createMenuConfig = (menuConfigs: any) => {
    switch (Number(currentUserRole)) {
      case CONSTANTS.ROLE.SUPER_ID:
        delete menuConfigs[2];
        delete menuConfigs[4];
        delete menuConfigs[5];
        break;

      case CONSTANTS.ROLE.ADMIN_ID:
        delete menuConfigs[1];
        break;

      case CONSTANTS.ROLE.EMPLOYEE_ID:
        delete menuConfigs[1];
        delete menuConfigs[2];
        delete menuConfigs[3];
        break;

      default:
        delete menuConfigs[1];
        break;
    }
    return menuConfigs;
  };

  return (
    <header className="header">
      <Link to="/" className="logo">
        {orgLogo ?? "{}"}
      </Link>
      <input
        className={`menu-btn ${isMenuOpenClass}`}
        type="checkbox"
        id="menu-btn"
      />
      <label className={`menu-icon ${isMenuOpenClass}`}>
        <span className="navicon" onClick={() => setIsToggle(!isToggle)}></span>
      </label>
      <ul className={`menu ${isMenuOpenClass}`}>
        {createMenuConfig(menuConfigs).map((ele: IMenusProps, i: number) => (
          <li key={i} id="menu-btn" onClick={() => setIsToggle(!isToggle)}>
            <Link to={ele.path} id="menu-btn">
              {ele.name}
            </Link>
          </li>
        ))}
        <li
          id="menu-btn"
          className="profile"
          onClick={() => setIsProfileShow(!isProfileShow)}
        >
          <Link className="logged-user" to="" id="menu-btn">
            {currentUserName}
          </Link>
          {isProfileShow && (
            <div className="dropdown-menu">
              <Link
                to=""
                onClick={() => {
                  sessionStorage.clear();
                  window.location.pathname = "/login";
                }}
              >
                Logout
              </Link>
            </div>
          )}
        </li>
      </ul>
    </header>
  );
};
export default Header;
