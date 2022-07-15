import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from "react-router-dom";

import { Background, Container } from "../../styles/common/LayoutStyle";
import AsideMenu from './AsideMenu';

function AccountLayout() {
  const user = useSelector(state => state.user.userData);

  return (
    <Background>
      <Container>
        <AsideMenu />
        <Outlet context={{ user }} />
      </Container>
    </Background>
  )
}

export default AccountLayout;