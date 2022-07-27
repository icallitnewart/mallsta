import React from 'react';

import { Background } from "../styles/common/LayoutStyle";
import { Wrapper } from '../styles/cart/CartStyle';

import CartList from '../components/cart/CartList';
import Wishlist from '../components/cart/Wishlist';
import Checkout from '../components/cart/Checkout';

function CartPage() {
  return (
    <Background>
      <Wrapper>
        <CartList />
        <Wishlist />
      </Wrapper>
      <Checkout />
    </Background>
  )
}

export default CartPage;