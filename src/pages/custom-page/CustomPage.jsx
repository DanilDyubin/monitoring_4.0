import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Pagination from '../../components/pagination/Pagination';
import SearchForm from '../../components/search-form/SearchForm';
import ProjectList from '../../components/project-list/ProjectList';

import s from './customPage.module.scss';
import Modal from '../../components/modal/Modal';
import Button from '../../ui/button/Button';
import CreateProjectForm from '../../components/forms/create-project-form/CreateProjectForm';

const data = [
  {
    address:
      'КОРПУСА N 6 В КВАРТАЛЕ N 57 ПО УЛИЦЕ ВАСИЛИСЫ КОЖИНОЙ ВО ВЛАДЕНИИ N14 РАЙОНА ФИЛЕВСКИЙ ПАРК (ЗАПАДНЫЙ АДМИНИСТРАТИВНЫЙ ОКРУГ',
    uin: 'IH2812-10-0001-001',
    floors: '10 этажей',
  },
  {
    address:
      'КОРПУСА N 7 В КВАРТАЛЕ N 57 ПО УЛИЦЕ ВАСИЛИСЫ КОЖИНОЙ ВО ВЛАДЕНИИ N14 РАЙОНА ФИЛЕВСКИЙ ПАРК (ЗАПАДНЫЙ АДМИНИСТРАТИВНЫЙ ОКРУГ',
    uin: 'IH2812-10-0001-001',
    floors: '10 этажей',
  },
  {
    address:
      'КОРПУСА N 8 В КВАРТАЛЕ N 57 ПО УЛИЦЕ ВАСИЛИСЫ КОЖИНОЙ ВО ВЛАДЕНИИ N14 РАЙОНА ФИЛЕВСКИЙ ПАРК (ЗАПАДНЫЙ АДМИНИСТРАТИВНЫЙ ОКРУГ',
    uin: 'IH2812-10-0001-001',
    floors: '10 этажей',
  },
  // {
  //   address:
  //     'КОРПУСА N 9 В КВАРТАЛЕ N 57 ПО УЛИЦЕ ВАСИЛИСЫ КОЖИНОЙ ВО ВЛАДЕНИИ N14 РАЙОНА ФИЛЕВСКИЙ ПАРК (ЗАПАДНЫЙ АДМИНИСТРАТИВНЫЙ ОКРУГ',
  //   uin: 'IH2812-10-0001-001',
  //   floors: '10 этажей',
  // },
  // {
  //   address:
  //     'КОРПУСА N 10 В КВАРТАЛЕ N 57 ПО УЛИЦЕ ВАСИЛИСЫ КОЖИНОЙ ВО ВЛАДЕНИИ N14 РАЙОНА ФИЛЕВСКИЙ ПАРК (ЗАПАДНЫЙ АДМИНИСТРАТИВНЫЙ ОКРУГ',
  //   uin: 'IH2812-10-0001-001',
  //   floors: '10 этажей',
  // },
  // {
  //   address:
  //     'КОРПУСА N 11 В КВАРТАЛЕ N 57 ПО УЛИЦЕ ВАСИЛИСЫ КОЖИНОЙ ВО ВЛАДЕНИИ N14 РАЙОНА ФИЛЕВСКИЙ ПАРК (ЗАПАДНЫЙ АДМИНИСТРАТИВНЫЙ ОКРУГ',
  //   uin: 'IH2812-10-0001-001',
  //   floors: '10 этажей',
  // },
  // {
  //   address:
  //     'КОРПУСА N 12 В КВАРТАЛЕ N 57 ПО УЛИЦЕ ВАСИЛИСЫ КОЖИНОЙ ВО ВЛАДЕНИИ N14 РАЙОНА ФИЛЕВСКИЙ ПАРК (ЗАПАДНЫЙ АДМИНИСТРАТИВНЫЙ ОКРУГ',
  //   uin: 'IH2812-10-0001-001',
  //   floors: '10 этажей',
  // },
  // {
  //   address:
  //     'КОРПУСА N 13 В КВАРТАЛЕ N 57 ПО УЛИЦЕ ВАСИЛИСЫ КОЖИНОЙ ВО ВЛАДЕНИИ N14 РАЙОНА ФИЛЕВСКИЙ ПАРК (ЗАПАДНЫЙ АДМИНИСТРАТИВНЫЙ ОКРУГ',
  //   uin: 'IH2812-10-0001-001',
  //   floors: '10 этажей',
  // },
  // {
  //   address:
  //     'КОРПУСА N 14 В КВАРТАЛЕ N 57 ПО УЛИЦЕ ВАСИЛИСЫ КОЖИНОЙ ВО ВЛАДЕНИИ N14 РАЙОНА ФИЛЕВСКИЙ ПАРК (ЗАПАДНЫЙ АДМИНИСТРАТИВНЫЙ ОКРУГ',
  //   uin: 'IH2812-10-0001-001',
  //   floors: '10 этажей',
  // },
  // {
  //   address:
  //     'КОРПУСА N 15 В КВАРТАЛЕ N 57 ПО УЛИЦЕ ВАСИЛИСЫ КОЖИНОЙ ВО ВЛАДЕНИИ N14 РАЙОНА ФИЛЕВСКИЙ ПАРК (ЗАПАДНЫЙ АДМИНИСТРАТИВНЫЙ ОКРУГ',
  //   uin: 'IH2812-10-0001-001',
  //   floors: '10 этажей',
  // },
  // {
  //   address:
  //     'КОРПУСА N 16 В КВАРТАЛЕ N 57 ПО УЛИЦЕ ВАСИЛИСЫ КОЖИНОЙ ВО ВЛАДЕНИИ N14 РАЙОНА ФИЛЕВСКИЙ ПАРК (ЗАПАДНЫЙ АДМИНИСТРАТИВНЫЙ ОКРУГ',
  //   uin: 'IH2812-10-0001-001',
  //   floors: '10 этажей',
  // },
  // {
  //   address:
  //     'КОРПУСА N 17 В КВАРТАЛЕ N 57 ПО УЛИЦЕ ВАСИЛИСЫ КОЖИНОЙ ВО ВЛАДЕНИИ N14 РАЙОНА ФИЛЕВСКИЙ ПАРК (ЗАПАДНЫЙ АДМИНИСТРАТИВНЫЙ ОКРУГ',
  //   uin: 'IH2812-10-0001-001',
  //   floors: '10 этажей',
  // },
  // {
  //   address:
  //     'КОРПУСА N 18 В КВАРТАЛЕ N 57 ПО УЛИЦЕ ВАСИЛИСЫ КОЖИНОЙ ВО ВЛАДЕНИИ N14 РАЙОНА ФИЛЕВСКИЙ ПАРК (ЗАПАДНЫЙ АДМИНИСТРАТИВНЫЙ ОКРУГ',
  //   uin: 'IH2812-10-0001-001',
  //   floors: '10 этажей',
  // },
];

const CustomPage = () => {
  const navigate = useNavigate();
  // const [openModal, setOpenModal] = useState(false);

  // const onModalOpen = () => {
  //   setOpenModal(true);
  // };

  // const onModalClose = () => {
  //   setOpenModal(false);
  // };

  return (
    <div className="container">
      <div className={s.form}>
        <SearchForm />
      </div>
      <Pagination itemsPerPage={4} data={data}>
        {(currentItems) => (
          <>
            <ProjectList currentItems={currentItems} />
            <Button
              title="Создать новый проект"
              size="big"
              variant="secondaryHovered"
              onClick={() => navigate('/create-project')}
            />
          </>
        )}
      </Pagination>
      {/* <Modal active={openModal} onClose={onModalClose}>
        <CreateProjectForm onCloseModal={onModalClose} />
      </Modal> */}
    </div>
  );
};

export default CustomPage;
