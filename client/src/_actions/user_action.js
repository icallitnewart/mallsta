import axios from "axios";
import { 
  LOGIN_USER,
  REGISTER_USER,
  CHECK_USERNAME_USER,
  CHECK_EMAIL_USER,
  AUTH_USER
} from "./types";

//로그인
export function loginUser(data) {
  const request = 
    axios
    .post('/api/users/login', data)
    .then(res => res.data);

  return {
    type : LOGIN_USER,
    payload : request
  }
}

//회원가입
export function registerUser(data) {
  const request = 
    axios
    .post('/api/users/register', data)
    .then(res => res.data);

  return {
    type : REGISTER_USER,
    payload : request
  }
}

//아이디 중복 체크
export function checkUsernameUser(data) {
  const request = 
    axios
    .post('/api/users/check_username', data)
    .then(res => res.data);

  return {
    type : CHECK_USERNAME_USER,
    payload : request
  }
}

//이메일 중복 체크
export function checkEmailUser(data) {
  const request = 
    axios
    .post('/api/users/check_email', data)
    .then(res => res.data);

  return {
    type : CHECK_EMAIL_USER,
    payload : request
  }
}

//로그인 인증
export function auth() {
  const request =
    axios
    .get('/api/users/auth')
    .then(res=> res.data);

    return {
      type : AUTH_USER,
      payload : request
    }
};