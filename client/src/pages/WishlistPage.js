import React, { useState } from 'react';

import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { Content, Item, Detail, TextBox } from "../styles/shopping/ContentStyle";
import Filter from '../components/shopping/Filter';

function WishlistPage() {
  const arr = Array.from(Array(30).keys());
  const [ isLiked, setIsLiked ] = useState({});
  //찜하기 버튼
  const likeItem = (index)=> {
    setIsLiked(prev=> (
      { ...prev, [index] : !prev[index] }
    ));
  };

  return (
    <>
    <Filter />
    <Content section="likes">
      <h1>Wishlist</h1>
      {arr.map((item, index)=>
        <Item key={index}> 
          <img src={process.env.PUBLIC_URL + "/img/profile_image_default.jpg"} />
          <Detail>
            <TextBox>
              <h2>Lorem ipsum dolor sit amet.</h2>
              <span>$300</span>
            </TextBox>
            {isLiked[index]
            ?  <BsSuitHeartFill
                onClick={()=> likeItem(index)}
                //index => item 고유 index로 변경 필요
              />
            : <BsSuitHeart
                onClick={()=> likeItem(index)}
                //index => item 고유 index로 변경 필요
              />
            }
          </Detail>
        </Item>
      )}
    </Content>
    </>
  )
}

export default WishlistPage;