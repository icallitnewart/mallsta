import React, { useState } from 'react';

import { GrClose } from "react-icons/gr";
import { CloseButton, ButtonBox, Button } from "../../styles/shopping/PopupStyle";

import InputForm from './InputForm';
import ImageUpload from './ImageUpload';

function PostUpload({ setIsUpload }) {
  const [ filterValues, setFilterValues ] = useState([]);
  const [ images, setImages ] = useState([]);

  const closePopup = ()=> {
    setIsUpload(false);
  };

  return (
    <>
      <ImageUpload 
        images={images}
        setImages={setImages}
        filterValues={filterValues}
        setFilterValues={setFilterValues}
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
    </>
  )
}

export default PostUpload;