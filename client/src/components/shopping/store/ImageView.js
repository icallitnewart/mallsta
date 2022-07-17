import React, { useEffect, useState } from 'react';

import { PRODUCT_CATEGORY as CATEGORY } from '../../../data/productData';

import { BsStarFill, BsSuitHeartFill } from "react-icons/bs";
import { ImageBox, ImageBig, TitleBox, Category, Title, DetailedInfo, RatingInfo, LikeInfo, PriceInfo } from '../../../styles/shopping/PopupStyle';

import ImageSlider from './ImageSlider';

function ImageView({ product }) {
  const [ category, setCategory ] = useState(null);

  useEffect(()=> {
    if(product) {
      const targetCategory = CATEGORY.filter((category)=> category._id === product.category.department)[0];
      const department = targetCategory.department;
      const productType = 
        targetCategory &&
        (targetCategory.array 
          ? targetCategory.array.filter((item)=> item._id === parseInt(product.category.productType))[0].type
          : product.category.productType
        );
        
      setCategory({ department, productType });
    }
  }, [product]);

  return (
    <ImageBox 
      style={{ 
        borderRight: "1px solid #eee", 
        background: "transparent" 
      }}
    >
      <ImageBig>
      {product && <ImageSlider product={product} />}
      </ImageBig>
      <TitleBox ht="calc(100% - 360px)">
        {/* 카테고리 */}
        <Category>
          {category && category.department} 
          &nbsp;&#62;&nbsp;
          {category && category.productType}
        </Category>
        {/* 상품명 */}
        <Title>
          {product && product.title}
        </Title>
        <DetailedInfo>
          <RatingInfo>
            {/* 별점 */}
            <BsStarFill title="Star icon for rating score" />
            <span>7</span>
            <span>/</span>
            <span>10</span>
            {/* 리뷰 총 개수 */}
            <span>(20)</span>
          </RatingInfo>
          {/* 찜하기 개수 */}
          <LikeInfo>
            <BsSuitHeartFill />
            <span>{product.likes.total}</span>
          </LikeInfo>
          <PriceInfo>
            {/* 가격 */}
            <span>
              {product && product.price.currency === "dollar" ? "$" : "￦"}
              {product && product.price.amount}
            </span>
          </PriceInfo>
        </DetailedInfo>
      </TitleBox>
    </ImageBox>
  )
}

export default React.memo(ImageView);