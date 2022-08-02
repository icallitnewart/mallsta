import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../../../_actions/product_action';
import { USER_DEFAULT_PROFILE_IMAGE as DEFAULT_PROFILE } from '../../../data/userData';

import { 
  InfoBox, StoreTitle, Pic, TextBox, Tags, EditButtonBox 
} from '../../../styles/shopping/PopupStyle';

import Checkout from './Checkout';
import ProductReview from './ProductReview';

function ProductInfo({ 
  username, auth, isPageOwner, userInfo,
  product, setIsEdit, isLiked, setIsLiked
}) {
  const PUBLIC_URL = process.env.PUBLIC_URL;
  const dispatch = useDispatch();
  const isSeller = isPageOwner;
  const storeInfo = userInfo.store;

  //포스트 삭제
  const deletePost = ()=> {
    if(window.confirm("Are you sure you want to delete this post?")) {
      const targetImage = product.images.map((image)=> image.file.fileName);

      const body = {
        ...product,
        targetImage,
        username
      };
  
      dispatch(deleteProduct(body))
      .then(response=> {
        const data = response.payload;

        if(data.success) {
          alert("Successfully deleted!");
          window.location.href = `/${username}/shopping`;
        } else {
          alert("An error occured. Please try again");
          console.error(data.err);
        }
      })
    }
  };

  //위시리스트 추가 여부 확인
  useEffect(()=> {
    if(auth && product) {
      const userLike = product.likes.users.some(userId=> userId === auth._id);
      if(userLike) setIsLiked(true);
    }
  }, [auth, product]);

  return (
    <InfoBox>
      {/* 스토어 프로필 */}
      <StoreTitle>
        <Pic>
          <img 
            src={
              userInfo.profileImage
              ? (PUBLIC_URL + userInfo.profileImage)
              : (PUBLIC_URL + DEFAULT_PROFILE)
            } 
            style={
              (!userInfo.profileImage) && 
              { filter: "brightness(1.3)" }
            }
            alt={`${userInfo.username}'s profile image`} 
          />
        </Pic>
        <h1>
          <Link to={`/${username}/shopping`}>
            {storeInfo.name}
          </Link>
        </h1>
      </StoreTitle>

      {/* 상품 설명 */}
      <TextBox>
        <p>
          <span>{storeInfo.name}</span>
          {product && product.desc}
        </p>
        {product && product.tags &&
        <Tags>
          {product.tags.map((tag, index)=> 
            <li key={index}><span>{tag}</span></li>
          )}
        </Tags>
        }
        <Tags>
        </Tags>
      </TextBox>

      {/* 리뷰 */}
      <ProductReview 
        isSeller={isSeller} 
        product={product}
        auth={auth}
      />

      {/* 판매자: 포스트 수정 및 삭제 버튼 */}
      {(isSeller) &&
        <EditButtonBox>
          <button
            type="button"
            onClick={deletePost}
          >
            Delete
          </button>
          <button
            type="button"
            onClick={()=> setIsEdit(true)}
          >
            Edit
          </button>
        </EditButtonBox>
      }

      {/* 구매자: 장바구니 및 찜하기 버튼 */}
      {(!isSeller) && 
        <Checkout 
          isLiked={isLiked}
          setIsLiked={setIsLiked}
          auth={auth}
          product={product} 
        />
      }
    </InfoBox>
  )
}

export default React.memo(ProductInfo);