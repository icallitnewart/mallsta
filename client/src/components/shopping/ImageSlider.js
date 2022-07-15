import React from 'react'
import useSlider from '../../hooks/useSlider';

import { Images, ArrowBtn, Disc, Dot } from '../../styles/shopping/PopupStyle';
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";

function ImageSlider({ product }) {
  const { activeIndex, setActiveIndex, animatedStyle } = useSlider(product);
  
  return (
    <>
      {/* 이미지 슬라이드 */}
      <Images 
        imgNum={product.images.length}
        slide={animatedStyle}
      >
        {product.images.map((image, index)=> 
        <li key={index}>
          <img 
            src={image.file.filePath} 
            style={{
              filter: `
                brightness(${image.filter.brightness}%) 
                saturate(${image.filter.saturate}%) 
                contrast(${image.filter.contrast}%) 
              `
            }}
          />
        </li>
        )}
      </Images>
      {/* 화살표 버튼 */}
      {(activeIndex > 0) &&
        <ArrowBtn 
          type="button"
          btnType="prev"
          aria-label="Go to the previous product image"
          onClick={()=> setActiveIndex(prev=> prev - 1)}
        >
          <IoIosArrowDropleftCircle />
        </ArrowBtn>
      }
      {(activeIndex < product.images.length - 1) &&
        <ArrowBtn 
          type="button"
          btnType="next"
          aria-label="Go to the next product image"
          onClick={()=> setActiveIndex(prev=> prev + 1)}
        >
          <IoIosArrowDroprightCircle /> 
        </ArrowBtn>
      }
      {/* 인디케이터 */}
      {(product.images.length > 0) &&
        <Disc>
          {product.images.map((img, index)=> 
            <Dot 
              key={index}
              role="button"
              isActive={index === activeIndex}
              onClick={()=> setActiveIndex(index)}
            ></Dot>
          )}
        </Disc>
      }
  </>
  )
}

export default ImageSlider;