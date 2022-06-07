import styled, { css } from "styled-components";

export const Logo = styled.a`
    background: linear-gradient(45deg, #ff5e62, #ff9966);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: bold;
    font-size: ${props => props.fontSize};
    letter-spacing: 2px;

    &::after {
        content: "*";
        font-size: 40px;
    }
`;