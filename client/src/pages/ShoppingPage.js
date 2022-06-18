import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Background, Container } from "../styles/common/LayoutStyle";

import Profile from '../components/shopping/Profile';
import TabMenu from '../components/shopping/TabMenu';
import StoreSection from '../components/shopping/StoreSection';
import LikeSection from '../components/shopping/LikeSection';
import ReviewSection from '../components/shopping/ReviewSection';
import OrderSection from '../components/shopping/OrderSection';

function ShoppingPage({ type }) {
  const userInfo = useSelector(state=> state.user);
  const username = useParams().username;

  useEffect(()=> {
    if(userInfo.userData) {

    }
  }, [userInfo]);

  return (
    <Background>
      <Container section="profile">
        <Profile username={username} />
      </Container>
      <TabMenu username={username} />
      <Container>
        {(type==="store") && 
          <StoreSection 
            type={type}
          />
        }
        {(type==="likes") && userInfo &&
          <LikeSection 
            type={type}
          />
        }
        {(type==="reviews") && userInfo &&
          <ReviewSection 
            type={type}
          />
        }
        {(type==="order") && userInfo &&
          <OrderSection 
            type={type}
          />
        }
      </Container>
    </Background>
  )
}

export default ShoppingPage;