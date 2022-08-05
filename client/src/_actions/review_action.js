import axios from "axios";
import {
  WRITE_REVIEW,
  GETLIST_REVIEW
} from "./types";

//리뷰 작성
export function writeReview(data) {
  const request = 
    axios
    .post('/api/reviews/write', data)
    .then(res => res.data);

  return {
    type : WRITE_REVIEW,
    payload : request
  }
}

//리뷰 목록 요청
export function getListReview(productId) {
  const request = 
    axios
    .get(`/api/reviews/reviewList?productId=${productId}`)
    .then(res => res.data);

  return {
    type : GETLIST_REVIEW,
    payload : request
  }
}
