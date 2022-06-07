import React, { useCallback, useState } from 'react';

function useInputs(initialValue) {
	const [ values, setValues ] = useState(initialValue);

	const handleChange = useCallback((e)=> {
		const { name, value } = e.target;
		setValues({ ...values, [name] : value });
	}, [values]);


	return [ values, handleChange ];
}

export default useInputs;