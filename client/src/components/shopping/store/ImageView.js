import React, { useEffect, useState } from 'react';

import { PRODUCT_CATEGORY as CATEGORY } from '../../../data/productData';

import { BsStarFill } from "react-icons/bs";
import { ImageBox, ImageBig, TitleBox } from '../../../styles/shopping/PopupStyle';

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
        <span>
          {category && category.department} 
          &nbsp;&#62;&nbsp;
          {category && category.productType}
        </span>
        {/* 상품명 */}
        <h1>
          <span>{product && product.title}</span>
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
            <span>
              {product && product.price.currency === "dollar" ? "$" : "￦"}
              {product && product.price.amount}
            </span>
          </li>
        </ul>
      </TitleBox>
    </ImageBox>
  )
}

export default React.memo(ImageView);