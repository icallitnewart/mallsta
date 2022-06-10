import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";

import { Background, Container } from "../styles/LayoutStyle";
import AsideMenu from '../components/account/AsideMenu';
import Profile from '../components/account/Profile';
import Store from '../components/account/Store';

function Account() {
  const path = useParams().path;
  const user = useSelector(state => state.user);

  return (
    <Background>
      <Container>
        <AsideMenu />
        {path==="profile" &&
          <Profile user={user.userData} />
        }
        {path==="store" &&
          <Store user={user.userData} />
        }
      </Container>
    </Background>
  )
}

export default Account;