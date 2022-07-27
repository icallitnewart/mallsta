import React from 'react';

import { BsCart3 } from "react-icons/bs";
import { Container, Title2, LikeList, LikeItem, DetailBox } from "../../styles/cart/CartStyle";

function Wishlist() {
  return (
    <Container 
      wd={"calc(20% - 15px)"}
      padd={"20px 25px"}
    >
      <Title2>
        Wishlist
      </Title2>
      <LikeList
        cartItems={3}
      >
        <LikeItem>
          <img src="/img/profile_image_default.jpg" alt="" />
          <button
            type="button"
            aria-label="Add to cart"
          >
            <BsCart3 />
          </button>
          <DetailBox>
            <h4>Lorem ipsum dolor sit</h4>
          </DetailBox>
        </LikeItem>
      </LikeList>
    </Container>
  )
}

export default Wishlist;