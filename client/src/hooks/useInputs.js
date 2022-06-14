import React, { useCallback, useState } from 'react';

function useInputs(initialValue) {
  const [ values, setValues ] = useState(initialValue);

  const handleChange = useCallback((e)=> {
    const { name, value } = e.target;
    setValues({ ...values, [name] : value });
  }, [values]);

  const handleCheckBox = useCallback((e)=> {
    const { name, value } = e.target;
    const newVal = { ...values };

    if(e.target.checked) {
      newVal[name].push(value);
    } else {
      newVal[name] = newVal[name].filter(item=> item !== value);
    }
    setValues(newVal);
  }, [values]);

  return { 
    values, 
    setValues,
    handleChange, 
    handleCheckBox
  };
}

export default useInputs;