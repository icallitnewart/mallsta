import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

import { Background, Container } from "../styles/shopping/PopupStyle";

import PostUpload from '../components/shopping/store/PostUpload';
import PostView from '../components/shopping/store/PostView';

function ProductPage() {
  const props = useOutletContext();

  useEffect(()=> {
    document.body.style.overflow = "hidden";

    return ()=> {
      document.body.style.overflow = "auto";
    }
  }, []);

  return (
    <Background>
      <Container>
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

export default ProductPage;