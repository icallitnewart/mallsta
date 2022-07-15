import React, { useEffect, useState } from 'react';

function useSlider(data) {
  const [ activeIndex, setActiveIndex ] = useState(0);
  const [ animatedStyle, setAnimatedStyle ] = useState(0);

  useEffect(()=> {
    const itemLen = data.images.length;
    setAnimatedStyle((100/itemLen) * -activeIndex);
  }, [activeIndex]);

  return {
    activeIndex, 
    setActiveIndex,
    animatedStyle
  }
}

export default useSlider;