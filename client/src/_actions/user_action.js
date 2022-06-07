import axios from "axios";
import { 
  LOGIN_USER
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