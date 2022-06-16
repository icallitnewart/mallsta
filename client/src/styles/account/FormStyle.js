import styled, { css } from "styled-components";

export const Table = styled.table`
  border-collapse: separate;
  width: 100%;
`;

export const Tr = styled.tr`
  width: 100%;
  height: 65px;

  th {
    width: 40%;
    font: 500 14px/1 "Poppins";
    letter-spacing: 1px;
    color: #333;
    padding-left: 15px;
  }

  td {
    width: 60%;

    input[type=text], input[type=password], input[type=email], input[type=number], textarea {
      width: 100%;
      height: 35px;
      border: 1px solid #ddd;
      border-radius: 3px;
      outline: none;
      padding: 0px 15px;
      font: 13px/1 "Poppins";

      &::placeholder {
        color: #bbb;
      }
    }

    label {
      display: inline-flex;
      align-items: center;
      font: 14px/1 "Poppins";
      margin: 10px 15px 5px 0px;

      input[type=checkbox] {
        margin-right: 5px;
      }
    }

    textarea {
      height: 100px;
      resize: none;
      padding: 15px;
    }

    p {
      font: 16px/1 "Poppins";
      color: #333;
    }

    span {
      font: 15px/1 "Poppins";
      color: #333;
    }
  }
`;

export const Button = styled.button`
  width: 100px;
  height: 40px;
  border: 1px solid #ff5e62;
  color: ${props=> props.color};
  background: ${props=> props.bgColor};
  border-radius: 2px;
  font: 13px/1 "Poppins";
  font-weight: ${props=> props.color==="#fff" ? 400 : 500};
  letter-spacing: 1px;
  margin-left: 15px;
  margin-top: 30px;
  cursor: pointer;

  &[type=submit]:hover {
    background: linear-gradient(to left, #ff9966, #ff5e62);
    border: 0px;
    color: #fff;
  }
`;

export const ErrMsg = styled.span`
  display: inline-block;
  font: 500 12px/1 "Poppins";
  color: #ff9966;
  margin: 5px 0px 5px 3px;
`;
