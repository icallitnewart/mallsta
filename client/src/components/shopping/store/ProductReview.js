import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getListReview } from '../../../_actions/review_action';
import useAlert from "../../../hooks/useAlert";

import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { 
  ReviewBox, ReviewList, Review, Pages, PageNumber, 
} from '../../../styles/shopping/PopupStyle';

import ReviewUpload from './ReviewUpload';

function ProductReview({ isSeller, product, auth }) {
  const dispatch = useDispatch();
  const { renderAlert } = useAlert();
  const [ reviewList, setReviewList ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  
  useEffect(()=> {
    if(product) {
      const productId = product._id;
      
      dispatch(getListReview(productId))
      .then(response=> {
        const data = response.payload;

        if(data.success) {
          const list = data.reviewList;
          const reverseList = list.map((el, index)=> list[list.length - 1 - index]);

          setReviewList(reverseList);
          setIsLoading(false);
        } else {
          setReviewList(null);
          setIsLoading(false);
          console.error(data.err);
        }
      })
    }
  }, [product]);

  return (
    <ReviewBox>
      <span>Review</span>
      <ReviewList isSeller={isSeller}>
        {isLoading && renderAlert("notify", "loading")}
        {(!isLoading && !reviewList)
        ? //리뷰 목록 가져오기 실패시 알림 문구
          <p>
            An error occured. :( <br />
            Please come back later.
          </p>
        : (reviewList.length > 0)
          ? reviewList.map(review=> {
              //별 아이콘을 위한 배열
              const rating = review.rating / 2;
              const stars = Array(5).fill().map((arr, idx)=> {
                const diff = rating - idx;
                if(diff > 0) {
                  if(diff === 0.5) {
                    return <BsStarHalf key={idx} />;
                  } else {
                    return <BsStarFill key={idx} />;
                  }
                } else {
                  return <BsStar key={idx} />;
                }
              });

              return (
                <ul key={review._id}>
                  <li>
                    <img 
                      src={
                        (review.writer.profileImage) 
                        ? review.writer.profileImage
                        : "/img/profile_image_default.jpg"
                      } 
                      alt={`${review.writer.username}'s profile image`} 
                    />
                    <Review>
                      <ul>
                        <li>
                        {stars.map((star)=> star)}
                        </li>
                        <li>
                          <span>{review.rating}</span>
                        </li>
                        <li>
                          <span>{review.createdAt.split("T")[0]}</span>
                        </li>
                      </ul>
                      <div>
                        <span>{review.writer.username}</span>
                        {review.review}
                      </div>
                    </Review>
                  </li>
                </ul>
              )
            })
          //리뷰가 없을 때 알림 문구
          : <p>No Review</p>
        }
        <Pages>
          <li>
            <button
              type="button"
              arial-label="Go to previous Page"
            >
              <IoIosArrowBack />
            </button>
          </li>
          <PageNumber isActive={true}>
            <span role="button">1</span>
          </PageNumber>
          <PageNumber>
            <span role="button">2</span>
          </PageNumber>
          <PageNumber>
            <span role="button">3</span>
          </PageNumber>
          <PageNumber>
            <span role="button">4</span>
          </PageNumber>
          <PageNumber>
            <span role="button">5</span>
          </PageNumber>
          <li>
            <button
              type="button"
              arial-label="Go to next Page"
            >
              <IoIosArrowForward />
            </button>
          </li>
        </Pages>
      </ReviewList>
      {/* 구매자: 리뷰 입력 */}
      {(!isSeller) && 
        <ReviewUpload 
          isSeller={isSeller}
          product={product}
          auth={auth}
        />
      }
    </ReviewBox>
  )
}

export default ProductReview;