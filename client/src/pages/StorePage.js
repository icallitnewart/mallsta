import React, { useEffect, useRef, useState } from 'react';
import { useParams, useOutletContext, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getStoreInfo } from "../_actions/store_action";
import useAlert from '../hooks/useAlert';

import { Content, PostButton } from "../styles/shopping/ContentStyle";

import Filter from '../components/shopping/Filter';
import Popup from '../components/shopping/store/Popup';
import PostList from '../components/shopping/store/PostList';

function StorePage() {
  const dispatch = useDispatch();
  const productData = useSelector(state=> state.product.productInfo);
  const isReloaded = useRef(true);
  const { productId, username } = useParams();
  const { auth, isPageOwner, userInfo } = useOutletContext(); 

  const [ products, setProducts ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ isUpload, setIsUpload ] = useState(false);
  const [ isEdit, setIsEdit ] = useState(false);
  const { renderAlert } = useAlert(isLoading);
  const props = {
    productId, username, 
    auth, isPageOwner, userInfo,
    isUpload, setIsUpload, isEdit, setIsEdit
  };

  //첫 로드시 데이터 호출
  useEffect(()=> {
    if(userInfo.storeOwner) {
      const body = { storeId : userInfo.store._id };
      dispatch(getStoreInfo(body))
      .then(response=> {
        const data = response.payload;

        if(data.success) {
          setProducts(data.storeInfo.product);
          isReloaded.current = false;
        } else {
          console.error(data.err);
        }
        setIsLoading(false);
      });
    }
  }, [userInfo]);

  //상품 팝업 페이지 접속 후 다시 상품 목록으로 이동시
  //모든 상품 목록 데이터를 재호출하지 않고
  //해당 상품 정보만 업데이트해서 보여주기
  //(위시리스트 추가와 같이 데이터의 변화가 있을 경우를 대비)
  useEffect(()=> {
    if(!isReloaded.current && productData) {
      const newProduct = productData.productInfo;
      const updatedList = [...products].map((product)=> {
        if(product.index === newProduct.index) {
          return newProduct;
        } else {
          return product;
        }
      });
      setProducts(updatedList);
    }
  }, [productData, isReloaded]);

  return (
    <React.Fragment>
    {(isPageOwner && !auth.storeOwner)
    //스토어를 열지 않은 경우 알림 문구 출력 (페이지 소유주)
    ? renderAlert("notify", "store")
    : <>
      <Filter />
      <Content section="store">
        <h1>New Items</h1>
        
        {/* 업로드 버튼 */}
        {isPageOwner && 
          <PostButton
            type="button"
            bgColor="#ff5e62"
            wd="120px"
            ht="42px"
            style={{ 
              position: "absolute",
              top: "40px", right: "30px" 
            }}
            onClick={()=> setIsUpload(true)}
          >  
            UPLOAD
          </PostButton>
        }

        {/* 상품 목록 */}
        {isLoading
        ? renderAlert("notify", "loading")
        : ((products.length === 0)
          //상품이 없는 경우 알림 문구 출력
          ? renderAlert("empty", "product")
          : <PostList {...{ ...props, products }} />
        )}
      </Content>

      {/* 팝업창 : 상품 상세보기 */}
      <Outlet context={{...props}} />
      {/* 팝업창 : 상품 업로드 */}
      {(isUpload) && <Popup {...props} />}
      </>
    }
    </React.Fragment>
  )
}

export default StorePage;