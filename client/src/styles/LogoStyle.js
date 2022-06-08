import styled, { css, keyframes } from "styled-components";

const starSpin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Logo = styled.a`
  background: linear-gradient(45deg, #ff5e62, #ff9966);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
  font-size: ${props => props.fontSize + "px"};
  letter-spacing: 2px;
  font-family: 'Oleo Script', cursive;


  &::after {
    display: inline-block;
    content: "*";
    font-size: ${props=> 
      props.fontSize * 
      ((props.type === "navbar") ? 1.2 : 1.1) 
      + "px"
    };
    //animation: ${starSpin} .5s steps(100) infinite;
  }
`;