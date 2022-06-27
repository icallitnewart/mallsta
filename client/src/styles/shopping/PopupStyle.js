import styled, { css } from "styled-components";

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

  form {
    display: flex;
    width: 100%;
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


//ImageUpload : Start
export const ImageBox = styled.div`
  width: 45%;
  height: 100%;
  font-size: 0px;
  background: #fbfbfb;
`;

export const ImageBig = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  background: #ddd;

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
//ImageUpload : End



//InputForm : Start
export const DetailBox = styled.div`
  position: relative;
  width: 55%;
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
      &:nth-of-type(2) td select {
        width: calc(50% - 5px);

        &:first-child {
          margin-right: 10px;
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

export const ButtonBox = styled.div`
  position: absolute;
  bottom: 0px; right: 0px;
  padding: 0px 20px 20px;
  text-align: right;
`;

export const Button = styled.button`
  width: 100px;
  height: 40px;
  border: 1px solid #ff5e62;
  border-radius: 2px;
  background: ${props=> props.btnType==="submit" ? "#ff5e62" : "#fff"};
  font: 12px/1 "Poppins";
  color: ${props=> props.btnType==="submit" ? "#fff" : "#ff5e62"};
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-left: 10px;
  cursor: pointer;
`;
//InputForm : End