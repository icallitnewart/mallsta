import styled, { css } from "styled-components";

export const AsideFilter = styled.aside`
  position: relative;
  width: 240px;
  min-height: 50px;
  padding: 30px 10px 30px 30px;
`;

export const Container = styled.div`
  position: sticky;
  top: 20px;

  h1 {
    font: 20px/1 "Poppins";
    margin: 20px 10px 5px;
    color: #ff9966;
    letter-spacing: 1px;
  }
`;

//SearchBox
export const Search = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 25px;

  input[type=text] {
    width: 100%;
    height: 35px;
    background: linear-gradient(45deg, #ff9966, #ff5e62);
    border: 1px solid #ff9966;
    border-right: 0px;
    border-radius: 20px;
    padding: 0px 48px 0px 15px;
    font: 13px/1 "Poppins";
    color: #fff;
    outline:none;

    &::placeholder {
      color: #fff;
      letter-spacing: 1px;
    }
  }

  button {
    position: absolute;
    top: 3px; right: 3px;
    width: 35px;
    height: 29px;
    background: #fff;
    border: 0px;
    border-radius: 20px;
    cursor: pointer;

    svg {
      color: #ff5e62;
      font-size: 17px;
      margin-top: 1px;
      //margin-right: 3px;
    }
  }
`;

//Category
export const Category = styled.div`
  width: 100%;
  padding-left: 10px;

  ${props=> props.isActive && css`
    ${ToggleButton} {
      font-weight: 600;
      color: #ff5e62;

      &::before {
        color: #ff5e62;
        transform: rotate(90deg);
      }
    }
    ${Dropdown} {
      display: block;
    }
  `}
`;

export const ToggleButton = styled.span`
  display: inline-flex;
  align-items: center;
  width: 100%;
  height: 35px;
  font: 15px/35px "Poppins";
  color: #555;
  cursor: pointer;

  &::before {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    content: ">";
    font: 600 15px/35px "Poppins";
    margin-right: 8px;
    color: #666;
  }
`;

export const Dropdown = styled.ul`
  display: none;
  margin-top: 5px;
  margin-bottom: 20px;

  li {
    margin-bottom: 10px;
    padding-left: 18px;

    label {  
      display: flex;
      align-items: center;
    }

    input[type=checkbox], input[type=radio] {
      margin-right: 5px;
    }
    
    span {
      font: 14px/1 "Poppins";
      color: #666;
    }
  }
`;