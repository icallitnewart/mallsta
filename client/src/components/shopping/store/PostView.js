import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { getInfoProduct } from '../../../_actions/product_action';

import { GrClose } from "react-icons/gr";
import { CloseButton } from '../../../styles/shopping/PopupStyle';

import ImageView from './ImageView';
import ProductInfo from './ProductInfo';

function PostView(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ product, setProduct ] = useState(null);
  const [ isLiked, setIsLiked ] = useState(false);

  useEffect(()=> {
    dispatch(getInfoProduct(props.productId))
    .then(response=> {
      const data = response.payload;

      if(data.success) {
        setProduct(data.productInfo);
      } else {
        console.error(data.err);
        alert("An error occured. Please try again.");
        navigate(`/${props.username}/shopping`);
      }
    });
  }, [isLiked]);

  return (
    <>
      <ImageView 
        {...{...props, product }} 
      />
      <ProductInfo 
        {...{...props, product, isLiked, setIsLiked }} 
      />
      <CloseButton
        onClick={()=> navigate(`/${props.username}/shopping`)}
        aria-label="Close Button"
      >
        <GrClose />
      </CloseButton>
    </>
  )
}

export default React.memo(PostView);