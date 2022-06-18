import styled, { css } from "styled-components";

export const Tab = styled.nav`
display: flex;
justify-content: center;
align-items: center;
width: 980px;
height: 50px;
margin: 0px auto;

  ul {
    display: flex;
  }

  li {
    margin: 0px 10px;

    a {
      display: flex;
      align-items: center;
      color: #777;

      svg {
        font-size: 16px;
        margin-right: 3px;
      }

      span {
        font: 14px/1 "Poppins";
      }
    }

  }
`;