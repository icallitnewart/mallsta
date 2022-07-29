import axios from "axios";
import { 
  LOGIN_USER,
  REGISTER_USER,
  GETINFO_USER,
  CHECK_USERNAME_USER,
  CHECK_EMAIL_USER,
  AUTH_USER,
  EDIT_USER,
  UPLOAD_USER,
  DELETE_UPLOAD_USER,
  WISHLIST_USER,
  ADD_TO_CART_USER,
  GET_CART_USER,
  DELETE_CART_USER
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

//회원정보 요청
export function getUserInfo(data) {
  const request = 
    axios
    .post('/api/users/getInfo', data)
    .then(res => res.data);

  return {
    type : GETINFO_USER,
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

//회원정보 수정
export function editUser(data) {
  const request = 
    axios
    .post('/api/users/edit', data)
    .then(res => res.data);

  return {
    type : EDIT_USER,
    payload : request
  }
}

//프로필 이미지 업로드
export function uploadUser(formData) {
  const request = 
    axios({
      method : "post",
      url: "/api/users/upload_image",
      data: formData,
      headers : {
        "content-type" : "multipart/form-data"
      }
    })
    .then(res => res.data);

  return {
    type : UPLOAD_USER,
    payload : request
  }
}

//프로필 이미지 삭제
export function deleteUploadUser() {
  const request = 
    axios
    .get('/api/users/delete_image')
    .then(res => res.data);

  return {
    type : DELETE_UPLOAD_USER,
    payload : request
  }
}

//위시리스트 목록 요청
export function wishlistUser(storeId) {
  let url = "/api/users/wishlist";
  if(storeId) url += `?storeId=${storeId}`;

  const request = 
    axios
    .get(url)
    .then(res => res.data);

  return {
    type : WISHLIST_USER,
    payload : request
  }
}

//장바구니 담기
export function addToCartUser(data) {
  const request = 
    axios
    .post('/api/users/add_to_cart', data)
    .then(res => res.data);

  return {
    type : ADD_TO_CART_USER,
    payload : request
  }
}

//장바구니 정보 요청
export function getCartUser() {
  const request = 
    axios
    .get('/api/users/cartItems')
    .then(res => res.data);

  return {
    type : GET_CART_USER,
    payload : request
  }
}

//장바구니에서 상품 삭제
export function deleteCartUser(data) {
  const request = 
    axios
    .post('/api/users/delete_cart', data)
    .then(res => res.data);

  return {
    type : DELETE_CART_USER,
    payload : request
  }
}