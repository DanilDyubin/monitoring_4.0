// import { InputForm } from '../../ui/input-form/InputForm';

// import s from './projectForm.module.scss';

// const ProjectForm = () => {
//   const value =
//     'КОРПУСА N 6 В КВАРТАЛЕ N 57 ПО УЛИЦЕ ВАСИЛИСЫ КОЖИНОЙ ВО ВЛАДЕНИИ N 14 РАЙОНА ФИЛЕВСКИЙ ПАРК (ЗАПАДНЫЙ АДМИНИСТРАТИВНЫЙ ОКРУГ)';
//   const valueAddress = value.length > 106 ? value.slice(0, 106) + '...' : value;

//   return (
//     <div className={s['create-project-form']}>
//       <form className={s.form}>
//         <div className={s.wrapper}>
//           <InputForm
//             label="Наименование объекта"
//             name="name"
//             readOnly={true}
//             variant="readOnly"
//           />
//           <InputForm
//             label="Этажность"
//             name="floors"
//             readOnly={true}
//             variant="readOnly"
//           />
//         </div>
//         <InputForm
//           label="Адрес"
//           name="address"
//           readOnly={true}
//           value={valueAddress}
//           variant="readOnly"
//         />
//       </form>
//     </div>
//   );
// };

// export default ProjectForm;

import InformationItem from './information-item/InformationItem';
import s from './projectForm.module.scss';

const ProjectForm = ({ formData }) => {
  // const name = 'Наименование объекта';
  // const floors = '10';
  // const address =
  //   'КОРПУСА N 6 В КВАРТАЛЕ N 57 ПО УЛИЦЕ ВАСИЛИСЫ КОЖИНОЙ ВО ВЛАДЕНИИ N 14 РАЙОНА ФИЛЕВСКИЙ ПАРК (ЗАПАДНЫЙ АДМИНИСТРАТИВНЫЙ ОКРУГ)';

  const { UIN, address, info } = formData;
  return (
    <div className={s['object-information']}>
      <div className={s.wrapper}>
        <InformationItem label="Наименование объекта" value={UIN} />
        <InformationItem label="Этажность" value={info} />
      </div>
      <InformationItem label="Адрес" value={address} />
    </div>
  );
};

export default ProjectForm;
