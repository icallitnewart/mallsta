import styled, { css, keyframes } from "styled-components";

export const Background = styled.div`
  position: fixed;
  top: 0px; left: 0px;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
`;

export const Container = styled.div`
  position: relative;
  display: flex;
  width: 800px;
  height: 530px;
  background: #fff;
  border-radius: 3px;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.2);
  overflow: hidden;

  >form {
    width: 55%;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 14px; right: 10px;
  background: transparent;
  border: 0px;
  cursor: pointer;

  svg {
    font-size: 20px;

    path {
      stroke: #666;
    }
  }
`;


//ImageUpload / ImageView : Start
export const ImageBox = styled.div`
  position: relative;
  width: 45%;
  height: 100%;
  font-size: 0px;
  background: #fbfbfb;
  
  form {
    display: flex;
    width: 100%;
  }
`;

export const ImageBig = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  background: #ddd;
  overflow: hidden;

  &::before {
    position: absolute;
    top: 0px; left: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    content: "No Image";
    width: 100%;
    height: 100%;
    font: 600 22px/1 "Poppins";
    color: #fff;
  }

  img {
    position: relative;
    z-index: 10;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ArrowBtn = styled.button`
  position: absolute;
  top: 50%; 
  z-index: 100;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0px;
  background: transparent;
  border-radius: 50%;
  filter: drop-shadow(0px 0px 3px rgba(0, 0, 0, 0.2));
  cursor: pointer;
  
  svg {
    width: 25px;
    height: 25px;
    color: rgba(255, 255, 255, 1);
    border-radius: 50%;
    transition: .5s;
  }

  ${props=> (props.btnType === "prev") && css`
    left: 5px;
  `}

  ${props=> (props.btnType === "next") && css`
    right: 5px;
  `}
`;

export const Disc = styled.div`
  position: absolute;
  bottom: 0px; left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  display: flex;
`;

export const Dot = styled.span`
  display: inline-block;
  width: 7px; 
  height: 7px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.8);
  margin: 10px 3px;
  cursor: pointer;

  ${props=> props.isActive && css`
      background: rgba(255, 255, 255, 0.8);
  `}
`;

export const Images = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: ${props=> props.imgNum * 100}%;
  transform: translateX(${props=> props.slide}%);
  transition: .5s;

  li {
    width: ${props=> 100 / props.imgNum}%;
    height: 100%;
    aspect-ratio: 1 / 1;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

export const ImageFilter =styled.ul`
  width: 100%;
  padding: 12px 20px 3px;
`;

export const FilterOption = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 30px; 

  label, span {
    font: 600 10px/1 "Poppins";
    color: #555;
    letter-spacing: 1px;
    text-transform: uppercase;
    text-align: center;
  }

  span {
    display: inline-block;
    width: 34px;
    color: #ff9966;
  }

  label {
    width: 75px;
  }

  input[type=range] {
    width: 180px;
    height: 28px;
    -webkit-appearance: none;
    margin: 10px 0;
    background: #fbfbfb;
  }

  input[type=range]:focus {
    outline: none;
  }

  input[type=range]::-webkit-slider-runnable-track {
    width: 100%;
    height: 10px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 0px 0px 0px #EEEEEE;
    background: #ddd;
    border-radius: 5px;
    border: 0px solid #BBBBBB;
  }

  input[type=range]::-webkit-slider-thumb {
    box-shadow: 0px 0px 0px #888888;
    border: 0px solid #888888;
    height: 18px;
    width: 18px;
    border-radius: 15px;
    background: #FFC496;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -4px;
  }

  input[type=range]:focus::-webkit-slider-runnable-track {
    background: #ddd;
  }

  input[type=range]::-moz-range-track {
    width: 100%;
    height: 10px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 0px 0px 0px #EEEEEE;
    background: #ddd;
    border-radius: 5px;
    border: 0px solid #BBBBBB;
  }

  input[type=range]::-moz-range-thumb {
    box-shadow: 0px 0px 0px #888888;
    border: 0px solid #888888;
    height: 18px;
    width: 18px;
    border-radius: 15px;
    background: #FFC496;
    cursor: pointer;
  }

  input[type=range]::-ms-track {
    width: 100%;
    height: 10px;
    cursor: pointer;
    animate: 0.2s;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }

  input[type=range]::-ms-fill-lower {
    background: #ddd;
    border: 0px solid #BBBBBB;
    border-radius: 10px;
    box-shadow: 0px 0px 0px #EEEEEE;
  }

  input[type=range]::-ms-fill-upper {
    background: #ddd;
    border: 0px solid #BBBBBB;
    border-radius: 10px;
    box-shadow: 0px 0px 0px #EEEEEE;
  }

  input[type=range]::-ms-thumb {
    margin-top: 1px;
    box-shadow: 0px 0px 0px #888888;
    border: 0px solid #888888;
    height: 18px;
    width: 18px;
    border-radius: 15px;
    background: #FFC496;
    cursor: pointer;
  }

  input[type=range]:focus::-ms-fill-lower {
    background: #ddd;
  }

  input[type=range]:focus::-ms-fill-upper {
    background: #ddd;
  }
`;

export const ThumbnailBox = styled.ul`
  display: flex;
  align-content: center;
  flex-wrap: wrap;
  width: 100%;
  height: 60px;
  padding: 0px 15px;

  li:last-child {
    display: flex;
    align-items: center;
    width: calc(100% - (40px * 4) - 40px);
    margin-left: auto;
  }
`;

export const ImageSmall = styled.li`
  position: relative;
  width: 40px;
  aspect-ratio: 1 / 1;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  margin-right: 10px;
  cursor: pointer;

  span {
    position: absolute;
    top: -2px; right: -2px;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 10px;
    height: 10px;
    box-sizing: content-box;
    background: #fff;
    border: 1px solid #888;
    border-radius: 50%;

    &:hover {
      border: 1px solid #333;
    }

    svg {
      font-size: 6px;
      color: #555;
      cursor: pointer;
    }
  }

  ${props=> props.isActive && css`
    &::after {
      position: absolute;
      top: 0px; left: 0px;
      z-index: 10;
      display: block;
      content: "";
      width: 100%; height: 100%;
      box-sizing: border-box;
      border: 2px solid #ff9966;
    }
  `}

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const UploadButton = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  border: 1px solid #ff9966;
  border-radius: 2px;
  background: #ff9966;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;

  span {
    font: 12px/1 "Poppins";
    margin-right: 3px;
  }
  
  svg {
    font-size: 12px;
  }
`;
//ImageUpload / ImageView : End



//InputForm : Start
export const DetailBox = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const StoreTitle = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #eee;
  padding: 0px 10px;

  h1 {
    display: flex;
    align-items: center;

    a {
      font: 500 13px/1 "Poppins";
      color: #333;
    }
  }
`;

export const Pic = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33px;
  height: 33px;
  margin-right: 10px;

&::before {
    position: absolute;
    top: 0px; left: 0px;
    display: block;
    content: "";
    width: 33px;
    height: 33px;
    border-radius: 50%;
    background: linear-gradient(45deg, #ff9966, #ff5e62);
  }

  img {
    position: relative;
    z-index: 10;
    width: calc(100% - 4px);
    height: calc(100% - 4px);
    border-radius: 50%;
  }
`;

export const InputBox = styled.div`
  table {
    width: 100%;
    padding: 10px 20px 0px 0px;
    border-spacing: 2px 10px;

    tr {
      //category
      &:nth-of-type(2) td {
        select:first-child {
          margin-right: 10px;
        }

        select, input {
          width: calc(50% - 5px);
        }
      }

      //price
      &:nth-of-type(3) td {

        input[type=number] {
          width: calc(100% - 60px);
          margin-right: 10px;
        }

        select {
          width: 50px;
        }

      }

      //tags
      &:nth-of-type(5) td input[type=text] {
        width: calc(100% - 80px);
      }
    }

    th {
      width: 120px;
      font: 500 11px/1 "Poppins";
      text-transform: uppercase;
      color: #333;
      letter-spacing: 1px;
    }

    td {
      position: relative;
      width: calc(100% - 120px);
      
      input[type=text], input[type=number], textarea, select {
        width: 100%;
        height: 30px;
        border: 0px;
        background: #f3f3f3;
        border-radius: 2px;
        outline: none;
        padding: 0px 10px;
        font: 12px/1.3 "Poppins";
        color: #333;
      }

      select{ 
        vertical-align: middle;
      }

      textarea {
        height: 100px;
        resize: none;
        padding: 10px;
      }
    }

  }
`;

export const EnterButton = styled.button`
  width: 80px;
  height: 30px;
  border: 0px;
  background: #4f65f5;
  vertical-align: top;
  font: 10px/1 "Poppins";
  letter-spacing: 1px;
  color: #fff;
`;

export const TagBox = styled.div`
  width: calc(100% - 120px);
  height: 100px;
  overflow-y: auto;
  margin-left: 120px;
  margin-top: 5px;

  &::-webkit-scrollbar {
    width: 2px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ff9966;
  }
  &::-webkit-scrollbar-track {
    background-color: #bbb;
  }
`;

export const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 5px 6px 5px 8px;
  margin: 0px 8px 8px 0px;
  font: 12px/1 "Poppins";
  color: ${props=> props.tagColor};
  border: 1px solid ${props=> props.tagColor};
  border-radius: 20px;
  box-shadow: 1px 1px 0px ${props=> props.tagColor};

  &::before {
    content: "#";
  }

  svg {
    border-radius: 50%;
    box-sizing: content-box;
    font-size: 8px;
    margin-left: 3px;
    cursor: pointer;

    path {
      stroke: ${props=> props.tagColor};
      stroke-width: 4px;
    }
  }
`;

export const ErrMsg = styled.div`
  position: absolute;
  bottom: -30px; right: 0px;
  z-index: 10;

  ${props=> props.direction==="up" && css`
    bottom: 65px; right: 10px;
  `}
  
  &::before {
    position: absolute;
    top: -3px; right: 50%;
    display: block;
    content: "";
    width: 6px;
    height: 6px;
    transform: translateX(50%) rotate(45deg);
    background: #fff;
    box-shadow: -2px -2px 3px rgb(0 0 0 / 15%);

    ${props=> props.direction==="up" && css`
    top: auto; bottom: -3px; right: 70px;
    box-shadow: 2px 2px 3px rgb(0 0 0 / 15%);

  `}
  }

  span {
    display: block;
    padding: 7px 10px;
    background: #fff;
    box-shadow: 0px 0px 5px 1px rgb(0 0 0 / 15%);
    border-radius: 3px;
    font: 11px/1 "Poppins";
    color: #ff5e62;
  }
`;

export const ButtonBox = styled.div`
  position: absolute;
  bottom: 0px; right: 0px;
  padding: 0px 20px 20px;
  text-align: right;
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Button = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 40px;
  border: 1px solid #ff5e62;
  border-radius: 2px;
  background: ${props=> props.btnType==="submit" ? "#ff5e62" : "#fff"};
  font: 12px/1 "Poppins";
  color: ${props=> props.btnType==="submit" ? "#fff" : "#ff5e62"};
  text-transform: uppercase;
  letter-spacing: 2px;
  vertical-align: middle;
  margin-left: 10px;
  cursor: pointer;

  svg {
    width: 20px;
    height: 20px;
    font-size: 20px;
    animation: ${spin} linear 1.2s infinite;
  }
`;
//InputForm : End


//ImageView : Start
export const TitleBox = styled.div`
  width: 100%;
  height: ${props=> props.ht};
  padding: 15px 25px 25px 15px;
`;

export const Category = styled.span`
  font: 14px/1 "Poppins";
  color: #666;
`;

export const Title = styled.h1`
  height: 90px;
  font: 500 20px/1.5 "Poppins";
  padding: 10px 0px;
  color: #333;
  word-break: break-all;
`;

export const DetailedInfo = styled.ul`
  &::after {
    content: "";
    display: block;
    clear: both;
  }

  li {
    display: inline-flex;
    align-items: center;
    height: 20px;
    float: left;
    color: #555;
  }
`;

export const LikeInfo = styled.li`
  span {
    font: 500 18px/1 "Poppins";
  }

  svg {
    font-size: 20px;
    color: #ff5e62;
    margin-right: 8px;
    vertical-align: middle;
  }
`;

export const RatingInfo = styled.li`
  margin-right: 15px;

  span {
    font-size: 16px;

    //rating score
    &:nth-of-type(1) {
      align-self: flex-start;
      font: 500 18px/1 "Poppins";
      margin-left: 3px;
    }

    //slash
    &:nth-of-type(2) { 
      align-self: flex-end;
      font: 400 16px/1 "Poppins";
      transform: rotate(10deg);
      margin: 0px 1px;
    }

    //total score
    &:nth-of-type(3) {
      align-self: flex-end;
      font: 500 12px/1 "Poppins";
    }

    //total number of reviews
    &:nth-of-type(4) {
      align-self: flex-end;
      font: 500 10px/1 "Poppins";
      margin-left: 5px;
      color: #777;
    }
  }

  svg {
    font-size: 20px;
    color: #ff9966;
    margin-right: 5px;
    vertical-align: middle;
  }
`;

export const PriceInfo = styled.li`
  float: right !important;

  span {
    font: 500 26px/1 "Poppins";
    color: #f9864d;
  }
`;
//ImageView : End


//ProductInfo : Start
export const InfoBox = styled.div`
  width: 55%;
  height: 100%;
`;

export const TextBox = styled.div`
  width: 100%;
  height: 160px;
  padding: 15px 20px;
  overflow-y: auto;
  border-bottom: 1px solid #ddd;

  &::-webkit-scrollbar {
    width: 0px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ff9966;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: #bbb;
  }

  p {
    font: 14px/1.4 "Poppins", "Noto Sans Kr";
    color: #333;

    span {
      font-weight: 600;
      margin-right: 5px;
    }
  }
`;

export const Tags = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding-top: 7px;

  li {
    font: 13px/1 "Poppins";

    span {
      display: inline-block;
      color: #f9864d;
      margin-right: 7px;
      margin-bottom: 7px;

      &::before {
        content: "#";
      }
    }
  }
`;

export const ReviewBox = styled.div`
  position: relative;
  width: 100%;
  height: 260px;
  border-bottom: 1px solid #eee;

  //Review 표시
  >span {
    position: absolute;
    top: -1px; right: 7px;
    height: 22px;
    padding: 4px 6px;
    border: 1px solid #ddd;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.2);
    border-top: 0px;
    border-radius: 0px 0px 5px 5px;
    font: 500 12px/1 "Poppins";
    color: #555;
    background: #fff;

    &::before {
      position: absolute;
      top: -2px; right: 0px;
      content: "";
      display: block;
      width: 100%;
      height: 2px;
      background: #fff;
    }
  }
`;

export const ReviewList = styled.div`
  width: 100%;
  height: ${props=> props.isSeller ? "100%" : "215px"};
  overflow-y: auto;
  padding: 15px 20px 15px 15px;
  box-shadow: inset 0px 0px 5px rgba(0, 0, 0, 0.1);

  &::-webkit-scrollbar {
    width: 3px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ff9966;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: #bbb;
  }

  >ul {
    >li {
      display: flex;
      padding-bottom: 5px;

      //profile pic
      img {
        width: 25px;
        height: 25px;
        object-fit: cover;
        border-radius: 50%;
        margin-top: 3px;
      }
    }
  }
`;

export const Review = styled.div`
  width: calc(100% - 25px);
  padding: 5px 5px;

  //content
  >div {
    font: 400 13px/1.5 "Poppins";
    word-break: break-all;
    color: #444;

    //username
    span {
      font: 600 13px/1 "Poppins";
      color: #444;
      margin-right: 5px;
    }
  }

  //rating & date
  >ul{
    width: 100%;
    text-align: right;
    font-size: 0px;
    margin-bottom: 5px;

    &::after {
      content: "";
      display: block;
      clear: both;
    }


    li {
      float: left;

      //rating number
      span {
        font: 500 11px/1 "Noto Sans KR";
        color: #555;
        margin-left: 5px;
      }

      //stars
      svg {
        font-size: 12px;
        color: #ff9966;
        margin-right: 2px;
      }

      //date
      &:last-child {
        float: right;

        span {
          font: 11px/1 "Noto Sans KR";
          color: #999;
          letter-spacing: 1px;
        }
      }
    }
  }
`;

export const Pages = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30px;
  font: 500 12px/1 "Poppins";

  li {
    //arrow button
    button {
      width: 15px;
      height: 15px;
      background: #ff9966;
      border: 1px solid #ff9966;
      color: #fff;
      font-size: 10px;
      margin: 0px 5px;
      cursor: pointer;
    }
  }
`;

export const PageNumber = styled.li`
  span {
    padding: 3px 5px;
    color: #555;
    background: transparent;
    border: 0px;
    cursor: pointer;
  }

  ${props=> props.isActive && css`
    span {
      font-weight: 600;
      color: #ff9966;
    }
  `}
`;

//isSeller === true
export const EditButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 60px;
  padding: 10px 15px;

  button {
    width: 90px;
    margin-left: 10px;
    border: 0px;
    border-radius: 2px;
    color: #fff;
    font: 12px/1 "Poppins";
    letter-spacing: 2px;
    text-transform: uppercase;
    cursor: pointer;

    //delete button
    &:first-child {
      background: #ff5e62;
    }

    //edit button
    &:last-child {
      background: #ff9966;
    }
  }

`;

//isSeller === false
export const ReviewForm = styled.form`
  display: flex;
  width: 100%;
  height: 45px;
  padding: 8px 10px;
  border-top: 1px solid #eee;
`;

export const Rating = styled.div`
  display: flex;
  align-items: center;
  margin-right: 5px;

  button {
    margin-right: 3px;
    background: transparent;
    border: 0px;
    cursor: pointer;

    svg {
      font-size: 14px;
      color: #ff9966;
    }
  }
`;

export const ReviewInput = styled.div`
  display: flex;
  align-items: center;
  width: calc(100% - 90px);
  height: 28px;
  border-radius: 20px;
  border: 1px solid #eee;
  padding: 0px 5px;

  input[type=text] {
    width: 100%;
    height: 100%;
    border: 0px;
    border-radius: 20px;
    padding: 0px 7px 3px;
    resize: none;
    outline: none;
    font: 12px/1.4 "Noto Sans KR";
    color: #333;
    overflow: hidden;

    &::placeholder {
      color: #bbb;
    }
  }

  button {
    width: 20px;
    height: 20px;
    border: 0px;
    background: transparent;
    cursor: pointer;

    svg {
      font-size: 20px;
      color: #ff9966;
    }
  }
`;

export const CheckoutForm= styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  height: 60px;
  padding: 10px 20px;
`;

export const QuantityBox = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  
  button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
    background: transparent;
    border: 0px;
    border-radius: 50%;
    font: 400 23px/1 "Poppins";
    color: #666;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.5);
    cursor: pointer;
  }

  label {
    display: inline-block;
    width: 30px;
    text-align: center;
    font: 600 20px/1 "Poppins";
    color: #444;
    margin: 0px 10px;
  }
`;

export const Price = styled.div`
  width: 190px;
  height: 100%;
  text-align: right;
  font: 400 30px/40px "Poppins";
  color: #444;
  padding-right: 10px;
`;

export const Buttons = styled.div`
  width: 90px;
  height: 100%;
  padding: 2px;

  button {
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;
    background: transparent;
    border-radius: 50%;
    margin-left: 7px;
    cursor: pointer;

    //heart button
    &:first-child {
      border: 1px solid #ff5e62;
      vertical-align: bottom;

      svg {
        color: #ff5e62;
        font-size: 18px;
        margin-top: 2px;
      }

      &::after {
        border: 1px solid #ff5e62;
      }
    }

    //cart button
    &:last-child {
      border: 1px solid #f9864d;
      vertical-align: bottom;

      svg {
        color: #f9864d;
        font-size: 18px;
      }
      
      &::after {
        border: 1px solid #f9864d;
      }
    }
  }
`;
//ProductInfo : End