import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { likeProduct } from '../../../_actions/product_action';

import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { Item, Detail, TextBox } from "../../../styles/shopping/ContentStyle";

function PostList({ auth, username, products, userInfo }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ likes, setLikes ] = useState({});

  //위시리스트에 상품 추가/삭제
  const updateWishlist = (index)=> {
    if(auth) {
      const product = products.filter(product=> product.index === index);
      const body = product[0];

      dispatch(likeProduct(body))
      .then(response=> {
        const data = response.payload;

        if(data.success) {
          setLikes(prev=> (
            { ...prev, [index] : !prev[index] }
          ));
        } else {
          console.error(data.err);
          alert("An error occured. Please try again");
        }
      });
    } else {
      const alert = "This feature requires login. Would you like to log in?";

      if(window.confirm(alert)) {
        navigate('/membership/login');
      }
    }
  };

  useEffect(()=> {
    if(products && auth) {
      products.forEach((product)=> {
        const isLiked = product.likes.users.some(userId=> userId === auth._id);
        setLikes(prev=> ({...prev, [product.index] : isLiked}));
      })
    }
  }, [products, auth]);

  return (
    <>
      {products.map((product, index)=>
        <Item key={index}> 
          <img src={process.env.PUBLIC_URL + product.images[0].file.filePath} />
          <Detail
            onClick={()=> {
              navigate(`/${username}/shopping/product/${product.index}`);
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
          {auth   //로그인 했을 경우
          //본인 스토어가 아닐 때 (본인 스토어인 경우 하트 아이콘 X)
          ? (!auth.storeOwner || auth.store._id !== userInfo.store._id) &&  
            (likes[product.index]
              //위시리스트에 추가된 경우
              ? <BsSuitHeartFill
                  onClick={()=> updateWishlist(product.index)}
                />
              //위시리스트에 추가되지 않은 경우
              : <BsSuitHeart
                  onClick={()=> updateWishlist(product.index)}
                />
            )
          //로그인 안 했을 경우
          : <BsSuitHeart
              onClick={()=> updateWishlist(product.index)}
            />
          }
        </Item>
      )}
    </>
  )
}

export default PostList;