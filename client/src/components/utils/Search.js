import React, { useState } from 'react';
import MediaQuery from 'react-responsive';
import DropDown from '../utils/Dropdown';
import Button from './Button';

const Search = ({ setSearchQuery }) => {
  const [isOpenSearchBar, setIsOpenSearchBar] = useState(false);
  const [inputData, setInputData] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') setSearchQuery(inputData);
  };

  return (
    <>
      <MediaQuery minWidth='1100px'>
        <div className='search'>
          <input
            className='search__input'
            type='text'
            placeholder='Keyword...'
            onChange={(e) => setInputData(e.target.value.toLowerCase())}
            onKeyDown={(e) => handleKeyDown(e)}
          />
          <Button
            className='search__button'
            onClick={() => {
              setSearchQuery(inputData);
            }}
          >
            Поиск
          </Button>
        </div>
      </MediaQuery>
      <MediaQuery maxWidth='1099px'>
        <div className='search__responsive'>
          <Button
            className='search__responsive__button'
            onClick={() => setIsOpenSearchBar(true)}
          >
            Поиск
          </Button>
          <DropDown
            left='-170px'
            top='46px'
            isOpen={isOpenSearchBar}
            setIsOpen={setIsOpenSearchBar}
          >
            <div className='search__responsive__dropdown__wrapper'>
              <input
                className={`search__responsive__dropdown__wrapper__input `}
                type='text'
                placeholder='Keyword...'
              />
            </div>
          </DropDown>
        </div>
      </MediaQuery>
    </>
  );
};

export default Search;
