import React from 'react';

import { BsStarFill } from "react-icons/bs";
import { ImageBox, ImageBig, Images, ArrowBtn, TitleBox } from '../../styles/shopping/PopupStyle';
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";

function ImageView() {
  return (
    <ImageBox 
      style={{ 
        borderRight: "1px solid #eee", 
        background: "transparent" 
      }}
    >
      <ImageBig>
        <ArrowBtn 
          type="button"
          btnType="prev"
          aria-label="Go to the previous product image"
        >
          <IoIosArrowDropleftCircle />
        </ArrowBtn>
        <Images imgNum={2}>
          <li>
            <img src={process.env.PUBLIC_URL + "/img/profile_image_default.jpg"} />
          </li>
        </Images>
        <ArrowBtn 
          type="button"
          btnType="next"
          aria-label="Go to the next product image"
        >
          <IoIosArrowDroprightCircle /> 
        </ArrowBtn>
      </ImageBig>
      <TitleBox ht="calc(100% - 360px)">
        {/* 카테고리 */}
        <span>Fashion &#62; Top</span>
        {/* 상품명 */}
        <h1>
          <span>Lorem ipsum dolor sit amet consectetur.</span>
        </h1>
        <ul>
          <li>
            <BsStarFill title="Star icon for rating score" />
          </li>
          <li>
            {/* 별점 */}
            <span>7</span>
            <span>/</span>
            <span>10</span>
            {/* 리뷰 총 개수 */}
            <span>(20)</span>
          </li>
          <li>
            {/* 가격 */}
            <span>$300</span>
          </li>
        </ul>
      </TitleBox>
    </ImageBox>
  )
}

export default ImageView;