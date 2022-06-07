import styled, { css } from "styled-components";

export const Background = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    background: linear-gradient(45deg, #ff5e62, #ff9966);
`;

export const Container = styled.section`
    width: 400px;
    min-height: 100px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
    padding: 45px 50px 65px;
`;

export const H1 = styled.h1`
    text-align: center;
    margin-bottom: 20px;
`;

export const InputContainer = styled.div`
    margin-bottom: 10px;
`;

export const Input = styled.input`
    width: 100%;
    height: 40px;
    border: 0px;
    background-color: #eee;
    border-radius: 5px;
    padding: 0px 10px;
    font: normal 12px/1 "arial";
    letter-spacing: 1px;
    outline: none;
    
    &::placeholder { 
        color: #999;
    }
`;

export const Label = styled.label`
    display: inline-block;
    font-size: 11px;
    letter-spacing: 1px;
    color: #888;
    font-weight: 600;
    margin-left: 5px;
    margin-bottom: 3px;
`;

export const ErrMsg = styled.span`
    font: bold 11px/1 "arial";
    color: #ff9966;
`;

export const Button = styled.button`
    width: 100%;
    height: 35px;
    margin-top: 10px;
    background-color: #ff5e62;
    border: 0px;
    border-radius: 5px;
    color: #fff;
    font: 500 14px "arial";
    letter-spacing: 2px;
    cursor: pointer;
    transition: .5s;

    &:hover {
        background-color: #ff9966;
    }
`;