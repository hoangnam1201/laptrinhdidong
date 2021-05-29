import React, { useContext } from "react";
import { Drawer, IconButton } from "@material-ui/core";
import { useRef, useState } from "react";
import { AiFillSetting, AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import logobus from "../assets/logobus1.png";
import AppContext from "../AppContext";
const Appbar = () => {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const [userMenuToggle, setUserMenuToggle] = useState(false);
  const anchorRef = useRef(null);
  const menuRef = useRef(null);
  const { state, dispatch } = useContext(AppContext);
  const { user } = state;

  const Logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    dispatch({ type: "CURRENT_USER", payload: null });
    window.location.reload();
  };
  return (
    <div className="appbar">
      <IconButton
        id="toggle-button"
        onClick={() => setSidebarToggle(!sidebarToggle)}
      >
        <AiOutlineMenu />
      </IconButton>
      <Link to="/">
        <img src={logobus} alt="logo" height="50px" className="mx-3" />
      </Link>
      <div ref={menuRef} className="position-relative">
        {/* <IconButton
                    ref={anchorRef}
                    onClick={() => setUserMenuToggle(!userMenuToggle)}
                >
                    <AiFillSetting size="30px" />
                </IconButton> */}
        <ul className="nav-main">
          {user ? (
            <>
              <li>
                <span className="user-name">Hello, {user.username}</span>
              </li>
              <li onClick={() => Logout()}>LogOut</li>
            </>
          ) : (
            <>
              <span>Tài Khoản</span>
            </>
          )}
        </ul>
      </div>
      <Drawer open={sidebarToggle} onClose={() => setSidebarToggle(false)}>
        <Sidebar close={() => setSidebarToggle(false)} />
      </Drawer>
    </div>
  );
};
export default Appbar;
