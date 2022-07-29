import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCartUser } from '../../_actions/user_action';

import { BsCart3, BsCheck2 } from "react-icons/bs";
import { Container, Title2, LikeList, LikeItem, DetailBox } from "../../styles/cart/CartStyle";

function Wishlist({ 
  auth, isLoading, renderAlert, 
  cartItems, setCartItems, wishlist
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //위시리스트 상품 장바구니로 이동
  const addToCart = (product, isInCart)=> {
    //이미 카트에 담겨져있다면 경고창 출력
    if(isInCart) return alert("This item is already in cart.");

    const body = { 
      product, 
      quantity : 1
    };

    dispatch(addToCartUser(body))
    .then(response=> {
      const data = response.payload;
      
      if(data.success) {
        const newItem = data.cartItems.filter(item=> item.product === product._id)[0];
        newItem.product = product;
        setCartItems(prev=> [...prev, newItem]);
      } else {
        console.error(data.err);
        alert("An error occured. Please try again.");
      }
    });
  };

  return (
    <Container 
      wd={"calc(20% - 15px)"}
      padd={"20px 25px"}
    >
      <Title2>
        Wishlist
      </Title2>
      <LikeList
        cartItems={cartItems.length}
      >
        {isLoading
        ? renderAlert("notify", "loading")
        : wishlist.map(item=> {
            const isInCart = cartItems.some(cartItem=> cartItem.product._id === item._id);

            return (
              <LikeItem key={item.index}>
                <img 
                  src={item.images[0].file.filePath} 
                  alt={`A product image of ${item.title}`} 
                />
                <button
                  type="button"
                  aria-label="Add to cart"
                  onClick={()=> addToCart(item, isInCart)}
                >
                  {isInCart ? <BsCheck2 /> : <BsCart3 />}
                </button>
                <DetailBox 
                  onClick={()=> navigate(item.url)}
                >
                  <h4>{item.title}</h4>
                </DetailBox>
              </LikeItem>
            )
          })
        }
      </LikeList>
    </Container>
  )
}

export default Wishlist;