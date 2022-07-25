import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Header, Inner, Nav, Ul, Li, CartItems, Dropdown, DropdownBox, DropdownItems } from "../../styles/common/NavbarStyle";
import { Logo } from "../../styles/common/LogoStyle";
import { BsSuitHeart, BsCart } from "react-icons/bs";
import { IoPersonOutline } from "react-icons/io5";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useSelector(state=> state.user.userData);
  const cart = useSelector(state=> state.user.cart);
  const username = auth.username;

  const [ isLoggedIn, setIsLoggedIn ] = useState(null);
  const [ showDropdown, setShowDropdown ] = useState(false);
  const [ cartItems, setCartItems ] = useState(null);

  //로그인 여부, 장바구니 개수 설정
  useEffect(()=> {
    if(auth) {
      setIsLoggedIn(true);
      setCartItems(auth.cart.length);
    } else {
      setIsLoggedIn(false);
    }
  }, [auth]);

  //장바구니 상품 변경시 상품 개수 업데이트
  useEffect(()=> {
    if(cart) {
      const itemLen = cart.cartItems.length;
      setCartItems(itemLen);
    }
  }, [cart]);

  //드롭다운 메뉴 클릭 후 경로 이동시 메뉴 숨기기 
  useEffect(()=> {
    if(showDropdown) setShowDropdown(false);
  }, [location]);

  //계정 아이콘 클릭시 드롭다운 메뉴 출력
  const handleAccountClick = (e)=> {
    //로그인했을 경우
    if(isLoggedIn) {
      e.preventDefault();
      setShowDropdown(!showDropdown);
    }
  };

  //로그인 안 했을 경우 로그인 페이지로 이동
  const replaceLink = (e)=> {
    if(!isLoggedIn) {
      e.preventDefault();

      if(window.confirm("This feature requires login. Would you like to login?")) {
        navigate("/membership/login");
      }
    }
  };

  //로그아웃 기능
  const handleLogout = (e)=> {
    e.preventDefault();

    axios.
    get('/api/users/logout')
    .then(response=> {
      if(response.data.success) {
        alert("Logout complete!");
        window.location.replace("/");
      } else {
        alert("Logout failed.");
      }
    });
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
          <Ul>
            <Li>
              <Link 
                to={isLoggedIn ? `/${username}/shopping/likes` : "/"} 
                onClick={replaceLink}
              >
                <BsSuitHeart />
              </Link>
            </Li>
            <Li>
              <Link 
                to={isLoggedIn ?`/${username}/cart` : "/"}
                onClick={replaceLink}
              >
                <BsCart />
              </Link>
              {(isLoggedIn && cartItems > 0) &&
                <CartItems>
                  {(cartItems > 99) 
                  ? "99+"
                  : cartItems 
                  }
                </CartItems>
              }
            </Li>
            <Li>
              <Link to="/membership/login" onClick={handleAccountClick}>
                <IoPersonOutline />
              </Link>
              {/* 드롭다운 메뉴 (로그인) */}
              {(isLoggedIn && showDropdown) &&
              <Dropdown>
                <DropdownBox>
                  <DropdownItems>
                    <Link to={`/${username}/shopping`}>My Shopping</Link>
                  </DropdownItems>
                  <DropdownItems>
                    <Link to="/account/profile">Settings</Link>
                  </DropdownItems>
                  <DropdownItems>
                    <Link to="/" onClick={handleLogout}>Logout</Link>
                  </DropdownItems>
                </DropdownBox>
              </Dropdown>
              }
            </Li>
          </Ul>
        </Nav>
      </Inner>
    </Header>
  )
}

export default Navbar;