import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCartUser } from '../_actions/user_action';
import useAlert from '../hooks/useAlert';

import { Background } from "../styles/common/LayoutStyle";
import { Wrapper } from '../styles/cart/CartStyle';

import CartList from '../components/cart/CartList';
import Wishlist from '../components/cart/Wishlist';
import Checkout from '../components/cart/Checkout';

function CartPage() {
  const dispatch = useDispatch();
  const auth = useSelector(state=> state.user.userData);
  const cart = useSelector(state=> state.user.cart);
  const [ cartItems, setCartItems ] = useState([]);
  const [ wishlist, setWishlist ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const { renderAlert } = useAlert(isLoading);

  const props = {
    auth, isLoading, renderAlert,
    cartItems, setCartItems, 
    wishlist, setWishlist
  };

  //장바구니 데이터 호출
  useEffect(()=> {
    //redux store에 장바구니 데이터가 저장되어있다면 redux 활용
    //*단, 상품 페이지에서 상품을 장바구니에 추가한 후 장바구니 페이지 접속시엔 데이터 재호출 
    if(cart && cart.cartItems && cart.wishlist) {
      setCartItems(cart.cartItems);
      setWishlist(cart.wishlist.slice(0, 8));
      setIsLoading(false);
    } else {
      dispatch(getCartUser())
      .then(response=> {
        const data = response.payload;
  
        if(data.success) {
          setCartItems(data.cartItems);
          setWishlist(data.wishlist.slice(0, 8));
          setIsLoading(false);
        } else {
          console.error(data.err);
          setIsLoading(false);
        }
      });
    }
  }, [cart]);

  return (
    <Background>
      <Wrapper>
        <CartList {...props} />
        <Wishlist {...props} />
      </Wrapper>
      <Checkout {...props} />
    </Background>
  )
}

export default CartPage;