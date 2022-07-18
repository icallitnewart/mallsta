import React, { useEffect } from 'react';

import { Background, Container } from "../../../styles/shopping/PopupStyle";

import PostUpload from './PostUpload';

function Popup(props) {
  useEffect(()=> {
    document.body.style.overflow = "hidden";

    return ()=> {
      document.body.style.overflow = "auto";
    }
  }, []);

  return (
    <Background>
      <Container>
        <PostUpload {...props} />
      </Container>
    </Background>
  )
}

export default Popup;