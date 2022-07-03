import React from 'react';

import { Content, Item, TextBox, PostButton } from "../../styles/shopping/ContentStyle";

import Filter from './Filter';


function OrderSection() {
  const arr = Array.from(Array(30).keys());
  return (
    <>
    <Filter />
    <Content section="order">
      <h1>Payment Receipt</h1>
      {arr.map((item, index)=>
        <Item key={index}> 
          <img src={process.env.PUBLIC_URL + "/img/profile_image_default.jpg"} />
          <TextBox>
            <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h2>
            <h3>
              <span>Order Number</span> 
              <span>342352366</span>
            </h3>
            <h3>
              <span>Price</span> 
              <span>$300</span>
            </h3>
            <h3>
              <span>Quantity</span> 
              <span>2 EA</span>
            </h3>
            <h3>
              <span>Date</span> 
              <span>2022.04.03</span>
            </h3>
            <h3>
              <span>Payment</span> 
              <span>$600</span>
            </h3>
          </TextBox>
          <PostButton
            bgColor="#ff9966"
            wd="130px"
            ht="35px"
            style={{
              margin: "10px 25px 0px auto"
            }}
          >
            WRITE A REVIEW
          </PostButton>
        </Item>
      )}
    </Content>
    </>
  )
}

export default OrderSection;