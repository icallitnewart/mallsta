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
  background-image:  ${props=> !props.Src ? `url('/img/profile_image_default.jpg')` : `url(${props.Src})`};
  background-size: cover;
  border-radius: 50%;
  box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.3);

  ${props=> !props.Src && css`
    filter: brightness(1.3);
  `}
`;

export const Detail = styled.div`
  width: 500px;
  height: 215px;
  padding: 20px 10px;
`;

export const Username = styled.h1` 
  display: flex;
  font: 36px/1 "Poppins";
  color: #444;
  letter-spacing: 2px;
  margin-bottom: 15px;

  span {
    margin-right: 7px;
  }
`

export const SettingsButton = styled(Link)`
  color: #777;
  font-size: 24px;
  align-self: flex-end;
`;

export const Rank = styled.ul`
  display: flex;
  margin-bottom: 10px;

  li {
    width: 70px;
    font: 700 11px/1 "Poppins";
    color: #666;
    text-transform: uppercase;
    letter-spacing: 1px;

    &:first-child {
      width: 80px;
      color: #ff9966;
      font: 600 12px/1 "Poppins";
    }

    &:nth-of-type(3) {
      width: 100px;
    }

    span {
      font-weight: 500;
      margin-left: 5px;
    }
  }
`;

export const Intro = styled.p`
  font: 14px/1.5 "Noto Sans KR";
  color: #555;
  margin-top: 20px;

  ${props=> !props.isStoreOwner && css`
    font: 600 14px/1.5 "Poppins";
    text-transform: uppercase;
  `}
`;