import React, { useEffect, useState } from 'react';
import { Container, P, StoreButton, ProductBox, PostButton } from "../../styles/account/StoreStyle";
import { Table, Tr, Button } from "../../styles/account/FormStyle";

function Store({ user }) {
  const [ isSeller, setIsSeller ] = useState(true);

  //스토어 판매자 여부 확인
  useEffect(()=> {
    if(user) setIsSeller(user.storeOwner);
  }, [user]);

  return (
    <>    
    {!isSeller 
    ? <Container isSeller={isSeller}>
        <P>You haven't opened your store yet.<br/> Would you like to open a store?</P>
        <StoreButton onClick={()=> setIsSeller(true)}>
          Open Store
        </StoreButton>
      </Container>
    : <Container isSeller={isSeller}>
        <form>
          <Table>
            <tbody>
              <Tr>
                <th>
                  <label htmlFor="storeName">
                    Store Name
                  </label>
                </th>
                <td>
                  <input 
                    type="text" 
                    id="storeName"
                    placeholder="Store Name"
                    name="storeName"
                  />
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
                  ></textarea>
                </td>
              </Tr>
              <Tr>
                <th>
                    Category
                </th>
                <td>
                  <label htmlFor="fashion">
                    <input 
                      type="checkbox" name="category" 
                      value="fashion"
                      id="fashion" 
                    /> Fashion
                  </label>
                  <label htmlFor="beauty">
                    <input 
                      type="checkbox" name="category" 
                      value="beauty"
                      id="beauty" 
                    /> Beauty
                  </label>
                  <label htmlFor="food">
                    <input 
                      type="checkbox" name="category" 
                      value="food"
                      id="food" 
                    /> Food
                  </label>
                  <label htmlFor="furniture">
                    <input 
                      type="checkbox" name="category" 
                      value="furniture"
                      id="furniture" 
                    /> Furniture
                  </label>
                  <label htmlFor="Toys">
                    <input 
                      type="checkbox" name="category" 
                      value="Toys"
                      id="Toys" 
                    /> Toys
                  </label>
                  <label htmlFor="electronics">
                    <input 
                      type="checkbox" name="category" 
                      value="electronics"
                      id="electronics" 
                    /> Electronics
                  </label>
                  <label htmlFor="stationery">
                    <input 
                      type="checkbox" name="category" 
                      value="stationery"
                      id="stationery" 
                    /> Stationery
                  </label>
                  <label htmlFor="etc">
                    <input 
                      type="checkbox" name="category" 
                      value="etc"
                      id="etc" 
                    /> Etc.
                  </label>
                </td>
              </Tr>
              {(user && user.storeOwner) &&
                <Tr>
                  <th>
                    Total Products
                  </th>
                  <td>
                    <ProductBox>
                      0
                      <PostButton to="/">
                        Post a product
                      </PostButton>
                    </ProductBox>
                  </td>
                </Tr>
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
    }
    </>
  )
}

export default Store;