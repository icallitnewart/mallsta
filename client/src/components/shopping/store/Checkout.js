import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { likeProduct } from '../../../_actions/product_action';
import { addToCartUser } from '../../../_actions/user_action';

import { BsCart3, BsSuitHeartFill, BsSuitHeart, BsCartCheckFill } from "react-icons/bs";
import { CheckoutForm, QuantityBox, Price, Buttons } from '../../../styles/shopping/PopupStyle';

function Checkout({ isLiked, setIsLiked, auth, product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ quantity, setQuantity ] = useState(1);
  const [ isInCart, setIsInCart ] = useState(false);

  //위시리스트에 상품 추가/삭제
  const updateWishlist = ()=> {
    if(auth) {
      const body = { ...product };

      dispatch(likeProduct(body))
      .then(response=> {
        const data = response.payload;

        if(data.success) {
          setIsLiked(prev=> !prev);
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

  //장바구니 담기
  const addToCart = (e)=> {
    e.preventDefault();

    if(auth) {
      const body = { product, quantity };

      dispatch(addToCartUser(body))
      .then(response=> {
        const data = response.payload;
        
        if(data.success) {
          setIsInCart(true);

          const timer = setTimeout(()=> {
            const alert = "Item added to cart! Would you like to go check your cart?"
            if(window.confirm(alert)) {
              navigate(`/cart`);
            }
          }, 100);
          return ()=> clearTimeout(timer);
        } else {
          console.error(data.err);
          alert("An error occured. Please try again.");
        }
      });
    } 
    //로그인 안 했을 경우
    else {
      const alert = "This feature requires login. Would you like to log in?";
      if(window.confirm(alert)) {
        navigate("/membership/login");
      };
    }
  };

  //장바구니에 상품이 담겨있는지 여부 확인
  useEffect(()=> {
    if(product && auth) {
      const isExist = auth.cart.some(item=> item.product === product._id);
      if(isExist) setIsInCart(isExist);
    }
  }, [product, auth]);

  return (
    <form onSubmit={addToCart}>
      <CheckoutForm>
        <QuantityBox>
          <button
            type="button"
            aria-label="Decrease product quantity by one"
            onClick={()=>setQuantity(prev=> prev - 1)}
            disabled={quantity === 1}
          >-</button>
          <input 
            type="hidden" 
            name="quantity" 
            id="quantity"
          />
          <label htmlFor="quantity">
            <span className="hidden">Quantity</span>
            {quantity}
          </label>
          <button
            type="button"
            aria-label="Increase product quantity by one"
            onClick={()=>setQuantity(prev=> prev + 1)}
          >+</button>
        </QuantityBox>
        <Price>
          {product && product.price.currency === "dollar" ? "$" : "₩"}
          {product && product.price.amount * quantity}
        </Price>
        <Buttons>
          <button
            type="button"
            aria-label="Add to wishlist"
            onClick={updateWishlist}
          >
            {isLiked ? <BsSuitHeartFill /> : <BsSuitHeart />}
          </button>
          <button
            type="submit"
            aria-label="Add to cart"
          >
            {isInCart
              //장바구니에 이미 담겨있을 경우
              ? <BsCartCheckFill />
              //로그인하지 않았거나 장바구니에 담기지 않았을 경우
              : <BsCart3 />
            }
          </button>
        </Buttons>
      </CheckoutForm>
    </form>
  )
}

export default Checkout;