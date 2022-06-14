import React from 'react';
import { Container, P, StoreButton } from "../../styles/account/StoreStyle";

function StoreOpen({ isSeller, setIsSeller }) {
  return (
    <Container isSeller={isSeller}>
      <P>You haven't opened your store yet.<br/> Would you like to open a store?</P>
      <StoreButton onClick={()=> setIsSeller(true)}>
        Open Store
      </StoreButton>
    </Container>
  )
}

export default StoreOpen;