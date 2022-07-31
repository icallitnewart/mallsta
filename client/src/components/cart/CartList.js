import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCartUser, deleteCartUser } from '../../_actions/user_action';

import { HiMinus, HiPlus } from "react-icons/hi";
import { GrClose } from "react-icons/gr";
import { 
  Container, Title, 
  ItemList, CartItem, Pic, TextBox, 
  QuantityBox, QuantityController, Price, DeleteButton 
} from "../../styles/cart/CartStyle";

function CartList({ cartItems, setCartItems, renderAlert, isLoading }) {
  const dispatch = useDispatch();

  //장바구니 상품 수량 변경
  const changeQuantity = (product, num)=> {
    const body = {
      product,
      quantity : num
    };

    dispatch(addToCartUser(body))
    .then(response=> {
      const data = response.payload;
      if(data.success) {
        const newArr = [ ...cartItems ];
        newArr.forEach(item=> { 
          if(item.product._id === product._id) {
            item.quantity += num;
          }
        });
        setCartItems(newArr);
      } else {
        console.error(data.err);
      }
    });
  };

  //장바구니에서 상품 삭제
  const removeFromCart = (product)=> {
    const body = { product };

    dispatch(deleteCartUser(body))
    .then(response=> {
      const data = response.payload;
      
      if(data.success) {
        const removedItems = cartItems.filter(item=> item.product._id !== product._id);
        setCartItems(removedItems);
      } else {
        console.error(data.err);
      }
    });
  };

  return (
    <Container 
      wd={"calc(80% - 15px)"}
      padd={"40px 30px"}
    >
      <Title>CART ITEMS</Title>
      <ItemList>
        {isLoading 
        ? renderAlert("notify", "loading")
        : (cartItems.length === 0)
          ? renderAlert("empty", "item")
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
                      onClick={()=> removeFromCart(product)}
                    >
                      <GrClose />
                    </DeleteButton>
                    <QuantityController>
                      <button 
                        type="button"
                        aria-label="Decrease product quantity by one"
                        onClick={()=> changeQuantity(product, -1)}
                        disabled={item.quantity === 1}
                      >
                        <HiMinus />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        aria-label="Increase product quantity by one"
                        onClick={()=> changeQuantity(product, 1)}
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