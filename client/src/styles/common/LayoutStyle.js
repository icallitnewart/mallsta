import styled, { css } from "styled-components";

export const Background = styled.div`
  position: relative;
  top: 50px; left: 0px;
  width: 100%;
  min-height: calc(100vh - 55px);
  background: #fbfbfb;
  padding: 35px 0px;
`;

export const Container = styled.div`
  display: flex;
  width: 980px;
  margin: 0px auto;
  border: 1px solid #eee;
  background: #fff;

  ${props=> props.section==="profile" && css`
    height: 330px;
  `};
`;