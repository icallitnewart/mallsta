import React, { useEffect, useState } from 'react';

import { Background, Container } from "../../styles/shopping/PopupStyle";

import PostUpload from './PostUpload';

function Popup({ authUser, productId, setIsUpload }) {
  useEffect(()=> {
    document.body.style.overflow = "hidden";

    return ()=> {
      document.body.style.overflow = "auto";
    }
  }, []);

  return (
    <Background>
      <Container>
      {(!productId) && 
        <PostUpload  
          authUser={authUser}
          setIsUpload={setIsUpload}
        />
      }
      </Container>
    </Background>
  )
}

export default Popup;