import React from 'react';
import { Input } from 'antd';

const { Search } = Input;

const SearchInput = ({ placeholder, onSearch, style }) => (
  <Search
    placeholder={placeholder} // placeholder를 props로 받아 사용
    onSearch={onSearch} // onSearch를 props로 받아 사용
    style={{ border: 'none', ...style }} // 기본 스타일과 병합
  />
);

export default SearchInput;
