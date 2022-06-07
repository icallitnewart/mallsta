import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { loginUser } from '../_actions/user_action';
import useInputs from '../hooks/useInputs';
import { Input, Label, Button, ErrMsg, InputContainer, P } from "../styles/AccountStyle";
import Account from '../components/common/Account';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValue= {
    username : "",
    password : ""
  };
  const [ values, handleChange ] = useInputs(initialValue);
  const [ err, setErr ] = useState({});

  //빈칸 유효성 검사
  const checkBlank = ()=> {
    if(!values.username || !values.password) {
      const message = "Please fill in the blank.";
      let messages = {};

      if(!values.username) {
        messages.username = message;
      };
      if(!values.password) {
        messages.password = message;
      }

      setErr(messages);
      return false;
    }

    return true;
  };

  const handleSubmit = (e)=> {
    e.preventDefault();

    //빈칸 입력시 에러 문구 표시
    if(checkBlank()===false) return;

    //로그인 서버 연결
    const body = { ...values };

    dispatch(loginUser(body))
    .then(response=> {
      const isSuccess = response.payload.success;
      const errMsg = response.payload.message;
      const message = `${errMsg} Please try again.`;

      //서버 에러 확인시 에러 문구 표시
      if(!isSuccess) {
        let messages = {};

        if(errMsg==="Username Not Found.") messages.username = message;
        if(errMsg==="Incorrect Password.") messages.password = message;

        setErr(messages);

      } else {
        navigate('/');
      }
    });
  };

  const renderForm = ()=> {
    return (
      <form onSubmit={handleSubmit}>
        <InputContainer>
          <Label htmlFor="username">
            USERNAME
          </Label>
          <Input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            value={values.username}
            onChange={handleChange}
          />
          {err.username && <ErrMsg>{err.username}</ErrMsg>}
        </InputContainer>
        <InputContainer>
          <Label htmlFor="password">
            PASSWORD
          </Label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
          />
          {err.password && <ErrMsg>{err.password}</ErrMsg>}
        </InputContainer>
        <Button type="submit">
            login
        </Button>
        <P><Link to="/register">Don't have an account?</Link></P>
      </form>
    )
  };

  return (
    <Account renderForm={renderForm} />
  )
}

export default Login;