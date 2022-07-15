import React from 'react';
import { Outlet } from 'react-router-dom';
import { Background, Container, H1 } from "../../styles/common/MembershipStyle";
import { Logo } from "../../styles/common/LogoStyle";

function MembershipLayout() {
  return (
    <Background>
      <Container>
        <H1>
          <Logo 
            to="/"
            fontSize={35}
          >Mallsta</Logo>
        </H1>
        <Outlet />
      </Container>
    </Background>
  )
}

export default MembershipLayout;