import React, { useEffect, useState } from 'react';

import StoreOpen from './StoreOpen';
import StoreForm from './StoreForm';

function Store({ user }) {
  const [ isSeller, setIsSeller ] = useState(true);

  //스토어 판매자 여부 확인
  useEffect(()=> {
    if(user) setIsSeller(user.storeOwner);
  }, [user]);

  return (
    <>    
    {!isSeller 
    ? <StoreOpen 
        isSeller={isSeller}
        setIsSeller={setIsSeller}
      />
    : <StoreForm 
        user={user}
        isSeller={isSeller}
      />
    }
    </>
  )
}

export default Store;