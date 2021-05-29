import { useState } from "react";
import { MdHome, MdKeyboardArrowUp } from "react-icons/md";
import { VscClose } from "react-icons/vsc";
import { NavLink } from "react-router-dom";
import { BiBookAdd } from "react-icons/bi";
import styled from "styled-components";
import { AiOutlineEye } from "react-icons/ai";
import { Collapse } from "@material-ui/core";

const CloseButton = styled.button`
  padding: 0;
  background-color: transparent;
  border: none;
  color: inherit;
`;

const Arrow = styled(MdKeyboardArrowUp)`
  transition: all 150ms ease-in-out;
  &.collapsed {
    transform: rotate(180deg);
  }
`;

const SidebarText = styled.span`
  margin-left: 15px;
`;

const CollapseList = (props) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <div onClick={() => setCollapsed(!collapsed)} className="sidebar-list">
        {props.text}
        <Arrow size="18px" className={`${collapsed ? "collapsed" : ""}`} />
      </div>
      <Collapse in={!collapsed} timeout={250}>
        {props.children}
      </Collapse>
    </>
  );
};

const Sidebar = (props) => {
  return (
    <div className={`sidebar ${props.class}`}>
      <header className="sidebar-header">
        <CloseButton onClick={props.close}>
          <VscClose size="25px" />
        </CloseButton>
      </header>
      <div className="sidebar-content">
        <NavLink exact to="/home" className="sidebar-item">
          <MdHome size="18px" />
          <SidebarText>Trang chủ</SidebarText>
        </NavLink>
        <CollapseList text="Quản lý chuyến xe">
          <NavLink exact to="/home/bus" className="sidebar-item nested">
            <AiOutlineEye size="18px" />
            <SidebarText>Xem</SidebarText>
          </NavLink>
          <NavLink exact to="/home/bus:/create" className="sidebar-item nested">
            <BiBookAdd size="18px" />
            <SidebarText>Thêm mới</SidebarText>
          </NavLink>
        </CollapseList>
        <CollapseList text="Quản lý trạm xe">
          <NavLink exact to="/home/busstop" className="sidebar-item nested">
            <AiOutlineEye size="18px" />
            <SidebarText>Xem</SidebarText>
          </NavLink>
          <NavLink
            exact
            to="/home/busstop:/create"
            className="sidebar-item nested"
          >
            <BiBookAdd size="18px" />
            <SidebarText>Thêm mới</SidebarText>
          </NavLink>
        </CollapseList>
        <CollapseList text="Quản lý user">
          <NavLink exact to="/home/user" className="sidebar-item nested">
            <AiOutlineEye size="18px" />
            <SidebarText>Xem</SidebarText>
          </NavLink>
        </CollapseList>
      </div>
      <footer className="sidebar-footer">
        <small>Copyright © 2021 Bus Station - All Rights Reserved</small>
      </footer>
    </div>
  );
};

export default Sidebar;
