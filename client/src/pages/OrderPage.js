import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { orderListUser } from '../_actions/user_action';

import { Content } from "../styles/shopping/ContentStyle";

import Filter from '../components/shopping/Filter';
import OrderList from '../components/shopping/order/OrderList';

function OrderPage() {
  const dispatch = useDispatch();
  const [ orders, setOrders ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const props = { orders, isLoading };

  //주문 목록 데이터 호출
  useEffect(()=> {
    dispatch(orderListUser())
    .then(response=> {
      const data = response.payload;
      if(data.success) {
        const orderData = data.order;
        let orderItems = [];

        orderData.forEach(dataItem=> {
          const date = dataItem.date.split("T").join(" ").split(".")[0].replaceAll("-", ".");

          dataItem.orderList.forEach(order=> {
            const orderNumber = order.orderNumber;

            order.productList.forEach(productItem=> {
              const product = productItem.product;
              const orderInfo = {
                orderNumber,
                title : product.title,
                price : product.price,
                store : product.store,
                image : product.images[0].file.filePath,
                url : product.url,
                quantity : productItem.quantity,
                date
              };
              orderItems.push(orderInfo);
            });
          });
        });
        setOrders(orderItems);
        setIsLoading(false);
      }
    })
  }, []);

  return (
    <>
    <Filter />
    <Content section="order">
      <h1>Payment Receipt</h1>
      <OrderList { ...props } />
    </Content>
    </>
  )
}

export default OrderPage;