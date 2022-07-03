import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserInfo } from '../_actions/user_action';

import { Background, Container } from "../styles/common/LayoutStyle";

import Profile from '../components/shopping/Profile';
import TabMenu from '../components/shopping/TabMenu';
import StoreSection from '../components/shopping/StoreSection';
import LikeSection from '../components/shopping/LikeSection';
import ReviewSection from '../components/shopping/ReviewSection';
import OrderSection from '../components/shopping/OrderSection';

function ShoppingPage({ type }) {
  const dispatch = useDispatch();
  const authUser = useSelector(state=> state.user);
  const username = useParams().username;
  const [ userInfo, setUserInfo ] = useState(null);

  //회원정보 요청
  useEffect(()=> {
    const body = { username };

    dispatch(getUserInfo(body))
    .then(response=> {
      const data = response.payload;
      if(data.success) {
        setUserInfo(data.userInfo);
      } else {
        console.error(data.err);
      }
    });
  }, []);

  return (
    <Background>
      <Container section="profile">
        <Profile 
          authUser={authUser}
          username={username} 
          userInfo={userInfo}
        />
      </Container>
      <TabMenu username={username} />
      <Container>
        {(type==="store") && 
          <StoreSection 
            type={type}
            authUser={authUser}
          />
        }
        {(type==="likes") && authUser &&
          <LikeSection 
            type={type}
          />
        }
        {(type==="reviews") && authUser &&
          <ReviewSection 
            type={type}
          />
        }
        {(type==="order") && authUser &&
          <OrderSection 
            type={type}
          />
        }
      </Container>
    </Background>
  )
}

export default ShoppingPage;