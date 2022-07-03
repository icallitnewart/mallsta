import React from 'react';
import { NavLink } from "react-router-dom";
import { Tab } from "../../styles/shopping/TabStyle";

import { HiOutlineShoppingBag, HiOutlineHeart, HiOutlineTag, HiOutlineChatAlt } from "react-icons/hi";

function TabMenu({ username, userInfo, isAuth }) {
  const activeStyle = ({isActive})=>({ 
    color: isActive && "#ff5e62" 
  });

  return (
    <Tab>
    {(userInfo && isAuth)
    &&
      <ul>
        <li>
          <NavLink 
            end to={`/${username}/shopping`}
            style={activeStyle}
          >
            <HiOutlineShoppingBag />
            <span>Store</span>
          </NavLink>
        </li>
        <li>
          <NavLink 
            end to={`/${username}/shopping/likes`}
            style={activeStyle}
          >
            <HiOutlineHeart />
            <span>Likes</span>
          </NavLink>
        </li>
        <li>
          <NavLink 
            end to={`/${username}/shopping/reviews`}
            style={activeStyle}
          >
            <HiOutlineChatAlt />
            <span>Reviews</span>
          </NavLink>
        </li>
        <li>
          <NavLink 
            end to={`/${username}/shopping/order`}
            style={activeStyle}
          >
            <HiOutlineTag />
            <span>Order</span>
          </NavLink>
        </li>
      </ul>
    }
    </Tab>
  )
}

export default TabMenu;