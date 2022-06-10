import React from 'react';
import { Background, Container, H1 } from "../../styles/common/MembershipStyle";
import { Logo } from "../../styles/common/LogoStyle";

function Membership({ renderForm }) {
  return (
    <Background>
      <Container>
        <H1>
          <Logo 
            to="/"
            fontSize={35}
          >Mallsta</Logo>
        </H1>
        {renderForm()}
      </Container>
    </Background>
  )
}

export default Membership;