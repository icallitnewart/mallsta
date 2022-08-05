import React from 'react';
import { Link } from 'react-router-dom';

import { BsShop, BsBoxSeam, BsFillExclamationOctagonFill } from "react-icons/bs";
import { ImSpinner3 } from "react-icons/im";

import { Alert } from "../styles/shopping/ContentStyle";
import { ReviewAlert } from "../styles/shopping/PopupStyle";

function useAlert(isLoading) {
  const notify = {
    loading : 
      <Alert isLoading={isLoading}>
        <ImSpinner3 />
      </Alert>,
    loading2 :
      <ReviewAlert isLoading={isLoading}>
        <ImSpinner3 />
      </ReviewAlert>,
    store : 
      <Alert>
        <BsShop />
        <h1>
          You have not opened your store yet. <br/> 
          Start selling now!
        </h1>
        <Link to="/account/store">
          Open Store
        </Link>
      </Alert>,
    error : 
      <Alert>
        <BsFillExclamationOctagonFill />
        <p>An error occured.</p>
        <p>Please try again.</p>
      </Alert>,
    error2 : 
    <ReviewAlert>
      <BsFillExclamationOctagonFill />
      <p>An error occured.</p>
      <p>Please come back later.</p>
    </ReviewAlert>
  };

  const empty = {
    product : 
      <Alert>
        <BsBoxSeam />
        <p style={{ marginTop: "0px" }}>
          No Product
        </p>
      </Alert>,
    wishlist : 
      <Alert>
        <BsBoxSeam />
        <p style={{ marginTop: "0px" }}>
          No Items Added
        </p>
      </Alert>,
    item : 
      <Alert style={{ height: "400px" }}>
        <BsBoxSeam />
        <p style={{ marginTop: "0px" }}>
          No Items Added
        </p>
      </Alert>,
    order : 
      <Alert>
        <BsBoxSeam />
        <p style={{ marginTop: "0px" }}>
          No Items
        </p>
      </Alert>,
    review : 
      <ReviewAlert>
        No Review
      </ReviewAlert>
  };

  const unavailable = {
    shopping : 
      <Alert>
        <BsShop />
        <p>This store is not open</p>
      </Alert>,
    likes : 
      <Alert>
        <BsFillExclamationOctagonFill />
        <p>Service not available</p>
      </Alert>,
    reviews : 
      <Alert>
        <BsFillExclamationOctagonFill />
        <p>Service not available</p>
      </Alert>,
    order : 
      <Alert>
        <BsFillExclamationOctagonFill />
        <p>Service not available</p>
      </Alert>
  };

  const renderAlert = (category, type)=> {
    return eval(category)[type];
  };

  return { renderAlert }
}

export default useAlert;