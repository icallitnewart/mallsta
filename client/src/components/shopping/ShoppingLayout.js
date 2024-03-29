import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import { getUserInfo } from '../../_actions/user_action';

import { Background, Container } from "../../styles/common/LayoutStyle";

import Profile from '../../components/shopping/Profile';
import TabMenu from '../../components/shopping/TabMenu';

function ShoppingLayout() {
  const dispatch = useDispatch();
  const auth = useSelector(state=> state.user.userData);
  const username = useParams().username;

  const [ userInfo, setUserInfo ] = useState(null);
  const [ isAuth, setIsAuth ] = useState(null);
  const [ isPageOwner, setIsPageOwner ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(true);
  const props = { auth, username, userInfo, isAuth, isPageOwner, isLoading };
  
  //회원정보 요청
  useEffect(()=> {
    const body = { username };

    dispatch(getUserInfo(body))
    .then(response=> {
      const data = response.payload;
      if(data.success) {
        setUserInfo(data.userInfo);
        setIsLoading(false);
      } else {
        console.error(data.err);
      }
    });
  }, [username]);
  
  //로그인 여부 판단
  useEffect(()=> {
    if(!auth) {
      setIsAuth(false);
    } else {
      if(Object.keys(auth).length > 0) {
        setIsAuth(auth.isAuth);
      }
    }
  }, [auth]);

  //페이지 소유자와 로그인 유저가 동일한지 판단
  useEffect(()=> {
    if(isAuth) {
      if(auth.username === username) {
        setIsPageOwner(true);
      } else {
        setIsPageOwner(false);
      }
    }
  }, [isAuth, username]);

  return (
    <Background>
      <Container section="profile">
        <Profile {...props} />
      </Container>
      <TabMenu {...props} />
      <Container>
      {userInfo && <Outlet context={{ ...props }} />}
      </Container>
    </Background>
  )
}

export default ShoppingLayout;