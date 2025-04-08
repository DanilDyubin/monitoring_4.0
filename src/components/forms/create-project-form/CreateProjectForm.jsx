import { InputForm } from '../../../ui/input-form/InputForm';

import s from './createProjectForm.module.scss';

const CreateProjectForm = ({ formData, setFormData, handleSubmit }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className={s['create-project-form']}>
      <form id="createProjectForm" className={s.form} onSubmit={handleSubmit}>
        <div className={s.wrapper}>
          <InputForm
            placeholder="Наименование объекта"
            label="Наименование объекта *"
            name="uin"
            value={formData.uin}
            onChange={handleChange}
          />
          <InputForm
            placeholder="Количество этажей"
            label="Этажность *"
            name="floor_count"
            value={formData.floor_count}
            onChange={handleChange}
          />
        </div>
        <InputForm
          placeholder="Адрес объекта"
          label="Адрес объекта *"
          name="address"
          value={formData.address}
          onChange={handleChange}
          maxLength={250}
        />
        <div className={s.text}>* Обязательно к заполнению</div>
      </form>
    </div>
  );
};

export default CreateProjectForm;
