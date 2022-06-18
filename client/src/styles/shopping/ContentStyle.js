import styled, { css } from "styled-components";

export const Content = styled.section`
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: calc(100% - 240px);
  padding: 30px;

  h1 {
    width: 100%;
    font: 400 40px/1 "Poppins";
    color: #333;
    margin-top: 10px;
    margin-bottom: 20px;
  }

  //Store & Likes
  ${props=> (props.section==="store" || props.section==="likes") && css`
    ${Item} {
      width: calc(100% / 3 - 5px);
      aspect-ratio: 1 / 1;
      margin-bottom: 7px;
      font-size: 0px;

      img {
        height: 100%;
      }
    }

    ${TextBox} {
      margin-bottom: 15px;
      padding-left: 15px;
      padding-right: 20px;

      h2 {
        color: #fff;
        width: 100%;
        font: 16px/1.3 "Poppins";
        word-break: break-all;
        margin-bottom: 5px;
      }

      span {
        font: 14px/1 "Poppins";
        color: #ddd;
        letter-spacing: 1px;
        text-align: right;
      }
    }
  `}

  //Reviews & Order
  ${props=> (props.section==="reviews" || props.section==="order") && css`
    ${Item} {
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
      width: calc(100% / 2 - 10px);
      padding-bottom: 25px;
      margin-bottom: 20px;
      background: #ffefe3;

      img {
        height: 160px;
        margin-bottom: 25px;
      }
    }

    ${TextBox} {
      padding: 0px 25px;

      p {
        color: #333;
        margin-bottom: 5px;
        font: 14px/1.4 "Poppins";
      }

      h2 {
        font: 600 16px/1.4 "Poppins";
        color: #333;
        margin-bottom: 5px;
        word-break: break-all;
      }

      h3 {
        display: flex;
        justify-content: space-between;
        font: 13px/1 "Poppins";
        margin-top: 10px;
        margin-bottom: 5px;

        span {
          &:first-child {
            font-weight: 600;
            color: #444;
          }

          &:last-child {
            color: #555;
          }
        }
      }
    }
  `}
`;

export const Item = styled.article`
  position: relative;
  cursor: pointer;

  img {
    width: 100%;
    object-fit: cover;
  }
`;

export const TextBox = styled.div`
  width: 100%;

  >span {
    display: block;
    width: 100%;
  }
`;

//Store & Likes
export const Detail = styled.div`
  position: absolute;
  top: 0px; left: 0px;
  z-index: 10;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  content: "";
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.6));

  svg {
    position: absolute;
    top: 15px; right: 15px;
    font-size: 20px;
    color: #ff5e62;
  }
`;

//Reviews
export const Ratings = styled.div`
  margin-bottom: 10px;
  
  svg {
    color: #ff5e62;
    margin-right: 5px;
  }
`;

//Store & Order
export const PostButton = styled.button`
  width: ${props=> props.wd};
  height: ${props=>props.ht};
  background: ${props=>props.bgColor};
  border: 0px;
  border-radius: 3px;
  font: 12px/1 "Poppins";
  color: #fff;
  letter-spacing: 1px;
  cursor: pointer;

  &:hover {
    background: linear-gradient(45deg, #ff5e62, #ff9966);
  }
`;