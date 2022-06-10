import React from 'react';
import { NavLink } from "react-router-dom";
import { Aside, MenuBox, MenuItems } from "../../styles/account/AsideStyle";

function AsideMenu() {
  const activeStyle = ({isActive})=> ({
    fontWeight : isActive && "600",
    color: isActive && "#ff5e62" 
  });
  
  return (
    <Aside>
      <MenuBox>
        <MenuItems>
          <NavLink 
            to="/account/profile"
            style={activeStyle}
          >
            My Profile
          </NavLink>
        </MenuItems>
        <MenuItems>
          <NavLink 
            to="/account/store"
            style={activeStyle}
          >
            Manage Store
          </NavLink>          
        </MenuItems>
      </MenuBox>
    </Aside>
  )
}

export default AsideMenu;