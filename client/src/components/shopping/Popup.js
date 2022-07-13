import React, { useEffect } from 'react';

import { Background, Container } from "../../styles/shopping/PopupStyle";

import PostUpload from './PostUpload';
import PostView from './PostView';

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
      {props.isUpload && 
        <PostUpload {...props} />
      }
      {props.productId &&
        (props.isEdit
          ? <PostUpload {...props} />
          : <PostView {...props} />
        )
      }
      </Container>
    </Background>
  )
}

export default Popup;