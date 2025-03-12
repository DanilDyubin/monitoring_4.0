import { useState } from 'react';
// import { VscClose } from 'react-icons/vsc';
// import { FiSliders } from 'react-icons/fi';
import Button from '../../ui/button/Button';

import s from './searchForm.module.scss';
import Input from '../../ui/input/Input';

const SearchForm = () => {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const handleInputClear = () => {
    setValue('');
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <Input
        value={value}
        placeholder="Поиск объектов ОКС по наименованию, адресу, УИН"
        size="small"
        onChange={handleInputChange}
        onClick={handleInputClear}
      />
      <Button title="Найти" variant="primary" size="auto" type="submit" />
    </form>
  );
};

export default SearchForm;
