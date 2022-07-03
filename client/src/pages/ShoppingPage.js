import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import { getUserInfo } from '../_actions/user_action';

import { Background, Container } from "../styles/common/LayoutStyle";

import Profile from '../components/shopping/Profile';
import TabMenu from '../components/shopping/TabMenu';

function ShoppingPage() {
  const dispatch = useDispatch();
  const authUser = useSelector(state=> state.user);
  const username = useParams().username;
  const [ userInfo, setUserInfo ] = useState(null);
  const [ isAuth, setIsAuth ] = useState(null);
  const [ isPageOwner, setIsPageOwner ] = useState(false);
  const props = { authUser, username, userInfo, isAuth, isPageOwner };
  
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
  
  //로그인 여부 판단
  useEffect(()=> {
    if(!authUser.userData) {
      setIsAuth(false);
    } else {
      if(Object.keys(authUser).length > 0) {
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
    <Background>
      <Container section="profile">
        <Profile {...props} />
      </Container>
      <TabMenu {...props} />
      <Container>
        <Outlet 
          context={[
            authUser, userInfo, username, isPageOwner, isAuth
          ]} 
        />
      </Container>
    </Background>
  )
}

export default ShoppingPage;