import axios from "axios";
import { 
  REGISTER_STORE,
  EDIT_STORE,
  GETINFO_STORE
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

//스토어 정보 요청
export function getStoreInfo(data) {
  const request = 
    axios
    .post('/api/stores/getInfo', data)
    .then(res => res.data);

  return {
    type : GETINFO_STORE,
    payload : request
  }
}