import React from 'react';
import { Link } from 'react-router-dom';

import { HiMinus, HiPlus } from "react-icons/hi";
import { GrClose } from "react-icons/gr";
import { 
  Container, Title, 
  ItemList, CartItem, Pic, TextBox, 
  QuantityBox, QuantityController, Price, DeleteButton 
} from "../../styles/cart/CartStyle";

function CartList({ cartItems, setCartItems, renderAlert, isLoading }) {
  return (
    <Container 
      wd={"calc(80% - 15px)"}
      padd={"40px 30px"}
    >
      <Title>CART ITEMS</Title>
      <ItemList>
        {isLoading 
        ? renderAlert("notify", "loading")
        : cartItems.map(item=> {
            const product = item.product;
            return (
              <CartItem key={product.index}>
                <Pic>
                  <Link to={product.url}>
                    <img 
                      src={product.images[0].file.filePath} 
                      alt={`A product image of ${product.title}`} 
                    />
                  </Link>
                </Pic>
                <TextBox>
                  <h2>
                    <Link to={product.url}>
                      {product.title}
                    </Link>
                  </h2>
                  <p>{product.store.name}</p>
                  <span>
                    {product.price.currency === "dollar" ? "$" : "₩"}
                    {product.price.amount}
                  </span>
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
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      aria-label="Increase product quantity by one"
                    >
                      <HiPlus />
                    </button>
                  </QuantityController>
                  <Price>
                    {product.price.currency === "dollar" ? "$" : "₩"}
                    {product.price.amount * item.quantity}
                  </Price>
                </QuantityBox>
              </CartItem>
            )
          })
        }
      </ItemList>
    </Container>
  )
}

export default CartList;