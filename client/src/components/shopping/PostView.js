import React from 'react';
import { useNavigate } from "react-router-dom";

import { GrClose } from "react-icons/gr";
import { CloseButton } from '../../styles/shopping/PopupStyle';

import ImageView from './ImageView';
import ProductInfo from './ProductInfo';

function PostView(props) {
  const navigate = useNavigate();

  return (
    <>
      <ImageView />
      <ProductInfo {...props} />
      <CloseButton
        onClick={()=> navigate(`/${props.username}/shopping`)}
        aria-label="Close Button"
      >
        <GrClose />
      </CloseButton>
    </>
  )
}

export default PostView;