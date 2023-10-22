import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import cx from "classnames";
import "styles/navbar.scss";
import { ReactComponent as Open } from "assets/images/bar_black.svg";
import { ReactComponent as Close } from "assets/images/cross.svg";
import CONSTANTS from "constants/constants";

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
    name: "Customers",
  },
  {
    path: "#",
    name: "Users",
  },
];

const Navbar = () => {
  const [isToggle, setIsToggle] = useState(false);
  const currentUserName = sessionStorage.getItem(
    CONSTANTS.SESSION_STORAGE.NAME_KEY
  );
  const currentUserRole = sessionStorage.getItem(
    CONSTANTS.SESSION_STORAGE.ROLE_KEY
  );
  // const orgLogo = sessionStorage.getItem(CONSTANTS.SESSION_STORAGE.LOGO);
  // const isMenuOpenClass = cx({ show: isToggle });
  const [isProfileShow, setIsProfileShow] = useState(false);

  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const [slectedMenu, setSelectedMenu] = useState("Dashboard");

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
        break;
    }
    return menuConfigs;
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            {CONSTANTS.COMPANY_NAME}
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <div className="humber-icon">
              {click ? (
                <Close fill="white" stroke="none" />
              ) : (
                <Open fill="white" stroke="none" />
              )}
            </div>
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            {createMenuConfig(menuConfigs).map(
              (ele: IMenusProps, i: number) => (
                <li
                  className="nav-item"
                  key={i}
                  id="menu-btn"
                  onClick={() => setIsToggle(!isToggle)}
                >
                  <NavLink
                    to={ele.path}
                    className={cx("nav-links", {
                      activated: slectedMenu === ele.name ? "activated" : "",
                    })}
                    onClick={() => {
                      setSelectedMenu(ele.name);
                      closeMobileMenu();
                    }}
                  >
                    {ele.name}
                  </NavLink>
                </li>
              )
            )}
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
        </div>
      </nav>
    </>
  );
};
export default Navbar;
