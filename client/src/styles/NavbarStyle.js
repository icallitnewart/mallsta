import styled, { css } from "styled-components";

export const Header = styled.header`
  width: 100%;
  height: 55px;
  background: #fff;
  border-bottom: 1px solid #eee;
`;

export const Inner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 980px;
  height: 100%;
  margin: 0px auto;
`;

export const Nav = styled.nav`
  
`;

export const Ul = styled.ul`
  display: flex;
`;

export const Li = styled.li`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  margin-left: 15px;

  svg {
    font-size: 20px;
    color: #ff5e62;
    cursor: pointer;
    padding: 5px;
    box-sizing: content-box;
  }

  //장바구니 아이템 개수 아이콘
  ${props=> (props.isCartEmpty===false) && css`
    &::after {
      position: absolute;
      top: 2px; left: 15px;
      display: block;
      content: "100";
      padding: 3px;
      color: white;
      font: 8px/9px "Poppins";
      border-radius: 50%;
      background: #f64146;
    }`
  }
`;

export const Dropdown = styled.div`
  position: absolute;
  top: 42px; right: -30px;
  width: 160px;
  background: #fff;
  box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.1);
  border-radius: 5px;

  &::before {
    position: absolute;
    top: -6px; right: 38px;
    z-index: 1000;
    display: inline-block;
    content: "";
    width: 12px;
    height: 12px;
    background: #fff;
    transform: rotate(45deg);
    box-shadow: -2px -2px 3px rgba(0, 0, 0, 0.1);
  }
`;

export const DropdownBox = styled.ul`
  padding: 10px 0px;
`;

export const DropdownItems = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  cursor: pointer;
  
  a {
    font: 13px/1 "Poppins";
    color: #666;
  }

  &:hover a {
    color: #ff5e62;
  }
`;
