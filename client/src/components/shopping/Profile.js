import React from 'react';

import { IoSettingsSharp } from "react-icons/io5";
import { Container, Pic, Detail, Image, SettingsButton } from "../../styles/shopping/ProfileStyle";

function Profile({ username }) {
  return (
    <Container>
      <Pic>
        <Image />
      </Pic>
      <Detail>
        <h1>
          <span>icallitnewart</span>
          <SettingsButton to="/account/profile">
            <IoSettingsSharp />
          </SettingsButton>
        </h1>
        <span>Shopper LV 1</span>
        <span>Seller LV 2</span>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia reiciendis sapiente at ab corporis, minus iure aliquid a aliquam temporibus!</p>
      </Detail>
    </Container>
  )
}

export default Profile;