import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { registerUser, checkEmailUser, checkUsernameUser } from '../_actions/user_action';
import useInputs from '../hooks/useInputs';
import { Input, Label, Button, ErrMsg, InputContainer, P } from "../styles/common/MembershipStyle";
import Membership from '../components/common/Membership';

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValue= {
    username : "",
    password : "",
    password2 : "",
    email : ""
  };
  const [ values, handleChange ] = useInputs(initialValue);
  const [ err, setErr ] = useState({});

  //폼 유효성 검사
  const checkForm = (body)=> {
    let messages = {};
    const { username, password, password2, email  } = body;

    //빈칸 체크
    const blankErr = (input)=> messages[input] = "Please fill in the blank.";

    //아이디 검사
    if(!username) { blankErr("username"); }
    else {
      const minLen = 4;
      if(username.length < minLen) {
        messages.username = `Requires ${minLen} letters at minimum.`;
      }
    }

    //비밀번호 검사
    if(!password) { blankErr("password"); }
    else {
      const minLen = 8;
      if(password.length < minLen) {
        messages.password = `Requires ${minLen} letters at minimum.`;
      } else {
        if(password !== password2) {
          messages.password2 = `Please enter the same password as above.`
        }
      }
    }

    //비밀번호 확인 검사
    if(!password2) { blankErr("password2"); }

    //이메일 검사
    if(!email) { blankErr("email"); }
    else {
      if(!/@/.test(email) || !/[.]/.test(email)) {
        messages.email = `Please enter a proper email address.`;
      }
    }

    return messages;
  };

  //아이디, 이메일 중복 체크
  const checkDuplicates = (body)=> {
    //에러 메시지 생성
    const createErrMsg = (response, type)=> {
      if(response.payload.isExist) {
        const message = `${response.payload.message} Please try another one.`;
        setErr(prev=> ({...prev, [type] : message }));
      } else {
        setErr(prev=> ({...prev, [type] : "" }));
      }
    };

    dispatch(checkUsernameUser(body))
    .then(response=> createErrMsg(response, "username"));

    dispatch(checkEmailUser(body))
    .then(response=> createErrMsg(response, "email"));
  };

  const handleSubmit = (e)=> {
    e.preventDefault();

    const body = { ...values };
    const errors = Object.keys(checkForm(body)).length > 0 && checkForm(body);

    //폼 유효성 검사
    if(errors) return setErr(errors);

    //중복 체크 (아이디, 이메일)
    checkDuplicates(body);
  
    //회원가입 기능
    dispatch(registerUser(body))
    .then(response=> {
      if(response.payload.success) {
        alert("You have signed up successfully!");
        navigate("/");
      } else {
        alert("An error occured.");
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
        <InputContainer>
          <Label htmlFor="password2">
            CONFIRM PASSWORD
          </Label>
          <Input
            type="password"
            name="password2"
            id="password2"
            placeholder="Confirm password"
            value={values.password2}
            onChange={handleChange}
          />
          {err.password2 && <ErrMsg>{err.password2}</ErrMsg>}
        </InputContainer>
        <InputContainer>
          <Label htmlFor="">
            EMAIL ADDRESS
          </Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Email Address"
            value={values.email}
            onChange={handleChange}
          />
          {err.email && <ErrMsg>{err.email}</ErrMsg>}
        </InputContainer>
        <Button type="submit">
            sign up
        </Button>
        <P><Link to="/login">Have an account?</Link></P>
      </form>
    )
  };

  return (
    <Membership renderForm={renderForm} />
  )
}

export default Register;