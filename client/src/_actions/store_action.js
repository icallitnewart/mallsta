import axios from "axios";
import { 
  REGISTER_STORE,
  EDIT_STORE
} from "./types";

//스토어 등록
export function registerStore(data) {
  const request = 
    axios
    .post('/api/stores/register', data)
    .then(res => res.data);

  return {
    type : REGISTER_STORE,
    payload : request
  }
}

//스토어 정보 수정
export function editStore(data) {
  const request = 
    axios
    .post('/api/stores/edit', data)
    .then(res => res.data);

  return {
    type : EDIT_STORE,
    payload : request
  }
}