import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { IoSettingsSharp } from "react-icons/io5";
import { Container, Pic, Detail, Username, Image, SettingsButton, Intro, Rank } from "../../styles/shopping/ProfileStyle";

function Profile({ authUser, username, userInfo }) {
  const [ isAuth, setIsAuth ] = useState(null);
  const [ isPageOwner, setIsPageOwner ] = useState(false);
  
  //로그인 여부 판단
  useEffect(()=> {
    if(!authUser.userData) {
      setIsAuth(false);
    } else {
      if (Object.keys(authUser).length > 0) {
        setIsAuth(authUser.userData.isAuth);
      }
    }
  }, [authUser]);

  //페이지 소유주와 로그인 유저가 동일한지 판단
  useEffect(()=> {
    if(isAuth) {
      if(authUser.userData.username === username) {
        setIsPageOwner(true);
      }
    }
  }, [isAuth]);
  
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
        {(userInfo && isPageOwner) &&
          <Rank>
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
        <Intro>
          {(userInfo && userInfo.store)
          ? userInfo.store.desc
          : "This user is not a seller."
          }
        </Intro>
      </Detail>
    </Container>
  )
}

export default Profile;