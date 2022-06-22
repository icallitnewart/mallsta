import React, { useEffect, useState } from 'react';

import { GrClose } from "react-icons/gr";
import { FiUpload } from "react-icons/fi";
import { ImageBox, ImageBig, ThumbnailBox, ImageSmall, ImageFilter, FilterOption, UploadButton } from "../../styles/shopping/PopupStyle";

function ImageUpload({ images, rangeValues, setRangeValues }) {
  const [ activeImg, setActiveImg ] = useState(0);

  const deleteImage = ()=> {

  };

  //필터 옵션 변경
  const controlRange = (e)=> {
    const { name, value } = e.target;
    let newArr = [ ...rangeValues ];
    
    newArr.forEach((item)=> {
      if(item.file === images[activeImg]) {
        item.range[name] = parseInt(value);
        setRangeValues(newArr);
      } 
    });
  };

  //총 이미지 개수에 맞춰서 초기값 셋팅
  useEffect(()=> {
    const initValue = images.map((image)=> {
      let obj = {};
      const initRange = {
        brightness : 100,
        saturate : 100,
        contrast : 100
      };

      obj.file = image;
      obj.range = initRange;

      return obj;
    });

    setRangeValues(initValue);
  }, []);

  return (
    <ImageBox>
      <ImageBig>
        <img 
          src={images[activeImg]} 
          alt={`Upload Image${activeImg}`} 
          style={{ 
            filter: `
              brightness(${(rangeValues.length > 0) && rangeValues[activeImg].range.brightness}%) 
              contrast(${(rangeValues.length > 0) && rangeValues[activeImg].range.contrast}%) 
              saturate(${(rangeValues.length > 0) && rangeValues[activeImg].range.saturate}%)
            `
          }}
        />
      </ImageBig>
      <ImageFilter>
        <FilterOption>
          <label htmlFor="brightness">
            Brightness
          </label>
          <input 
            type="range" 
            name="brightness" 
            id="brightness" 
            min="0"
            max="200"
            step="1"
            value={rangeValues.length > 0 && rangeValues[activeImg].range.brightness}
            onChange={controlRange}
          />
          <span>{`${rangeValues.length > 0 && rangeValues[activeImg].range.brightness - 100}%`}</span>
        </FilterOption>
        <FilterOption>
          <label htmlFor="saturate">
            Saturate
          </label>
          <input 
            type="range" 
            name="saturate" 
            id="saturate" 
            min="0"
            max="200"
            step="1"
            value={rangeValues.length > 0 && rangeValues[activeImg].range.saturate}
            onChange={controlRange}
          />
          <span>{`${rangeValues.length > 0 && rangeValues[activeImg].range.saturate - 100}%`}</span>
        </FilterOption>
        <FilterOption>
          <label htmlFor="contrast">
            Contrast
          </label>
          <input 
            type="range" 
            name="contrast" 
            id="contrast" 
            min="0"
            max="200"
            step="1"
            value={rangeValues.length > 0 && rangeValues[activeImg].range.contrast}
            onChange={controlRange}
          />
          <span>{`${rangeValues.length > 0 && rangeValues[activeImg].range.contrast - 100}%`}</span>
        </FilterOption>
      </ImageFilter>
      <ThumbnailBox>
        {images.map((img, index)=> 
        <ImageSmall 
          key={index}
          isActive={index===activeImg} 
          onClick={()=> setActiveImg(index)}
        >
          <img src={img} />
          <span onClick={deleteImage}><GrClose /></span>
        </ImageSmall>
        )}
        <li>
          <UploadButton type="button">
            <span>Upload</span> 
            <FiUpload />
          </UploadButton>
        </li>
      </ThumbnailBox>
    </ImageBox>
  )
}

export default ImageUpload;