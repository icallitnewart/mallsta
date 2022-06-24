import axios from "axios";
import { 
  UPLOAD_IMAGE_PRODUCT,
  DELETE_IMAGE_PRODUCT
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