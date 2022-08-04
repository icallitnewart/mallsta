import React, { useEffect, useState } from 'react';

import { BsStar, BsStarFill, BsStarHalf, BsFillArrowUpCircleFill } from "react-icons/bs";
import useInputs from '../../../hooks/useInputs';
import { 
  ReviewForm, Rating, ReviewInput
} from '../../../styles/shopping/PopupStyle';

function ReviewUpload({ isSeller, product, auth }) {
  //리뷰 작성 자격 여부
  const [ isQualified, setIsQualified ] = useState(false);
  //별 아이콘
  const [ stars, setStars ] = useState(0);

  //value
  const initValue = { review : "" };
  const { values, handleChange } =  useInputs(initValue);
  const [ rating, setRating ] = useState(0);

  //유효성 검사
  const checkErr = ()=> {
    let errMsg = "";
    if(!values.review) errMsg = "Please write a review.";
    if(rating === 0) errMsg = "Please leave a rating by clicking on stars."; 
    return errMsg;
  };
  
  //리뷰 작성하기
  const submitReview = (e)=> {
    e.preventDefault();
    
    //작성 자격 미달시 경고창 출력
    const msg = "Sorry, only those who bought this product can leave a review.";
    if(!isQualified) return alert(msg);

    //유효성 검사
    const errMsg = checkErr();
    if(errMsg) return alert(errMsg);

    const body = {
      review : values.review,
      rating
    };
  };

  //별점 주기
  const giveRating = ()=> {
    if(!isQualified) return alert("Only buyers of this product can leave a rating.");
    setRating(stars);
  };

  //별 아이콘 마우스오버시 별 색칠하기
  const onHoverStars = (e, rating)=> {
    //별 아이콘 마우스 위치에 따라 full/half 구분 
    //(짝수: full / 홀수: half)
    if(e.nativeEvent.offsetX > 7) rating += 1;
    setStars(rating);
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
      <Rating onMouseLeave={()=> setStars(rating)}>
        <label htmlFor="rating" hidden>Ratings</label>
        <input 
          type="hidden" 
          name="rating" 
          id="rating"
          value={rating}
        />
        {Array(5).fill().map((arr, index)=> {
          const score = index * 2 + 1;
          return (
            <button
              key={index}
              type="button"
              aria-label={`Rate a product a ${score} or ${score + 1} out of 10`}
              onMouseOver={(e)=> onHoverStars(e, score)}
              onClick={giveRating}
            >
              {(score < stars) 
                ? <BsStarFill />
                : (stars % 2 === 1 && score === stars)
                  ? <BsStarHalf /> 
                  : <BsStar /> 
              }
            </button>
          )
        })}
      </Rating>
      <ReviewInput>
        <label htmlFor="review" hidden>
          Leave a review
        </label>
        <input 
          type="text" 
          name="review" 
          id="review" 
          value={values.review}
          onChange={handleChange}
          placeholder={
            isQualified 
            ? "Leave a review..." 
            : "You need to buy this item to write a review."
          }
          disabled={!isQualified}
        ></input>
        <button
          aria-label="Post a review"
          onClick={submitReview}
        >
          <BsFillArrowUpCircleFill />
        </button>
      </ReviewInput>
    </ReviewForm>
  )
}

export default ReviewUpload;