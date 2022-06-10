import styled, { css } from "styled-components";

export const Container = styled.section`
  width: 75%;
  padding: 60px 100px 60px 40px;
`;

export const ProfileBox = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100px; 
  margin-bottom: 20px;
`;

export const Pic = styled.div`
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

export const Image = styled.div`
  position: relative;
  z-index: 1;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: lightpink;
  box-sizing: content-box;
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

export const UploadButton = styled.button`
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
`;
