import React from 'react';

import { IoSettingsSharp } from "react-icons/io5";
import { Container, Pic, Detail, Username, Image, SettingsButton, Intro, Rank } from "../../styles/shopping/ProfileStyle";

function Profile({ authUser, username }) {
  
  return (
    <Container>
      <Pic>
        <Image Src={null} />
      </Pic>
      <Detail>
        <Username>
          <span>icallitnewart</span>
          <SettingsButton to="/account/profile">
            <IoSettingsSharp />
          </SettingsButton>
        </Username>
        <Rank>
          <li>Shopper</li> 
          <li>LV<span>1</span></li>
          <li>Buy<span>1</span></li>
          <li>Wishlist<span>1</span></li>
        </Rank>
        <Rank>
          <li>Seller</li> 
          <li>LV<span>1</span></li>
          <li>Sold<span>1</span></li>
          <li>Products<span>1</span></li>
        </Rank>
        <Intro>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia reiciendis sapiente at ab corporis, minus iure aliquid a aliquam temporibus!
        </Intro>
      </Detail>
    </Container>
  )
}

export default Profile;