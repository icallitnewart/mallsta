import React, { useEffect, useState } from 'react';

import { BsStar, BsStarFill, BsStarHalf, BsFillArrowUpCircleFill } from "react-icons/bs";
import { 
  ReviewForm, Rating, ReviewInput
} from '../../../styles/shopping/PopupStyle';

function ReviewUpload({ isSeller, product, auth }) {
  //리뷰 작성 자격 여부
  const [ isQualified, setIsQualified ] = useState(false);
  
  const writeReview = (e)=> {
    e.preventDefault();
    
    const msg = "Sorry, only those who bought this product can leave a review.";
    if(!isQualified) return alert(msg);
  };

  useEffect(()=> {
    if(!isSeller && product && auth) {
        //1. 상품의 주문자가 맞는지 확인
        const buyers = product.order.buyers;
        const isBuyer = buyers.some(userId=> userId === auth._id);
        if(!isBuyer) return;
  
        //2. 상품 주문 기록과 일치하는 내 주문 기록 찾기
        const productOrders = product.order.orderList;
        const myOrders = auth.order.reduce((acc, cur)=> {
          acc = cur.orderList.concat(acc);
          return acc;
        }, []);
        const myOrderList = productOrders.filter(productOrder=> {
          return myOrders.some(myOrder=> {
            return productOrder === myOrder;
          })
        });
  
        if(myOrderList.length > 0) {
          setIsQualified(true);
        }
    }
  }, [isSeller, product, auth]);

  return (
    <ReviewForm>
      <Rating>
        <label htmlFor="ratingScore" hidden>Rating Score</label>
        <input 
          type="hidden" 
          name="ratingScore" 
          id="ratingScore"
        />
        <button
          type="button"
          aria-label="Give a rating score of 1 or 2 out of 10"
        >
          <BsStarFill />
        </button>
        <button
          type="button"
          aria-label="Give a rating score of 3 or 4 out of 10"
        >
          <BsStarFill />
        </button>
        <button
          type="button"
          aria-label="Give a rating score of 5 or 6 out of 10"
        >
          <BsStarFill />
        </button>
        <button
          type="button"
          aria-label="Give a rating score of 7 or 8 out of 10"
        >
          <BsStarHalf />
        </button>
        <button
          type="button"
          aria-label="Give a rating score of 9 or 10 out of 10"
        >
          <BsStar />
        </button>
      </Rating>
      <ReviewInput>
        <label htmlFor="review" hidden>
          Leave a review
        </label>
        <input 
          type="text" 
          name="review" 
          id="review" 
          placeholder={
            isQualified 
            ? "Leave a review..." 
            : "You need to buy this item to write a review."
          }
          disabled={!isQualified}
        ></input>
        <button
          aria-label="Post a review"
          onClick={writeReview}
        >
          <BsFillArrowUpCircleFill />
        </button>
      </ReviewInput>
    </ReviewForm>
  )
}

export default ReviewUpload;