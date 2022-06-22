import React from 'react';
import { Link } from 'react-router-dom';

import { GrClose } from "react-icons/gr";
import { DetailBox, StoreTitle, Pic, InputBox, EnterButton, TagBox, Tag, ButtonBox, Button } from "../../styles/shopping/PopupStyle";

function InputForm() {
  const styles = [
    "Vintage", "Artsy", "Casual", "Urban", "Street", "Chic", "Bohemian", "Trendy", "Elegant", "Punk", "Gothic", "Classic"
  ];
  const colors = [
    "darksalmon", "darkcyan", "darkgoldenrod", "darkolivegreen", "darkmagenta", "darkslateblue"
  ];

  return (
    <DetailBox>
      <StoreTitle>
        <Pic>
          <img 
            src={`${process.env.PUBLIC_URL}/img/profile_image_default.jpg`} 
            alt="Profile Image" 
          />
        </Pic>
        <h1>
          <Link to="/">Jane's Accessory</Link>
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
                >
                  <option value="">Department</option>
                </select>
                <select 
                  name="category2" 
                  id="category2" 
                >
                  <option value="">Product Type</option>
                </select>
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
                />
                <select name="currency" id="currency">
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
                  name="" 
                  id="" 
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
                      (index >= colors.length) 
                      ? colors[index-colors.length] 
                      : colors[index]
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