import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerStore, editStore } from '../../_actions/store_action';
import useInputs from '../../hooks/useInputs';
import { category } from "../../data/storeData";

import { Container, ProductBox, PostButton, Title } from "../../styles/account/StoreStyle";
import { Table, Tr, Button } from "../../styles/account/FormStyle";
import { ErrMsg } from "../../styles/account/ProfileStyle";

function StoreForm({ user, openStore }) {
  const dispatch = useDispatch();
  const initialValue = {
    name : "",
    desc : "",
    category : []
  };
  const { values, setValues, handleChange, handleCheckBox } = useInputs(initialValue);
  const [ storeInfo, setStoreInfo ] = useState(null);
  const [ err, setErr ] = useState({});


  //폼 유효성 검사 함수
  const checkForm = (body)=> {
    let messages = {};
    const { name, desc, category } = body;

    if(!name || name.length < 4) {
      messages.name =  "Requires 4 letters at minimum.";
    }

    if(!desc) {
      messages.desc =  "Please fill in the blank.";
    }
    if(category.length === 0) {
      messages.category = "Please select at least one category."
    }

    return messages;
  };

  const handleSubmit = (e)=> {
    e.preventDefault();

    let body = { ...values };
    const errors = (Object.keys(checkForm(body)).length > 0) && checkForm(body);

    //유효성 검사 통과 여부 확인
    if(errors) {
      return setErr(errors);
    } else {  //통과
      setErr({});

      //스토어를 열지 않은 경우 스토어 등록
      if(!user.storeOwner) {
        body = { ...values, owner : user._id };
  
        dispatch(registerStore(body))
        .then(response=> {
          const data = response.payload;
    
          if(data.success) {
            alert("Congratulations! Your store is open now.");
            window.location.replace("/account/store");
          } else {
            alert(data.err);
          }
        });
      } 
      //스토어가 이미 등록된 경우 정보 수정
      else {
        body = { ...values, _id : storeInfo._id };
        
        dispatch(editStore(body))
        .then(response=> {
          const data = response.payload;
          console.log(data);
          if(data.success) {
            alert("Your store details have successfully been updated!");
            window.location.replace("/account/store");
          } else {
            alert(data.err);
          }
        });
      }
    };

    }


  useEffect(()=> {
    //첫 로드시 스토어 정보 입력 
    //(이미 스토어가 등록되어있는 경우)
    if(user && user.storeOwner) {
        const { name, desc, category } = user.store;
        const dataValue = { ...initialValue };
        dataValue.name = name;
        dataValue.desc = desc;
        dataValue.category = category;

        setValues(dataValue);
        setStoreInfo(user.store);
    }
  }, [user]);

  return (
    <Container isSeller={openStore}>
      <Title>My Store</Title>
      <form onSubmit={handleSubmit}>
        <Table>
          <tbody>
            <Tr>
              <th>
                <label htmlFor="name">
                  Store Name
                </label>
              </th>
              <td>
                <input 
                  type="text" 
                  id="name"
                  placeholder="Store Name (over 4 letters)"
                  name="name"
                  value={values && values.name}
                  onChange={handleChange}
                />
                {err.name && <ErrMsg>{err.name}</ErrMsg>}
              </td>
            </Tr>
            <Tr>
              <th>
                <label htmlFor="desc">
                  Description
                </label>
              </th>
              <td>
                <textarea 
                  type="text" 
                  placeholder="Introduce Your Store"
                  id="desc"
                  name="desc"
                  value={values && values.desc}
                  onChange={handleChange}
                ></textarea>
                {err.desc && <ErrMsg>{err.desc}</ErrMsg>}
              </td>
            </Tr>
            <Tr>
              <th>
                  Category
              </th>
              <td>
                {category.map((item, index)=> {
                  const itemName = item.charAt(0).toUpperCase() + item.slice(1);
                  return (
                  <label 
                    key={index} 
                    htmlFor={item}
                  >
                    <input 
                      type="checkbox" 
                      name="category" 
                      value={item}
                      id={item} 
                      onChange={handleCheckBox}
                      checked={(values.category.includes(item)) && "checked"}
                    /> 
                    {(itemName === "Etc") 
                    ? `${itemName}.` : itemName}
                  </label>
                )})}
                {err.category && <ErrMsg>{err.category}</ErrMsg>}
              </td>
            </Tr>
            {(user && user.storeOwner) &&
              <>
              <Tr>
                <th>
                  Total Products
                </th>
                <td>
                  <ProductBox>
                    <span>
                      {storeInfo && storeInfo.productTotal}
                    </span>
                    <PostButton to="/">
                      Post a product
                    </PostButton>
                  </ProductBox>
                </td>
              </Tr>
              <Tr>
                <th>
                  Open Since
                </th>
                <td>
                  {storeInfo && storeInfo.createdAt.slice(0, 10)}
                </td>
              </Tr>
              </>
            }
            <Tr style={{ textAlign: "right" }}>
              <th colSpan={2} style={{ width: "100%" }}>
                <Button 
                  type="reset"
                  color={"#ff5e62"} 
                  bgColor={"#fff"}
                >Cancel</Button>
                <Button 
                  type="submit"
                  color={"#fff"} 
                  bgColor={"#ff5e62"}
                >
                  {(user && user.storeOwner) ? "Save" : "Open"}
                </Button>
              </th>
            </Tr>
          </tbody>
        </Table>
      </form>
    </Container>
  )
}

export default StoreForm;