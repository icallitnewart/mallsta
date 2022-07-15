import React from 'react';
import { Container, P, StoreButton } from "../../../styles/account/StoreStyle";

function StoreOpen({ openStore, setOpenStore }) {
  return (
    <Container isSeller={openStore}>
      <P>You haven't opened your store yet.<br/> Would you like to open a store?</P>
      <StoreButton onClick={()=> setOpenStore(true)}>
        Open Store
      </StoreButton>
    </Container>
  )
}

export default StoreOpen;