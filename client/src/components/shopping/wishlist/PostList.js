import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { likeProduct } from '../../../_actions/product_action';

import { BsBoxSeam, BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { Item, Detail, TextBox, Alert } from "../../../styles/shopping/ContentStyle";
import { ImSpinner3 } from 'react-icons/im';

function PostList({ 
  auth, username, isLoading,
  products, setProducts, likes, setLikes
}) {
  const dispatch = useDispatch();

  //위시리스트에 상품 추가/삭제
  const updateWishlist = (index)=> {
    if(auth) {
      const product = products.filter(product=> product.index === index);
      const body = product[0];

      dispatch(likeProduct(body))
      .then(response=> {
        const data = response.payload;

        if(data.success) {
          const updatedLikes = likes.filter((liked)=> liked !== index);
          setLikes(updatedLikes);
        } else {
          console.error(data.err);
          alert("An error occured. Please try again");
        }
      });
    }
  };

  //위시리스트에서 삭제시 상품 목록 업데이트
  useEffect(()=> {
    if(likes) {
      const updatedList = likes.map(like=> { 
        const likedItems = products.filter(product=> product.index === like);
        return likedItems[0];
      });

      //하트 아이콘 변경 후 업데이트 반영
      const timer = setTimeout(()=> {setProducts(updatedList)}, 150);

      return ()=> clearTimeout(timer);
    }
  }, [likes]);

  return (
    <React.Fragment>
      {isLoading &&
        <Alert isLoading={isLoading}>
          <ImSpinner3 />
        </Alert>
      }
      {(!isLoading && products.length > 0)  
      ? products.map((product, index)=> {
          const isLiked = likes.some(likedItem=> likedItem === product.index);

          return (
            <Item key={index}> 
              <img src={process.env.PUBLIC_URL + product.images[0].file.filePath} />
              <Detail
                onClick={()=> {
                  //TODO: URL 데이터 연동
                  window.location.replace(`/${username}/shopping/product/${product.index}`);
                }}
              >
                <TextBox>
                  <h2>{product.title}</h2>
                  <span>
                    {product.price.currency === "dollar" ? "$" : "₩"}
                    {product.price.amount}  
                  </span>
                </TextBox>
              </Detail>
              {/* 하트 아이콘 */}
              {auth &&  
                (isLiked
                  //위시리스트에 추가된 경우
                  ? <BsSuitHeartFill
                      onClick={()=> updateWishlist(product.index)}
                    />
                  //위시리스트에 추가되지 않은 경우
                  : <BsSuitHeart
                      onClick={()=> updateWishlist(product.index)}
                    />
                  )
                }
            </Item>
          )
        })
      : <Alert>
          <BsBoxSeam />
          <p style={{ marginTop: "0px" }}>
            No Items Added
          </p>
        </Alert> 
      }
    </React.Fragment>
  )
}

export default PostList;