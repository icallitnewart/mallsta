import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Header, Inner, Nav, Ul, Li, Dropdown,DropdownBox, DropdownItems } from "../../styles/NavbarStyle";
import { Logo } from "../../styles/LogoStyle";
import { BsSuitHeart, BsCart } from "react-icons/bs";
import { IoPersonOutline } from "react-icons/io5";

function Navbar() {
  const user = useSelector(state => state.user);
  const navigate = useNavigate();
  const [ isLoggedIn, setIsLoggedIn ] = useState(user.userData ? true : false);
  const [ showDropdown, setShowDropdown ] = useState(false);

  //로그인 여부 설정
  useEffect(()=> {
    (user.userData) 
    ? setIsLoggedIn(true)
    : setIsLoggedIn(false);
  }, [user.userData]);

  //계정 아이콘 클릭시
  const handleAccountClick = (e)=> {
    //로그인했을 경우
    if(isLoggedIn) {
      e.preventDefault();
      setShowDropdown(!showDropdown);
    }
  };

  //하트 아이콘 클릭시
  const handleHeartClick = (e)=> {
    //로그인 안 했을 경우 로그인 페이지로 이동
    if(!isLoggedIn) {
      e.preventDefault();

      if(window.confirm("This feature requires login. Would you like to login?")) {
        navigate("/login");
      }
    }
  };

  const renderNav = ()=> {
    return (
      <Ul>
        <Li>
          <Link to="/likes" onClick={handleHeartClick}>
            <BsSuitHeart />
          </Link>
        </Li>
        <Li isCartEmpty={false}>
          <Link to="/cart">
            <BsCart />
          </Link>
        </Li>
        <Li>
          <Link to="/login" onClick={handleAccountClick}>
            <IoPersonOutline />
          </Link>
          {/* 계정 소메뉴 */}
          {(isLoggedIn && showDropdown) &&
          <Dropdown>
            <DropdownBox>
              <DropdownItems>
                <Link to="/">My Page</Link>
              </DropdownItems>
              <DropdownItems>
                <Link to="/">Settings</Link>
              </DropdownItems>
              <DropdownItems>
                <Link to="/">Logout</Link>
              </DropdownItems>
            </DropdownBox>
          </Dropdown>
          }
        </Li>
      </Ul>
    )
  };
  
  return (
    <Header>
      <Inner>
        <Logo 
          to="/"
          fontSize={22}
          type={"navbar"}
        >Mallsta</Logo>

        <Nav>
          {renderNav()}
        </Nav>
      </Inner>
    </Header>
  )
}

export default Navbar;