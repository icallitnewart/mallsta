import React, { useEffect, useState } from 'react';
import { useParams, useOutletContext, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getStoreInfo } from "../_actions/store_action";

import { BsSuitHeart, BsSuitHeartFill, BsShop, BsBoxSeam } from "react-icons/bs";
import { ImSpinner3 } from "react-icons/im";
import { Alert, Content, Item, Detail, TextBox, PostButton } from "../styles/shopping/ContentStyle";

import Filter from '../components/shopping/Filter';
import Popup from '../components/shopping/store/Popup';

function StorePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const store = useSelector(state=> state.store);
  const { productId, username } = useParams();
  const { auth, isPageOwner, userInfo } = useOutletContext(); 

  const [ products, setProducts ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ isLiked, setIsLiked ] = useState({});
  const [ isUpload, setIsUpload ] = useState(false);
  const [ isEdit, setIsEdit ] = useState(false);
  const props = {
    productId, username, 
    auth, isPageOwner, userInfo,
    isUpload, setIsUpload, isEdit, setIsEdit
  };

  //데이터 호출
  useEffect(()=> {
    if(userInfo.storeOwner) {
      const isDataStored = Object.keys(store).length > 0;

      if(isDataStored) {
        const storeInfo = store.storeInfo.storeInfo;
        setProducts(storeInfo.product);
        setIsLoading(false);
      } else {
        const body = { storeId : userInfo.store._id };
        dispatch(getStoreInfo(body))
        .then(response=> {
          const data = response.payload;

          if(data.success) {
            setProducts(data.storeInfo.product);
          } else {
            console.error(data.err);
          }
          setIsLoading(false);
        })
      }
    }
  }, [userInfo]);

  //찜하기 버튼
  const likeItem = (index)=> {
    setIsLiked(prev=> (
      { ...prev, [index] : !prev[index] }
    ));
  };

  const renderAlert = (type)=> {
    if(type==="loading") {
      return (
        <Alert isLoading={isLoading}>
          <ImSpinner3 />
        </Alert>
      )
    }
    if(type==="store") {
      return (
        <Alert>
          <BsShop />
          <h1>You have not opened your store yet. <br/> Start selling now!</h1>
          <Link to="/account/store">Open Store</Link>
        </Alert>
      )
    }
    if(type==="product") {
      return (
        <Alert>
          <BsBoxSeam />
          <p style={{ marginTop: "0px" }}>No Product</p>
        </Alert>  
      )
    }
  };

  return (
    <React.Fragment>
    {(isPageOwner && !auth.storeOwner)
    //스토어를 열지 않은 경우 알림 문구 출력 (페이지 소유주)
    ? renderAlert("store")
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
        ? renderAlert("loading")
        : ((products.length === 0)
          //상품이 없는 경우 알림 문구 출력
          ? renderAlert("product")
          : products.map((item, index)=>
            <Item 
              key={index}
              onClick={()=> {
                navigate(`/${username}/shopping/product/${item.index}`);
              }}
            > 
              <img src={process.env.PUBLIC_URL + item.images[0].file.filePath} />
              <Detail>
                <TextBox>
                  <h2>{item.title}</h2>
                  <span>
                    {item.price.currency === "dollar" ? "$" : "₩"}
                    {item.price.amount}  
                  </span>
                </TextBox>
                {isLiked[item.index]
                ?  <BsSuitHeartFill
                    onClick={()=> likeItem(item.index)}
                  />
                : <BsSuitHeart
                    onClick={()=> likeItem(item.index)}
                  />
                }
              </Detail>
            </Item>
          )
        )}
      </Content>

      {/* 팝업창 : 상품 업로드 / 상품 상세보기 */}
      {(isUpload || productId) && <Popup {...props} />}
      </>
    }
    </React.Fragment>
  )
}

export default StorePage;