import axios from "axios";
import {
  PLACE_ORDER
} from "./types";

//주문하기
export function placeOrder(data) {
  const request = 
    axios
    .post('/api/orders/place_order', data)
    .then(res => res.data);

  return {
    type : PLACE_ORDER,
    payload : request
  }
};