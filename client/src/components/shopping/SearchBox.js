import React from 'react';
import useInputs from '../../hooks/useInputs';
import { FiSearch } from "react-icons/fi";import { Search } from "../../styles/shopping/AsideStyle";

function SearchBox() {
  const { values, handleChange } = useInputs({ search : "" });

  return (
    <Search>
      <form>
        <input 
          type="text" 
          name="search"
          id="search"
          value={values.search}
          onChange={handleChange}
          placeholder="Search . . ."
        />
        <button aria-label="search">
          <FiSearch />
        </button>
      </form>
    </Search>
  )
}

export default React.memo(SearchBox);