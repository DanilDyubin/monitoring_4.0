import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { VscClose } from 'react-icons/vsc';
import { InputForm } from '../../ui/input-form/InputForm';
import Button from '../../ui/button/Button';
import { setOpenModal } from '../../redux/slices/projectSlice';

import s from './createProjectForm.module.scss';

const CreateProjectForm = () => {
  const [formData, setFormData] = useState({
    uin: '',
    address: '',
    info: '',
  });

  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(setOpenModal(false));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className={s['create-project-form']}>
      <VscClose className={s.icon} onClick={handleCloseModal} />
      <h2 className={s.title}>Создать новый проект</h2>
      <form className={s.form} onSubmit={onSubmit}>
        <span className={s.text}>Заполните поля формы заявления</span>
        <InputForm
          placeholder="Наименование объекта"
          label="Наименование объекта *"
          name="uin"
          value={formData.uin}
          onChange={handleChange}
        />
        <InputForm
          placeholder="Адрес объекта"
          label="Адрес объекта *"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
        <InputForm
          placeholder="Введите кол-во этажей"
          label="Этажность *"
          name="info"
          value={formData.info}
          onChange={handleChange}
        />
        <span className={s.text}>* Обязательно к заполнению</span>
        <Button title="Создать" size="medium" variant="primary" type="submit" />
      </form>
    </div>
  );
};

export default CreateProjectForm;
