import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { wishlistUser } from '../_actions/user_action';

import { Content } from "../styles/shopping/ContentStyle";

import Filter from '../components/shopping/Filter';
import PostList from '../components/shopping/wishlist/PostList';

function WishlistPage() {
  const dispatch = useDispatch();
  const [ products, setProducts ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ likes, setLikes ] = useState(null);
  const { isPageOwner, userInfo, auth, username } = useOutletContext();
  const props = {
    auth, userInfo, username, isLoading, 
    products, setProducts, likes, setLikes
  };

  useEffect(()=> {
    if(userInfo && auth) {
      const store_id = userInfo.store._id;

      dispatch(wishlistUser(isPageOwner, store_id))
      .then(response=> {
        const data = response.payload;

        if(data.success) {
          const likedItems = data.wishlist.map((product)=> product.index);
          setLikes(likedItems);
          setProducts(data.wishlist);
          setIsLoading(false);
        } else {
          console.error(data.err);
          //TODO: alert 넣기
        }
      });
    }
  }, [userInfo, auth]);

  return (
    <React.Fragment>
      <Filter />
      <Content section="likes">
        <h1 style={{ textAlign : "right" }}>
          {isPageOwner ? "Wishlist" : `Your Likes In This Store`}
        </h1>
        <PostList {...props} />
      </Content>
    </React.Fragment>
  )
}

export default WishlistPage;