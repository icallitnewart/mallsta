import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../_actions/user_action";

export default function (Component, option, adminRoute = null) {
  /*
    option
    - null : 아무나 출입 가능
    - true : 로그인한 유저만 출입 가능
    - false : 로그인한 유저는 출입 불가능
  */
  function CheckAuthentication(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=> {
      dispatch(auth()).then(response=> {
        if(!response.payload.isAuth) {
          //로그인 X (로그인한 유저 전용 페이지 접속시)
          if(option) navigate('/login');
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

    return (Component);
  };

  return <CheckAuthentication />;
}