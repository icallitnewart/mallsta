import React, { useState } from 'react';

import { Background, Container } from "../../styles/shopping/PopupStyle";

import PostUpload from './PostUpload';

function Popup({ username, productId, setIsUpload }) {

  return (
    <Background>
      <Container>
      {(!productId) && 
        <PostUpload  
          setIsUpload={setIsUpload}
        />
      }
      </Container>
    </Background>
  )
}

export default Popup;