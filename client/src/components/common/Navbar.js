import React from 'react';
import { Header, Inner, Nav, Ul, Li } from "../../styles/NavbarStyle";
import { Logo } from "../../styles/LogoStyle";

function Navbar() {
  return (
    <Header>
      <Inner>
        <Logo 
          href="/"
          fontSize={22}
          type={"navbar"}
        >Mallsta</Logo>

        <Nav>
          <Ul>
            <Li></Li>
            <Li></Li>
            <Li></Li>
          </Ul>
        </Nav>
      </Inner>
    </Header>
  )
}

export default Navbar;