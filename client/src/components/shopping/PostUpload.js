import React, { useState } from 'react';

import { GrClose } from "react-icons/gr";
import { CloseButton, ButtonBox, Button } from "../../styles/shopping/PopupStyle";

import InputForm from './InputForm';
import ImageUpload from './ImageUpload';

function PostUpload({ setIsUpload }) {
  const images = [
    `${process.env.PUBLIC_URL}/img/profile_image_default.jpg`,
  ];
  const [ rangeValues, setRangeValues ] = useState([]);

  const closePopup = ()=> {
    setIsUpload(false);
  };

  return (
    <form>
      <ImageUpload 
        images={images}
        rangeValues={rangeValues}
        setRangeValues={setRangeValues}
      />

      <InputForm />

      <ButtonBox>
        <Button 
          type="button"
          btnType="cancel"
          onClick={closePopup}
        >
          Cancel
        </Button>
        <Button 
          type="submit"
          btnType="submit"
        >
          Post
        </Button>
      </ButtonBox>
      
      <CloseButton
        onClick={closePopup}
        aria-label="Close Button"
      >
        <GrClose />
      </CloseButton>
    </form>
  )
}

export default PostUpload;