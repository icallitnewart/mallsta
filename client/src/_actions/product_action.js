import axios from "axios";
import { 
  UPLOAD_IMAGE_PRODUCT,
  DELETE_IMAGE_PRODUCT,
  REGISTER_PRODUCT,
  GETINFO_PRODUCT,
  DELETE_PRODUCT,
  EDIT_PRODUCT,
  LIKE_PRODUCT
} from "./types";

//이미지 업로드
export function uploadImageProduct(data) {
  const request = 
    axios
    .post('/api/products/upload_image', data)
    .then(res => res.data);

  return {
    type : UPLOAD_IMAGE_PRODUCT,
    payload : request
  }
}

//이미지 삭제
export function deleteImageProduct(data) {
  const request = 
    axios
    .post('/api/products/delete_image', data)
    .then(res => res.data);

  return {
    type : DELETE_IMAGE_PRODUCT,
    payload : request
  }
}

//상품 등록
export function registerProduct(data) {
  const request = 
    axios
    .post('/api/products/register', data)
    .then(res => res.data);

  return {
    type : REGISTER_PRODUCT,
    payload : request
  }
}

//상품 정보 요청
export function getInfoProduct(data) {
  const request = 
    axios
    .get(`/api/products/product_by_id?id=${data}`)
    .then(res => res.data);

  return {
    type : GETINFO_PRODUCT,
    payload : request
  }
}

//상품 삭제
export function deleteProduct(data) {
  const request = 
    axios
    .post('/api/products/delete', data)
    .then(res => res.data);

  return {
    type : DELETE_PRODUCT,
    payload : request
  }
}

//상품 수정
export function editProduct(data) {
  const request = 
    axios
    .post('/api/products/edit', data)
    .then(res => res.data);

  return {
    type : EDIT_PRODUCT,
    payload : request
  }
}

//상품 위시리스트에 추가/삭제
export function likeProduct(data) {
  const request = 
    axios
    .post('/api/products/like', data)
    .then(res => res.data);

  return {
    type : LIKE_PRODUCT,
    payload : request
  }
}