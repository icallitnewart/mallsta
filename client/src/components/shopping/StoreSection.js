import React, { useState } from 'react';

import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { Content, Item, Detail, TextBox, PostButton } from "../../styles/shopping/ContentStyle";

import Filter from './Filter';

function StoreSection({ type }) {
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
    <Content section={type}>
      <h1>Recent</h1>
      <PostButton
        type="button"
        bgColor="#ff5e62"
        wd="140px"
        ht="42px"
        style={{ 
          position: "absolute",
          top: "40px", right: "30px" 
        }}
      >  
        NEW PRODUCT
      </PostButton>
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

export default StoreSection;