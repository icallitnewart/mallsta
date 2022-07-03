import React from 'react';

import { IoSettingsSharp } from "react-icons/io5";
import { Container, Pic, Detail, Username, Image, SettingsButton, Intro, Rank } from "../../styles/shopping/ProfileStyle";

function Profile({ username, userInfo, isPageOwner }) {
  return (
    <Container>
      <Pic>
        <Image 
          Src={null} 
        />
      </Pic>
      <Detail>
        <Username>
          <span>{username}</span>
          <SettingsButton to="/account/profile">
            <IoSettingsSharp />
          </SettingsButton>
        </Username>
        {userInfo && 
          (isPageOwner
          ? <Rank>
              <li>Shopper</li> 
              <li>Rank
                <span>{userInfo.rank}</span>
              </li>
              <li>Reviews
                <span>{userInfo.reviews.length}</span>
              </li>
              <li>Wishlist
                <span>{userInfo.wishlist.length}</span>
              </li>
            </Rank>
          : <Rank>
              <li>Shopper</li> 
              <li>Rank
                <span>{userInfo.rank}</span>
              </li>
            </Rank>
          )
        }
        {(userInfo && userInfo.storeOwner) &&
          <Rank>
            <li>Seller</li> 
            <li>Rank
              <span>{userInfo.store.rank}</span>
            </li>
            <li>Sold
              <span>{userInfo.store.order.length}</span>
            </li>
            <li>Products
              <span>{userInfo.store.productTotal}</span>
            </li>
          </Rank>
        }
        <Intro isStoreOwner={userInfo && userInfo.storeOwner}>
          {(userInfo && userInfo.store)
          ? userInfo.store.desc
          : "❌ This user is not a seller ❌"
          }
        </Intro>
      </Detail>
    </Container>
  )
}

export default Profile;