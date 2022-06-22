import React, { useState } from 'react';

import { GrClose } from "react-icons/gr";
import { FiUpload } from "react-icons/fi";
import { ImageBox, ImageBig, ThumbnailBox, ImageSmall, ImageFilter, FilterOption, UploadButton } from "../../styles/shopping/PopupStyle";

function ImageUpload({ images }) {
  const [ activeImg, setActiveImg ] = useState(0);

  return (
    <ImageBox>
      <ImageBig>
        <img src={images[activeImg]} alt="" />
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
            defaultValue="100"
          />
          <span>0%</span>
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
            defaultValue="100"
          />
          <span>0%</span>
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
            defaultValue="100"
          />
          <span>0%</span>
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
          <span><GrClose /></span>
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