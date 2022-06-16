import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.section`
  width: 75%;
  padding: ${props=> (!props.isSeller) ? "100px 0px 180px" : "60px 100px 60px 40px"};

  ${props=> (!props.isSeller) && css`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  `}
`;

//StoreOpen
export const P = styled.p`
  width: 100%;
  text-align: center;
  font: 500 20px/1.8 "Poppins";
  color: #555;
  margin-bottom: 30px;
`;

export const StoreButton = styled.button`
  width: 150px;
  height: 40px;
  background: #ff5e62;
  color: #fff;
  border: 0px;
  border-radius: 3px;
  font: 14px/1 "Poppins";
  letter-spacing: 1px;
  cursor: pointer;
`;


//StoreForm
export const Title = styled.h1`
  text-align: right;
  font: 500 34px/1 "Poppins";
  margin-bottom: 20px;
  color: #444;
`;

export const ProductBox = styled.div`
  display: flex; 
  justify-content: space-between; align-items: center;
`;

export const PostButton = styled(Link)`
  display: inline-block;
  padding: 10px;
  background: #ff9966;
  font: 13px/1 "Poppins";
  border-radius: 2px;
  color: #fff;
`;


