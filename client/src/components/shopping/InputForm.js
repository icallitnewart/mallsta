import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { USER_DEFAULT_PROFILE_IMAGE as DEFAULT_PROFILE } from '../../data/userData';
import { 
  PRODUCT_TAG_COLORS as TAGCOLORS, 
  PRODUCT_CATEGORY as CATEGORY
} from '../../data/productData';

import { GrClose } from "react-icons/gr";
import { DetailBox, StoreTitle, Pic, InputBox, EnterButton, TagBox, Tag, ErrMsg } from "../../styles/shopping/PopupStyle";

function InputForm({ 
  auth, values, setValues, handleChange, err 
}) {
  const PUBLIC_URL = process.env.PUBLIC_URL;
  const tagBox = useRef(null);
  const userInfo = auth;
  const storeInfo = auth.store;
  const [ tagValue, setTagValue ] = useState("");

  //태그 입력
  const enterTag = ()=> {
    const newVal = { ...values };

    if(tagValue) {
      values.tags.push(tagValue);
      setValues(newVal);
      setTagValue("");
    } else {
      alert("Please type something to add a tag.");
    }
  };

  //category1 선택 후 select 타입의 category2 생성
  const renderCategorySelect = ()=> {
    return (
      <select 
        name="category2" 
        id="category2" 
        value={values.category2}
        onChange={handleChange}
      >
        <option value="">-Product Type-</option>
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

  //태그 입력 후 스크롤 처리
  useEffect(()=> {
    if(values.tags.length > 0) {
      tagBox.current.scroll({
        top: tagBox.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [values]);

  //category1 변경시 category2 초기화
  useEffect(()=> {
    setValues({ ...values, category2 : "" });
  }, [values.category1]);

  return (
    <DetailBox>
      <StoreTitle>
        <Pic>
          <img 
            src={
              userInfo.profileImage
              ? (PUBLIC_URL + userInfo.profileImage)
              : (PUBLIC_URL + DEFAULT_PROFILE)
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
                {err.title && 
                  <ErrMsg>
                    <span>{err.title}</span>
                  </ErrMsg>
                }
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
                  <option value="">-Department-</option>
                  {storeInfo.category.map((item)=> {
                    const category = CATEGORY.filter((el)=> el.department.toLowerCase() === item)[0];

                    return (
                      <option 
                        value={category._id} 
                        key={category._id}
                      >
                        {category.department}
                      </option>
                    )
                  })}
                </select>
                {(parseInt(values.category1) === 8)
                  ? <input 
                      type="text" 
                      name="category2" 
                      id="category2" 
                      placeholder="Product Type"
                      value={values.category2}
                      onChange={handleChange}
                    />
                  : renderCategorySelect()
                }
                {err.category && 
                  <ErrMsg>
                    <span>{err.category}</span>
                  </ErrMsg>
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
                  min="0"
                  onChange={handleChange}
                  onKeyDown={(e)=> {
                    if(e.key==="e" || e.key==="+" || e.key==="-") e.preventDefault();
                  }}
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
                {err.price && 
                  <ErrMsg>
                    <span>{err.price}</span>
                  </ErrMsg>
                }
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="desc">
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
                {err.desc && 
                  <ErrMsg>
                    <span>{err.desc}</span>
                  </ErrMsg>
                }
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
                  value={tagValue}
                  onChange={(e)=> setTagValue(e.target.value.trim())}
                  onKeyDown={(e)=> {
                    if(e.key==="Enter") enterTag();
                  }}
                />
                <EnterButton 
                  type="button"
                  name="tags"
                  onClick={enterTag}
                >
                  ENTER
                </EnterButton>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <TagBox ref={tagBox}>
                  {values.tags.map((tag, index)=> 
                    <Tag 
                      key={index} 
                      tagColor={
                        (index >= TAGCOLORS.length) 
                        ? TAGCOLORS[index % TAGCOLORS.length] 
                        : TAGCOLORS[index]
                      }
                    >
                      {tag} 
                      <GrClose onClick={()=> {
                        //태그 삭제 기능
                        const newArr = values.tags.filter((tag, idx)=> idx !== index);
                        setValues({ ...values, tags : newArr });
                      }} />
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

export default React.memo(InputForm);