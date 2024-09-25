import { Input } from 'antd';

const { Search } = Input;

const SearchInput = ({ placeholder, onSearch, style }) => (
  <Search placeholder={placeholder} onSearch={onSearch} style={{ border: 'none', ...style }} />
);

export default SearchInput;
