import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { auth } from "../_actions/user_action";
import useAlert from '../hooks/useAlert';

export default function (Component, option, checkAlert = null, adminRoute = null) {
  /*
    option
    - null : 아무나 출입 가능
    - true : 로그인한 유저만 출입 가능
    - false : 로그인한 유저는 출입 불가능
  */
  function CheckAuthentication(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //checkAlert === true
    const paths = useLocation().pathname.split("/");
    const path = paths[paths.length - 1];
    const username = useParams().username;
    const user = useSelector(state=> state.user);
    const { renderAlert } = useAlert();
    const [ isAlert, setIsAlert ] = useState(null);

    //회원 인증 체크 및 자격에 따른 접근 제한
    useEffect(()=> {
      dispatch(auth()).then(response=> {
        if(!response.payload.isAuth) {
          //로그인 X (로그인한 유저 전용 페이지 접속시)
          if(option) navigate('/membership/login');
        } else {
          //관리자 X (관리자 전용 페이지 접속시)
          if(adminRoute && !response.payload.isAdmin) {
            navigate('/');
          } else {
            //로그인O (로그인한 유저가 출입 불가능한 페이지 접속시)
            if(option === false) {
              navigate('/');
            }
          }
        }
      }); 
    },[]);

    //checkAlert === true
    //조건에 따라 알림 문구 출력
    useEffect(()=> {
      if(checkAlert) {
        const userInfo = user.userInfo.userInfo;
        if(userInfo) { 
          //스토어 오픈 X
          if(!userInfo.storeOwner) {
            const isAuth = user.userData;
            //로그인 X || 페이지 소유자 X
            if(!isAuth || isAuth.username !== username) {
              setIsAlert(true);
            } else {
              setIsAlert(false);
            }
          } else {
            setIsAlert(false);
          }
        } 
      }
    }, [user]);

    return (
      checkAlert
      ? (isAlert === false
        ? Component
        : renderAlert("unavailable", path)
        )
      : Component
    );
  };

  return <CheckAuthentication />;
}