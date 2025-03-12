import { useState } from 'react';

import Input from '../../ui/input/Input';

const SearchInput = () => {
  const [value, setValue] = useState('');

  const handleInputChange = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const handleInputClear = () => {
    setValue('');
  };
  return (
    <Input
      value={value}
      placeholder="Поиск объектов ОКС по наименованию, адресу, УИН"
      size="big"
      onChange={handleInputChange}
      onClick={handleInputClear}
    />
  );
};

export default SearchInput;
