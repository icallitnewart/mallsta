import styled, { css } from "styled-components";

export const Container = styled.section`
  width: 75%;
  padding: 60px 100px 60px 40px;
`;

export const ProfileContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 110px; 
  margin-bottom: 20px;
`;

export const Pic = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40%;
  padding-left: 15px;

  &::before {
    display: inline-block;
    content: "";
    position: absolute;
    width: 110px;
    height: 110px;
    border-radius: 50%;
    background: linear-gradient(45deg, #ff9966, #ff5e62);
  }
`;

export const DeleteButton = styled.button`
  position: absolute;
  top: 90px; left: calc(50% + 50px);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  border: 0px;
  cursor: pointer;
  background: #fefefe;
  box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  
  svg {
    font-size: 16px;
    color: #a8b7c9;
  }
`;

export const Image = styled.div`
  position: relative;
  z-index: 1;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  box-sizing: content-box;
  background-image: ${props=> (props.Src !== null) ? `url(${props.Src})` : "url('/img/profile_image_default.jpg')"};
  background-size: cover;
  box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.3);
  
  ${props=> (props.Src === null) && css`
    filter: brightness(1.4);
  `}
`;

export const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 60%;

  h2 {
    font: 400 32px/1 "Poppins";
    color: #333;
    letter-spacing: 1px;
  }
`;

export const UploadButton = styled.label`
  position: relative;
  display: inline-flex;
  align-self: flex-end;
  align-items: center;
  height: 20px;
  margin-right: 30px;
  border: 0px;
  background: none;
  color: #ff5e62;
  cursor: pointer;

  span {
    text-decoration: underline;
    font: 12px/1 "Poppins";
  }

  svg {
    font-size: 16px;
    margin-left: 3px;
  }

  &:hover {
    &::before {
      position: absolute;
      z-index: 10;
      top: 29px; left: 50%;
      content: "";
      width: 10px;
      height: 10px;
      background: white;
      box-shadow: -2px -2px 3px rgba(0, 0, 0, 0.1);
      transform: rotate(45deg) translateX(-50%);


    }
    &::after {
      position: absolute;
      top: 30px; right: 0px;
      content: "Type: PNG, JPEG, JPG Max size: 1 MB";
      padding: 10px 15px;
      background: white;
      box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.1);
      font: 600 11px/1.5 "Poppins";
      color: #ff5e62;
      border-radius: 5px;
    }
  }
`;

export const ErrMsg = styled.span`
  display: inline-block;
  font: 500 12px/1 "Poppins";
  color: #ff9966;
  margin: 5px 0px 5px 3px;
`;

export const Td = styled.td`
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  width: 100% !important;
  min-height: 65px;
`;
