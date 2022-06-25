import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteImageProduct } from '../../_actions/product_action';

import { GrClose } from "react-icons/gr";
import { CloseButton, ButtonBox, Button } from "../../styles/shopping/PopupStyle";

import InputForm from './InputForm';
import ImageUpload from './ImageUpload';

function PostUpload({ authUser, setIsUpload }) {
  const dispatch = useDispatch();
  const [ filterValues, setFilterValues ] = useState([]);
  const [ images, setImages ] = useState([]);

  //서버 이미지 파일 삭제
  const deleteImages = ()=> {
    if(images.length > 0) {
      const targetImage = images.map((image)=> image.fileName);
      const body = { targetImage };
  
      dispatch(deleteImageProduct(body))
      .then(response=> {
        const data = response.payload;
  
        if(!data.success) {
          console.error(data.err);
        }
      });
    };
  };

  //팝업창 닫기 클릭시
  const closePopup = ()=> {
    setIsUpload(false);
    deleteImages();
  };

  //브라우저 이탈시 업로드한 이미지 자동 삭제
  useEffect(()=> {
    window.addEventListener("beforeunload", deleteImages);

    return ()=> window.removeEventListener("beforeunload", deleteImages);
  }, []);

  return (
    <>
      <ImageUpload 
        images={images}
        setImages={setImages}
        filterValues={filterValues}
        setFilterValues={setFilterValues}
      />

      <InputForm 
        authUser={authUser}
      />

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