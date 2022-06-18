import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  
`;

export const Pic = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 215px;
  height: 215px;
  margin-right: 50px;

  &::before {
    position: absolute;
    display: block;
    content: "";
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: linear-gradient(45deg, #ff9966, #ff5e62);
  }
`;

export const Image = styled.div`
  position: relative;
  z-index: 10;
  width: calc(100% - 15px);
  height: calc(100% - 15px);
  background-image: url('/img/profile_image_default.jpg');
  background-size: cover;
  border-radius: 50%;
  box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.3);
`;

export const Detail = styled.div`
  width: 500px;
  height: 215px;
  padding: 20px 10px;

  h1 {
    display: flex;
    font: 36px/1 "Poppins";
    color: #444;
    letter-spacing: 2px;

    span {
      margin-right: 7px;
    }
  }

  >span {
    display: inline-block;
    font: 600 12px/1 "Poppins";
    color: #ff9966;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 20px;
    margin-right: 20px;
  }

  p {
    font: 16px/1.5 "Poppins";
    color: #444;
  }
`;

export const SettingsButton = styled(Link)`
  color: #777;
  font-size: 24px;
  align-self: flex-end;
`;