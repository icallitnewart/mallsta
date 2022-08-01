import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAlert from '../../../hooks/useAlert';

import { BsPencilSquare } from "react-icons/bs";
import { Item, TextBox, PostButton } from "../../../styles/shopping/ContentStyle";

function OrderList({ orders, isLoading }) {
  const navigate = useNavigate();
  const { renderAlert } = useAlert(isLoading);

  return (
    <React.Fragment>
    {isLoading && renderAlert("notify", "loading")}
    {!isLoading &&
    (orders.length === 0) 
    ? renderAlert("empty", "order")
    : orders.map((order, index)=>
      <Item key={index}> 
        <img 
          src={process.env.PUBLIC_URL + order.image} 
          onClick={()=> navigate(order.url)}
        />
        <TextBox>
          <h2>
            <Link to={order.url}>{order.title}</Link>
          </h2>
          <h3>
            <span>Order Number</span> 
            <span>{order.orderNumber}</span>
          </h3>
          <h3>
            <span>Price</span> 
            <span>
              {order.price.currency === "dollar" ? "$" : "₩"}
              {order.price.amount}
            </span>
          </h3>
          <h3>
            <span>Quantity</span> 
            <span>{order.quantity} EA</span>
          </h3>
          <h3>
            <span>Date</span> 
            <span>{order.date}</span>
          </h3>
          <h3>
            <span>Payment</span> 
            <span>
              {order.price.currency === "dollar" ? "$" : "₩"}
              {order.price.amount * order.quantity}
            </span>
          </h3>
        </TextBox>
        <PostButton
          type="button"
          onClick={()=> navigate(order.url)}
          bgColor="#ff9966"
        >
          REVIEW <BsPencilSquare />
        </PostButton>
      </Item>
    )}
    </React.Fragment>
  )
}

export default OrderList;