import React, { useState } from 'react';

import { Container, ProductBox, PostButton } from "../../styles/account/StoreStyle";
import { Table, Tr, Button } from "../../styles/account/FormStyle";

function StoreForm({ user, isSeller }) {
  const category = [ "fashion", "beauty", "food", "furniture", "toys", "electronics", "stationery", "etc" ];

  return (
    <Container isSeller={isSeller}>
      <form>
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
                  placeholder="Store Name"
                  name="name"
                  //values={values && values.name}
                  //onChange={handleChange}
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
                  //values={values && values.desc}
                  //onChange={handleChange}
                ></textarea>
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
                      //onChange={handleCheckBox}
                      //checked={checkBox.category.includes(item) && "checked"}
                    /> 
                    {(itemName === "Etc") 
                    ? `${itemName}.` : itemName}
                  </label>
                )})}
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
  )
}

export default StoreForm;