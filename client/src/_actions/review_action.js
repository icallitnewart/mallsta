import axios from "axios";
import {
  WRITE_REVIEW
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

