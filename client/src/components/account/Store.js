import React, { useEffect, useState } from 'react';

import StoreOpen from './StoreOpen';
import StoreForm from './StoreForm';

function Store({ user }) {
  const [ openStore, setOpenStore ] = useState(true);

  //스토어 판매자 여부 확인
  useEffect(()=> {
    if(user) setOpenStore(user.storeOwner);
  }, [user]);

  return (
    <>    
    {!openStore 
    ? <StoreOpen 
        openStore={openStore}
        setOpenStore={setOpenStore}
      />
    : <StoreForm 
        user={user}
        openStore={openStore}
      />
    }
    </>
  )
}

export default Store;