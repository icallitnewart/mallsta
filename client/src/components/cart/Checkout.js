import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { placeOrder } from '../../_actions/order_action';

import { CgSpinner } from "react-icons/cg";
import { Container } from "../../styles/common/LayoutStyle";
import { ShippingBox, PriceBox, ErrMsg, OrderButton } from "../../styles/cart/CartStyle";

function Checkout({ auth, cartItems }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initPrice = {
    dollar : null,
    won : null
  };
  const [ price, setPrice ] = useState(initPrice);
  const [ isLoading, setIsLoading ] = useState(false);

  //에러 메시지 출력
  const errMsg = (type)=> {
    const message = `You have not entered this information yet. Please update your ${type} by clicking on the "Change" button at the top-right corner.`;
    return <ErrMsg>{message}</ErrMsg>;
  };
  
  //총 가격 계산
  const calculateTotal = ()=> {
    let dollarTotal = 0;
    let wonTotal = 0;
    cartItems.forEach(item=> {
      if(item.product.price.currency === "won") {
        wonTotal += item.product.price.amount * item.quantity;
      }
      if(item.product.price.currency === "dollar") {
        dollarTotal += item.product.price.amount * item.quantity;
      }
    });

    const totalPrice = { 
      dollar : (dollarTotal === 0) ? null : dollarTotal,
      won : (wonTotal === 0) ? null : wonTotal 
    };
    return totalPrice;
  };

  //주문 정보 에러 확인
  const checkErr = ()=> {
    let errMsg = "";
    if(cartItems.length === 0) {
      errMsg = "Your cart is empty!";
      return errMsg;
    } 

    if(!auth.username || !auth.phone || !auth.email || !auth.address[0]) {
      errMsg = "Please check your shipping details and make sure all fields are filled.";
      return errMsg;
    }
  };

  //상품 주문
  const submitOrder = ()=> {
    //주문 정보 에러 확인
    const errMsg = checkErr();
    if(errMsg) return alert(errMsg);

    //확인창 띄우기
    const productTitles = cartItems.map(item=> {
      const title = "- " + item.product.title;
      const quantity = ` (${item.quantity}EA)`;
      const breakLine = "\n      ";
      return title + quantity + breakLine;
    });
    const totalPrice = ()=> {
      let str = "";
      let dollar = "";
      let won = "";
      if(price.dollar) dollar = "$" + price.dollar; 
      if(price.won) won = "₩" + price.won;
      if(dollar && won) {
        str = `${dollar} + ${won}`;
      } else {
        if(dollar) str = dollar;
        if(won) str = won;
      }
      return str;
    };
    const msg = `
      [ Your Order List ]
      ${productTitles.join("")}
      Total Price: ${totalPrice()}
      Are you sure you want to purchase these items?
    `;
    if(window.confirm(msg)) {
      setIsLoading(true);

      const body = {
        cartItems,
        totalPrice : price
      };

      dispatch(placeOrder(body))
      .then(response=> {
        const data = response.payload;
  
        if(data.success) {
          setIsLoading(false);

          const timer = setTimeout(()=> {
            alert("Order Successful!");
            navigate(`/${auth.username}/shopping/order`);
          }, 100);
          return ()=> clearTimeout(timer);
        } else {
          setIsLoading(false);

          const timer = setTimeout(()=> {
            console.error(data.err);
            alert("An error occured. Please try again");
          }, 100);
          return ()=> clearTimeout(timer);
        }
      });
    };
  };

  useEffect(()=> {
    if(cartItems.length > 0) {
      setPrice(calculateTotal());
    } else {
      setPrice(initPrice);
    }
  }, [cartItems]);

  return (
    <Container
      style={{ padding: "30px" }}
    >
      <ShippingBox>
        <h5>
          Shipping Details
          <Link to="/account/profile">
            Change
          </Link>
        </h5>
        <table>
          <tbody>
            <tr>
              <th>NAME</th>
              <td>{auth && auth.username}</td>
            </tr>
            <tr>
              <th>CONTACT</th>
              <td>
                {auth && (
                  !auth.phone ? errMsg("contact number") : auth.phone
                )}
              </td>
            </tr>
            <tr>
              <th>EMAIL</th>
              <td>{auth && auth.email}</td>
            </tr>
            <tr>
              <th>ADDRESS</th>
              <td>
                {auth && (
                  (!auth.address[0] && !auth.address[1]) 
                  ? errMsg("shipping address") 
                  : <>
                    <p>{auth.address[0]}</p>
                    <p>{auth.address[1]}</p>
                    </>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </ShippingBox>
      <PriceBox>
        <p>Total Price</p>
        {price.dollar && 
          <span>${price.dollar}</span>
        }
        {price.won && 
          <span>₩{price.won}</span>
        }
        {(!price.dollar && !price.won) && 
          <span>$0</span>
        }
        <OrderButton
          type="button"
          onClick={submitOrder}
          isLoading={isLoading}
          disabled={isLoading}
        >
          {isLoading ? <CgSpinner /> : "Place Order"}
        </OrderButton>
      </PriceBox>
    </Container>
  )
}

export default Checkout;