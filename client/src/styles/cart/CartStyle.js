import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 980px;
  margin: 0px auto 30px;
`;

export const Container = styled.div`
  width: ${props=> props.wd};
  border: 1px solid #eee;
  background: #fff;
  padding: ${props=> props.padd};
`;

//CartList : Start
export const Title = styled.h1`
  font: 400 36px/1 "Poppins";
  letter-spacing: 2px;
  margin-bottom: 20px;
  color: #555;
  text-align: center;
`;

export const ItemList = styled.div`
  width: 100%;
`;

export const CartItem = styled.article`
  display: flex;
  width: 100%;
  height: 130px;
  padding: 15px 0px;
  border-bottom: 1px solid #eee;

  &:last-child {
    height: 115px;
    border-bottom: 0px;
    padding-bottom: 0px;
  }
`;

export const Pic = styled.div`
  width: 100px;
  height: 100px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const TextBox = styled.div`
  width: calc(100% - 100px - 120px);
  height: 100%;
  padding: 10px 20px;

  //product name
  h2 {
    font-size: 0px;
    margin-bottom: 8px;

    a {
      font: 500 16px/1.2 "Poppins";
      color: #444;
      word-break: break-all;
    }
  }

  //store name
  p {
    font: 14px/1 "Poppins";
    color: #555;
    margin-bottom: 5px;
  }

  //price
  span {
    font: 500 15px/1 "Poppins";
    color: #ff9966;
  }
`;

export const QuantityBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  width: 120px;
  height: 100%;
  padding: 15px 15px 0px;
  border-left: 1px solid #eee;
`;

export const DeleteButton = styled.button`
  position: absolute;
  top: 0px; right: 0px;
  background: transparent;
  border: 0px;
  cursor: pointer;

  svg {
    font-size: 16px;

    path { 
      stroke: #bbb;
    }
  }
`;

export const QuantityController = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 15px;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    border: 1px solid #ff9965db;
    background: transparent;
    border-radius: 2px;
    margin: 0px 5px;
    cursor: pointer;
    transition: .5s;

    svg {
      font-size: 12px;
      color: #ff9966;
    }

    &:hover {
      background: #ff9966;
      border: 1px solid #ff9965;

      svg {
        color: #fff;
      }
    }
  }

  span {
    display: inline-flex;
    justify-content: center;
    min-width: 20px;
    font: 500 14px/1 "Poppins";
    color: #333;
  }
`;

export const Price = styled.span`
  font: 500 20px/1 "Poppins";
  color: #333;
  margin-left: -5px;
`;
//CartList : End


//Wishlist : Start
export const Title2 = styled.h3`
  font: 500 16px "Poppins";
  text-align: right;
  color: #333;
  padding-right: 9px;
  margin-bottom: 5px;

  svg {
    margin-left: 4px;
    vertical-align: -2px;
    font-size: 15px;
    color: #ff5e62;
  }
`;

export const LikeList = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  max-height: ${props=> `calc(150px * ${props.cartItems})`};
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0px;
  }
`;

export const LikeItem = styled.article`
  position: relative;
  width: 120px;
  height: 120px;
  background: olivedrab;
  margin-bottom: 10px;
  border-radius: 3px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  button {
    position: absolute;
    top: 8px; right: 8px;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    background: #ff5e62;
    border: 0px;
    border-radius: 50%;
    cursor: pointer;

    svg {
      color: #fff;
      font-size: 14px;
      margin-bottom: 1px;
    }
  }
`;

export const DetailBox = styled.div`
  position: absolute;
  top: 0px; left: 0px;
  z-index: 10;
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.5));
  padding: 15px 10px;
  cursor: pointer;

  h4 {
    font: 12px/1.2 "Poppins";
    color: #fff;
    word-break: break-all;
  }
`;
//Wishlist : End


//Checkout : Start
export const ShippingBox = styled.div`
  width: calc(75% - 20px);
  margin-right: 20px;
  padding: 5px 10px;

  h5 {
    display: flex;
    justify-content: space-between;
    font: 20px/1 "Poppins";
    color: #333;
    margin-bottom: 10px;

    a {
      font: 16px/20px "Poppins";
      margin-left: 10px;
      color: #ff9966;
    }
  }

  table {
    width: 100%;
    border-spacing: 0px 10px;

    tr {
      &:last-child {
        td p {
          margin-bottom: 10px;
        }
      }

      th {
        width: 17%;
        text-align: left;
        font: 500 15px/1.4 "Poppins";
        color: #555;
        letter-spacing: 1px;
        margin-right: 10px;
        vertical-align: top;
      }
      
      td {
        width: 83%;
        font: 15px/1.2 "Poppins";
        color: #555;
        word-break: break-all;
        margin-bottom: 5px;
      }
    }
  }
`;

export const ErrMsg = styled.p`
  line-height: 1.5;
  color: #ff5e62;
`;

export const PriceBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 25%;
  border-left: 1px solid #eee;
  padding-left: 25px;

  p {
    font: 600 26px/1 "Poppins";
    color: #333;
    margin-bottom: 15px;
    text-align: center;
  }

  span {
    font: 400 40px/1 "Poppins";
    color: #333;
    margin-bottom: 10px;

    &:nth-of-type(2) {
      margin-bottom: 5px;
    }
  }

  button {
    margin-top: 10px;
    padding: 15px 20px;
    background: #ff9966;
    border: 0px;
    border-radius: 3px;
    font: 16px/1 "Poppins";
    color: #fff;
    cursor: pointer;
    background: linear-gradient(to left, #ff9966, #ff5e62);
  }
`;
//Checkout : End