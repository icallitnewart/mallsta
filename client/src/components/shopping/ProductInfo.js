import React, { useState } from 'react';
import { Link } from "react-router-dom";

import { 
  BsStar, BsStarFill, BsStarHalf, 
  BsFillArrowUpCircleFill, BsCart3, BsCartCheckFill, 
  BsSuitHeartFill, BsSuitHeart 
} from "react-icons/bs";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { 
  InfoBox, StoreTitle, Pic, TextBox, Tags, 
  ReviewBox, ReviewList, Review, ReviewForm, Rating, ReviewInput, 
  Pages, PageNumber, CheckoutForm, QuantityBox, Price, Buttons,
  EditButtonBox 
} from '../../styles/shopping/PopupStyle';

function ProductInfo({ username, isPageOwner }) {
  const isSeller = isPageOwner;
  
  return (
    <InfoBox>
      {/* 스토어 프로필 */}
      <StoreTitle>
        <Pic>
          {/* <img 
            src={
              userInfo.profileImage
              ? (PUBLIC_URL + userInfo.profileImage)
              : (PUBLIC_URL + DEFAULT_PROFILE)
            } 
            style={
              (!userInfo.profileImage) && 
              { filter: "brightness(1.3)" }
            }
            alt={`${userInfo.username}'s profile image`} 
          /> */}
        </Pic>
        <h1>
          <Link to={`/${username}/shopping`}>icallitnewart</Link>
        </h1>
      </StoreTitle>

      {/* 상품 설명 */}
      <TextBox>
        <p>
          <span>icallitnewart</span>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi consectetur labore, reprehenderit illo sint corrupti tenetur? Natus officia expedita beatae repudiandae tenetur sunt? Alias explicabo eligendi laboriosam porro voluptatem magnam.
        </p>
        <Tags>
          <li><span>Tags</span></li>
        </Tags>
      </TextBox>

      {/* 리뷰 */}
      <ReviewBox>
        <span>Review</span>
        <ReviewList isSeller={isSeller} id="ReviewList">
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
                placeholder="Leave a review..."
              ></input>
              <button
                aria-label="Post a review"
              >
                <BsFillArrowUpCircleFill />
              </button>
            </ReviewInput>
          </ReviewForm>
        }
      </ReviewBox>

      {/* 판매자: 포스트 수정 및 삭제 버튼 */}
      {(isSeller) &&
        <EditButtonBox>
          <button
            type="button"
          >
            Delete
          </button>
          <button
            type="button"
          >
            Edit
          </button>
        </EditButtonBox>
      }

      {/* 구매자: 장바구니 및 찜하기 버튼 */}
      {(!isSeller) &&
        <CheckoutForm>
          <QuantityBox>
            <button
              type="button"
              aria-label="Decrease product quantity by one"
            >-</button>
            <input 
              type="hidden" 
              name="quantity" 
              id="quantity"
            />
            <label htmlFor="quantity">
              <span className="hidden">Quantity</span>
              1
            </label>
            <button
              type="button"
              aria-label="Increase product quantity by one"
            >+</button>
          </QuantityBox>
          <Price>$300</Price>
          <Buttons>
            <button
              type="button"
              aria-label="Add to wishlist"
            >
              <BsSuitHeart />
            </button>
            <button
              type="submit"
              aria-label="Add to cart"
            >
              <BsCart3 />
            </button>
          </Buttons>
        </CheckoutForm>
      }
    </InfoBox>
  )
}

export default ProductInfo;