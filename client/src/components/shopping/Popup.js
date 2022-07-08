import React, { useEffect } from 'react';

import { Background, Container } from "../../styles/shopping/PopupStyle";

import PostUpload from './PostUpload';
import PostView from './PostView';

function Popup({ auth, productId, isUpload, setIsUpload, username }) {
  useEffect(()=> {
    document.body.style.overflow = "hidden";

    return ()=> {
      document.body.style.overflow = "auto";
    }
  }, []);

  return (
    <Background>
      <Container>
      {(isUpload) && 
        <PostUpload  
          auth={auth}
          setIsUpload={setIsUpload}
          username={username}
        />
      }
      {(productId) &&
        <PostView 
          auth={auth}
          username={username}
        />
      }
      </Container>
    </Background>
  )
}

export default Popup;