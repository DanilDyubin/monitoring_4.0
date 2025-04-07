// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { VscClose } from 'react-icons/vsc';
// import { InputForm } from '../../../ui/input-form/InputForm';
// import Button from '../../../ui/button/Button';
// import { setOpenModal } from '../../../redux/slices/projectSlice';
// import useApiService from '../../../service/useApiService';

// import s from './createProjectForm.module.scss';

// const CreateProjectForm = ({ onCloseModal }) => {
//   const [formData, setFormData] = useState({
//     uin: '',
//     address: '',
//     floor_count: '',
//   });

//   const { createProject } = useApiService();

//   // const dispatch = useDispatch();

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const onSubmit = (e) => {
//     e.preventDefault();
//     createProject(formData);
//   };

//   return (
//     <div className={s['create-project-form']}>
//       <VscClose className={s.icon} onClick={onCloseModal} />
//       <h2 className={s.title}>Создать новый проект</h2>
//       <form className={s.form} onSubmit={onSubmit}>
//         <span className={s.text}>Заполните поля формы заявления</span>
//         <InputForm
//           placeholder="Наименование объекта"
//           label="Наименование объекта *"
//           name="uin"
//           value={formData.uin}
//           onChange={handleChange}
//         />
//         <InputForm
//           placeholder="Адрес объекта"
//           label="Адрес объекта *"
//           name="address"
//           value={formData.address}
//           onChange={handleChange}
//         />
//         <InputForm
//           placeholder="Введите кол-во этажей"
//           label="Этажность *"
//           name="floor_count"
//           value={formData.floor_count}
//           onChange={handleChange}
//         />
//         <span className={s.text}>* Обязательно к заполнению</span>
//         <Button title="Создать" size="medium" variant="primary" type="submit" />
//       </form>
//     </div>
//   );
// };

// export default CreateProjectForm;

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
