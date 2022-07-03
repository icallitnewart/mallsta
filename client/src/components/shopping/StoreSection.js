import React, { useState } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';

import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { Content, Item, Detail, TextBox, PostButton } from "../../styles/shopping/ContentStyle";

import Filter from './Filter';
import Popup from './Popup';

function StoreSection() {
  const { productId, username } = useParams();
  const [ authUser ] = useOutletContext(); 

  const arr = Array.from(Array(30).keys());
  const [ isLiked, setIsLiked ] = useState({});
  const [ isUpload, setIsUpload ] = useState(false);

  //찜하기 버튼
  const likeItem = (index)=> {
    setIsLiked(prev=> (
      { ...prev, [index] : !prev[index] }
    ));
  };

  const renderButton = ()=> {
    return (
      <PostButton
        type="button"
        bgColor="#ff5e62"
        wd="120px"
        ht="42px"
        style={{ 
          position: "absolute",
          top: "40px", right: "30px" 
        }}
        onClick={()=> setIsUpload(true)}
      >  
        UPLOAD
      </PostButton>
    )
  };

  return (
    <>
    <Filter />
    <Content section="store">
      <h1>Recent</h1>
      
      {/* UploadButton */}
      {authUser.userData && renderButton()}

      {/* Post List */}
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

    {/* Popup : Upload product / Product post */}
    {(isUpload || productId) && 
      <Popup 
        authUser={authUser}
        productId={productId}
        setIsUpload={setIsUpload}
        username={username}
      />
    }
    </>
  )
}

export default StoreSection;