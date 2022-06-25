import React from 'react';
import { Link } from 'react-router-dom';

import { USER_DEFAULT_PROFILE_IMAGE } from '../../data/userData';
import { PRODUCT_TAG_COLORS, PRODUCT_CATEGORY } from '../../data/productData';

import { GrClose } from "react-icons/gr";
import { DetailBox, StoreTitle, Pic, InputBox, EnterButton, TagBox, Tag } from "../../styles/shopping/PopupStyle";
import useInputs from '../../hooks/useInputs';

function InputForm({ authUser }) {
  const PUBLIC_URL = process.env.PUBLIC_URL;
  const TAGCOLORS = PRODUCT_TAG_COLORS;
  const CATEGORY = PRODUCT_CATEGORY;
  const userInfo = authUser.userData;
  const storeInfo = authUser.userData.store;
  const initValue = {
    title : "",
    category1 : "",
    category2 : "",
    price : 0,
    currency : "dollar",
    desc : "",
    tags : []
  };
  const { values, handleChange } = useInputs(initValue);

  const styles = [
    "Vintage", "Artsy", "Casual", "Urban", "Street", "Chic", "Bohemian", "Trendy", "Elegant", "Punk", "Gothic", "Classic"
  ];

  const renderCategorySelect = ()=> {
    return (
      <select 
        name="category2" 
        id="category2" 
        value={values.category2}
        onChange={handleChange}
      >
        <option value="">--Product Type--</option>
        {(values.category1) && 
          CATEGORY.map((category, index)=> {
            if(category._id === parseInt(values.category1)) {
              return(
                <React.Fragment key={index}>
                {category.array.map((item)=> 
                  <option 
                    value={item._id}
                    key={item._id}
                  >
                    {item.type}
                  </option>  
                )}
                </React.Fragment>
              )
            }
          })
        }
      </select>
    )
  };

  return (
    <DetailBox>
      <StoreTitle>
        <Pic>
          <img 
            src={
              userInfo.profileImage
              ? (PUBLIC_URL + userInfo.profileImage)
              : (PUBLIC_URL + USER_DEFAULT_PROFILE_IMAGE)
            } 
            style={
              (!userInfo.profileImage) && 
              { filter: "brightness(1.3)" }
            }
            alt={`${userInfo.username}'s profile image`} 
          />
        </Pic>
        <h1>
          <Link to="/">{storeInfo.name}</Link>
        </h1>
      </StoreTitle>

      <InputBox>
        <table>
          <tbody>
            <tr>
              <th>
                <label htmlFor="title">
                  Title
                </label>
              </th>
              <td>
                <input 
                  type="text" 
                  name="title" 
                  id="title" 
                  value={values.title}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="category1">
                  Category
                </label>
              </th>
              <td>
                <select 
                  name="category1" 
                  id="category1" 
                  value={values.category1}
                  onChange={handleChange}
                >
                  <option value="">--Department--</option>
                  {storeInfo.category.map((item)=> {
                    const department = CATEGORY.filter((category)=> category.department.toLowerCase() === item)[0];

                    return (
                      <option 
                        value={department._id} 
                        key={department._id}
                      >
                        {department.department}
                      </option>
                    )
                  })}
                </select>
                {(parseInt(values.category1) === 8)
                  ? <input 
                      type="text" 
                      name="category2" 
                      id="category2" 
                      style={{ width: "calc(50% - 5px)" }}
                      placeholder="Product Type"
                      value={values.category2}
                      onChange={handleChange}
                    />
                  : renderCategorySelect()
                }
                
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="price">
                  Price
                </label>
              </th>
              <td>
                <input 
                  type="number" 
                  name="price" 
                  id="price" 
                  value={values.price}
                  onChange={handleChange}
                />
                <select 
                  name="currency" 
                  id="currency"
                  value={values.currency}
                  onChange={handleChange}
                >
                  <option value="dollar">$</option>
                  <option value="won">₩</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="">
                  Description
                </label>
              </th>
              <td>
                <textarea 
                  name="desc" 
                  id="desc" 
                  value={values.desc}
                  onChange={handleChange}
                ></textarea>
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="tags">
                  Tags
                </label>
              </th>
              <td>
                <input 
                  type="text" 
                  name="tags" 
                  id="tags" 
                />
                <EnterButton type="button">
                  ENTER
                </EnterButton>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
              <TagBox>
                {styles.map((style, index)=> 
                  <Tag 
                    key={index} 
                    tagColor={
                      (index >= TAGCOLORS.length) 
                      ? TAGCOLORS[index-TAGCOLORS.length] 
                      : TAGCOLORS[index]
                    }
                  >
                    {style} <GrClose />
                  </Tag>
                )}
              </TagBox>
              </td>
            </tr>
          </tbody>
        </table>
      </InputBox>
    </DetailBox>
  )
}

export default InputForm;