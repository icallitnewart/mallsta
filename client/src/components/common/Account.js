import React from 'react';
import { Background, Container, H1 } from "../../styles/AccountStyle";
import { Logo } from "../../styles/LogoStyle";

function Account({ renderForm }) {
  return (
    <Background>
      <Container>
        <H1>
          <Logo 
            href="/"
            fontSize={"35px"}
          >Mallsta</Logo>
        </H1>
        {renderForm()}
      </Container>
    </Background>
  )
}

export default Account;