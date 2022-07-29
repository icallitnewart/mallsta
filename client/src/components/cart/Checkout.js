import React from 'react';
import { Link } from 'react-router-dom';

import { Container } from "../../styles/common/LayoutStyle";
import { ShippingBox, PriceBox, ErrMsg } from "../../styles/cart/CartStyle";

function Checkout({ auth, cartItems }) {
  const errMsg = (type)=> {
    const message = `You have not entered this information yet. Please update your ${type} by clicking on the "Change" button at the top-right corner.`;

    return (
      <ErrMsg>{message}</ErrMsg>
    )
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

    return [ 
      dollarTotal !== 0 && dollarTotal, 
      wonTotal !== 0 && wonTotal 
    ];
  };

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
        {calculateTotal()[0] && 
          <span>
            ${calculateTotal()[0]}
          </span>
        }
        {calculateTotal()[1] && 
          <span>
            ₩{calculateTotal()[1]}
          </span>
        }
        {!calculateTotal()[0] && !calculateTotal()[1] && 
          <span>$0</span>
        }
        <button>Place Order</button>
      </PriceBox>
    </Container>
  )
}

export default Checkout;