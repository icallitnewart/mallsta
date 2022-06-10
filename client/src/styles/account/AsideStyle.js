import styled, { css } from "styled-components";

export const Aside = styled.aside`
  width: 25%;
  border-right: 1px solid #eee;
`;

export const MenuBox = styled.ul`
  width: 100%;
  padding: 30px 0px;
`;

export const MenuItems = styled.li`
  width: 100%;
  height: 50px;
  text-align: center;

  a {
    font: 16px/50px "Poppins";
    color: #555;
  }
`;