import React from 'react';
import { useNavigate } from "react-router-dom";

import { GrClose } from "react-icons/gr";
import { CloseButton } from '../../styles/shopping/PopupStyle';

import ImageView from './ImageView';
import ProductInfo from './ProductInfo';

function PostView({ auth, username }) {
  const navigate = useNavigate();
  return (
    <>
      <ImageView />
      <ProductInfo 
        username={username}
      />
      <CloseButton
        onClick={()=> navigate(`/${username}/shopping`)}
        aria-label="Close Button"
      >
        <GrClose />
      </CloseButton>
    </>
  )
}

export default PostView;