import React, { useState } from 'react';

import SearchBox from './SearchBox';

import { AsideFilter, Container, Category, ToggleButton, Dropdown } from "../../styles/shopping/AsideStyle";

function Filter() {
  const init = {
    price : false,
    fashion : false
  };
  const [ isVisible, setIsVisible ] = useState(init);

  //카테고리 토글 버튼 조작
  const handleToggle = (e)=> {
    const { id } = e.currentTarget;
    setIsVisible(prev=> ({ ...prev, [id] : !prev[id] }));
  };

  return (
    <AsideFilter>
      <Container>
        <SearchBox />
        <h1>Filter</h1>
        <Category isActive={isVisible.price}>
          <ToggleButton 
            onClick={handleToggle}
            id="price"
          >Price</ToggleButton>
          <Dropdown>
            <li>
              <label htmlFor="price-all">
                <input 
                  type="checkbox" 
                  id="price-all"
                  name="price-all"
                />
                <span>All</span>
              </label>
            </li>
          </Dropdown>
        </Category>

        <h1>Category</h1>
        <Category isActive={isVisible.fashion}>
          <ToggleButton
            onClick={handleToggle}
            id="fashion"
          >Fashion</ToggleButton>
          <Dropdown>
            <li>
              <label htmlFor="fashion-all">
                <input 
                  type="radio" 
                  id="fashion-all"
                  value="fashion-all"
                  name="fashion"
                />
                <span>All</span>
              </label>
            </li>
            <li>
              <label htmlFor="fashion-top">
                <input 
                  type="radio" 
                  id="fashion-top"
                  value="fashion-top"
                  name="fashion"
                />
                <span>Top</span>
              </label>
            </li>
            <li>
              <label htmlFor="fashion-bottom">
                <input 
                  type="radio" 
                  id="fashion-bottom"
                  value="fashion-bottom"
                  name="fashion"
                />
                <span>Bottom</span>
              </label>
            </li>
            <li>
              <label htmlFor="fashion-outer">
                <input 
                  type="radio" 
                  id="fashion-outer"
                  value="fashion-outer"
                  name="fashion"
                />
                <span>Outer</span>
              </label>
            </li>
          </Dropdown>
        </Category>
      </Container>
    </AsideFilter>
  )
}

export default React.memo(Filter);