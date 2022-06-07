import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { loginUser } from '../_actions/user_action';
import useInputs from '../hooks/useInputs';
import { Input, Label, Button, ErrMsg, InputContainer, P } from "../styles/AccountStyle";
import Account from '../components/common/Account';

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

  const handleSubmit = (e)=> {
    e.preventDefault();
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
          {/* {err.username && <ErrMsg>{err.username}</ErrMsg>} */}
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
          {/* {err.password && <ErrMsg>{err.password}</ErrMsg>} */}
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
          {/* {err.password && <ErrMsg>{err.password}</ErrMsg>} */}
        </InputContainer>
        <InputContainer>
          <Label htmlFor="">
            EMAIL ADDRESS
          </Label>
          <Input
            type="text"
            name="email"
            id="email"
            placeholder="Email Address"
            value={values.email}
            onChange={handleChange}
          />
          {/* {err.username && <ErrMsg>{err.username}</ErrMsg>} */}
        </InputContainer>
        <Button type="submit">
            sign up
        </Button>
        <P><Link to="/login">Have an account?</Link></P>
      </form>
    )
  };

  return (
    <Account renderForm={renderForm} />
  )
}

export default Register;