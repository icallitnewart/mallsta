import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { likeProduct } from '../../../_actions/product_action';
import useAlert from '../../../hooks/useAlert';

import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { Item, Detail, TextBox } from "../../../styles/shopping/ContentStyle";

function PostList({ 
  auth, isLoading,
  products, setProducts, likes, setLikes
}) {
  const dispatch = useDispatch();
  const { renderAlert } = useAlert(isLoading);

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
      {isLoading && renderAlert("notify", "loading")}
      {(!isLoading && products.length > 0)  
      ? products.map((product, index)=> {
          const isLiked = likes.some(likedItem=> likedItem === product.index);

          return (
            <Item key={index}> 
              <img src={process.env.PUBLIC_URL + product.images[0].file.filePath} />
              <Detail
                onClick={()=> {
                  window.location.replace(product.url);
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
      : renderAlert("empty", "wishlist")
      }
    </React.Fragment>
  )
}

export default PostList;