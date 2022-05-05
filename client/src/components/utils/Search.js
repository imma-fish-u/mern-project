import React, { useState } from 'react';
import MediaQuery from 'react-responsive';
import DropDown from '../utils/Dropdown';
import Button from './Button';;

const Search = () => {
  const [isOpenSearchBar, setIsOpenSearchBar] = useState(false);

  return (
    <>
    <MediaQuery minWidth="1100px">
      <div className="search">
        <input
            className="search__input"
            type="text"
            placeholder="Keyword..."
        />
        <Button
            className="search__button"
            onClick={() => {
            }}>
            Search
        </Button>
      </div>
    </MediaQuery>
    <MediaQuery maxWidth="1099px">
      <div className="search__responsive">
          <Button
              className="search__responsive__button"
              onClick={() => setIsOpenSearchBar(true)}>
              Search
          </Button>
          <DropDown
              left="-170px"
              top="46px"
              isOpen={isOpenSearchBar}
              setIsOpen={setIsOpenSearchBar}>
              <div className="search__responsive__dropdown__wrapper">
                  <input
                      className={`search__responsive__dropdown__wrapper__input `}
                      type="text"
                      placeholder="Keyword..."
                  />
              </div>
          </DropDown>
      </div>
    </MediaQuery>
    </>
  );
};

export default Search;