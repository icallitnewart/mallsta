import React, { useEffect, useState } from 'react';

import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { 
  ReviewBox, ReviewList, Review, Pages, PageNumber, 
} from '../../../styles/shopping/PopupStyle';

import ReviewUpload from './ReviewUpload';

function ProductReview({ isSeller, product, auth }) {

  return (
    <ReviewBox>
      <span>Review</span>
      <ReviewList isSeller={isSeller}>
        <ul>
          <li>
            <img 
              src={`${process.env.PUBLIC_URL}/img/profile_image_default.jpg`} 
              alt="Profile Image" 
            />
            <Review>
              <ul>
                <li>
                  <BsStarFill />
                  <BsStarFill />
                  <BsStarFill />
                  <BsStarHalf />
                  <BsStar />
                </li>
                <li>
                  <span>7</span>
                </li>
                <li>
                  <span>2022.02.05</span>
                </li>
              </ul>
              <div>
                <span>icallitnewart</span>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error, odit!
              </div>
            </Review>
          </li>
        </ul>
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