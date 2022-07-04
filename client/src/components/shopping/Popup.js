import React, { useEffect, useState } from 'react';

import { Background, Container } from "../../styles/shopping/PopupStyle";

import PostUpload from './PostUpload';

function Popup({ auth, productId, setIsUpload, username }) {
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
          auth={auth}
          setIsUpload={setIsUpload}
          username={username}
        />
      }
      </Container>
    </Background>
  )
}

export default Popup;