import React from 'react';
import { Link } from 'react-router-dom';

import { HiMinus, HiPlus } from "react-icons/hi";
import { GrClose } from "react-icons/gr";
import { 
  Container, Title, 
  ItemList, CartItem, Pic, TextBox, 
  QuantityBox, QuantityController, Price, DeleteButton 
} from "../../styles/cart/CartStyle";

function CartList() {
  return (
    <Container 
      wd={"calc(80% - 15px)"}
      padd={"40px 30px"}
    >
      <Title>CART ITEMS</Title>
      <ItemList>
        <CartItem>
          <Pic>
            <img src="/img/profile_image_default.jpg" alt="" />
          </Pic>
          <TextBox>
            <h2>
              <Link to="/">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, placeat.
              </Link>
            </h2>
            <p>Judy's Accessory Shop</p>
            <span>$300</span>
          </TextBox>
          <QuantityBox>
            <DeleteButton
              type="button"
              aria-label="Remove this item from cart"
            >
              <GrClose />
            </DeleteButton>
            <QuantityController>
              <button 
                type="button"
                aria-label="Decrease product quantity by one"
              >
                <HiMinus />
              </button>
              <span>1</span>
              <button
                type="button"
                aria-label="Increase product quantity by one"
              >
                <HiPlus />
              </button>
            </QuantityController>
            <Price>$300</Price>
          </QuantityBox>
        </CartItem>
      </ItemList>
    </Container>
  )
}

export default CartList;