import React from 'react';
import { useNavigate } from 'react-router-dom';

import { BsCart3 } from "react-icons/bs";
import { Container, Title2, LikeList, LikeItem, DetailBox } from "../../styles/cart/CartStyle";

function Wishlist({ 
  auth, isLoading, renderAlert, 
  cartItems, setCartItems, wishlist
}) {
  const navigate = useNavigate();

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
        : wishlist.map(item=>
            <LikeItem key={item.index}>
              <img 
                src={item.images[0].file.filePath} 
                alt={`A product image of ${item.title}`} 
              />
              <button
                type="button"
                aria-label="Add to cart"
              >
                <BsCart3 />
              </button>
              <DetailBox 
                onClick={()=> navigate(item.url)}
              >
                <h4>{item.title}</h4>
              </DetailBox>
            </LikeItem>
          )
        }
      </LikeList>
    </Container>
  )
}

export default Wishlist;