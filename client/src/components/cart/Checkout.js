import React from 'react';
import { Link } from 'react-router-dom';

import { Container } from "../../styles/common/LayoutStyle";
import { ShippingBox, PriceBox, ErrMsg } from "../../styles/cart/CartStyle";

function Checkout() {
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
              <td>Jane Doe</td>
            </tr>
            <tr>
              <th>CONTACT</th>
              <td>01012341234</td>
            </tr>
            <tr>
              <th>EMAIL</th>
              <td>JaneDoe@mail.com</td>
            </tr>
            <tr>
              <th>ADDRESS</th>
              <td>
                <ErrMsg>
                  You have not entered this information yet. Please update your address by clicking on "change" button at the top-right corner.
                </ErrMsg>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing
                </p>  
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing
                </p>  
              </td>
            </tr>
          </tbody>
        </table>
      </ShippingBox>
      <PriceBox>
        <p>Total Price</p>
        <span>$3000</span>
        <button>Place Order</button>
      </PriceBox>
    </Container>
  )
}

export default Checkout;