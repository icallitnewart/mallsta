import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

import StoreOpen from '../components/account/store/StoreOpen';
import StoreForm from '../components/account/store/StoreForm';

function EditStorePage() {
  const { user } = useOutletContext();
  const [ openStore, setOpenStore ] = useState(true);

  //스토어 판매자 여부 확인
  useEffect(()=> {
    if(user) setOpenStore(user.storeOwner);
  }, [user]);

  return (
    <React.Fragment>    
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
    </React.Fragment>
  )
}

export default EditStorePage;