import React from 'react';

import { Content, Item, TextBox, Ratings } from "../../styles/shopping/ContentStyle";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

import Filter from './Filter';

function ReviewSection({ type }) {
  const arr = Array.from(Array(30).keys());

  return (
    <>
    <Filter />
    <Content section={type}>
      <h1>Reviews</h1>
      {arr.map((item, index)=>
        <Item key={index}> 
          <img src={process.env.PUBLIC_URL + "/img/profile_image_default.jpg"} />
          <TextBox>
            <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h2>
            <Ratings>
              <BsStarFill />
              <BsStarFill />
              <BsStarFill />
              <BsStarHalf />
              <BsStar />
            </Ratings>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio tempore sunt reprehenderit odit rerum hic saepe veritatis nobis minus quam?</p>
          </TextBox>
        </Item>
      )}
    </Content>
    </>
  )
}

export default ReviewSection;