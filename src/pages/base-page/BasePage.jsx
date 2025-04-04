import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../components/pagination/Pagination';
import SearchForm from '../../components/search-form/SearchForm';
import ProjectList from '../../components/project-list/ProjectList';

import s from './basePage.module.scss';
import SearchInput from '../../components/search-input/SearchInput';
import Button from '../../ui/button/Button';
import Modal from '../../components/modal/Modal';
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
  {
    address:
      'КОРПУСА N 9 В КВАРТАЛЕ N 57 ПО УЛИЦЕ ВАСИЛИСЫ КОЖИНОЙ ВО ВЛАДЕНИИ N14 РАЙОНА ФИЛЕВСКИЙ ПАРК (ЗАПАДНЫЙ АДМИНИСТРАТИВНЫЙ ОКРУГ',
    uin: 'IH2812-10-0001-001',
    floors: '10 этажей',
  },
  {
    address:
      'КОРПУСА N 10 В КВАРТАЛЕ N 57 ПО УЛИЦЕ ВАСИЛИСЫ КОЖИНОЙ ВО ВЛАДЕНИИ N14 РАЙОНА ФИЛЕВСКИЙ ПАРК (ЗАПАДНЫЙ АДМИНИСТРАТИВНЫЙ ОКРУГ',
    uin: 'IH2812-10-0001-001',
    floors: '10 этажей',
  },
  {
    address:
      'КОРПУСА N 11 В КВАРТАЛЕ N 57 ПО УЛИЦЕ ВАСИЛИСЫ КОЖИНОЙ ВО ВЛАДЕНИИ N14 РАЙОНА ФИЛЕВСКИЙ ПАРК (ЗАПАДНЫЙ АДМИНИСТРАТИВНЫЙ ОКРУГ',
    uin: 'IH2812-10-0001-001',
    floors: '10 этажей',
  },
  {
    address:
      'КОРПУСА N 12 В КВАРТАЛЕ N 57 ПО УЛИЦЕ ВАСИЛИСЫ КОЖИНОЙ ВО ВЛАДЕНИИ N14 РАЙОНА ФИЛЕВСКИЙ ПАРК (ЗАПАДНЫЙ АДМИНИСТРАТИВНЫЙ ОКРУГ',
    uin: 'IH2812-10-0001-001',
    floors: '10 этажей',
  },
  {
    address:
      'КОРПУСА N 13 В КВАРТАЛЕ N 57 ПО УЛИЦЕ ВАСИЛИСЫ КОЖИНОЙ ВО ВЛАДЕНИИ N14 РАЙОНА ФИЛЕВСКИЙ ПАРК (ЗАПАДНЫЙ АДМИНИСТРАТИВНЫЙ ОКРУГ',
    uin: 'IH2812-10-0001-001',
    floors: '10 этажей',
  },
  {
    address:
      'КОРПУСА N 14 В КВАРТАЛЕ N 57 ПО УЛИЦЕ ВАСИЛИСЫ КОЖИНОЙ ВО ВЛАДЕНИИ N14 РАЙОНА ФИЛЕВСКИЙ ПАРК (ЗАПАДНЫЙ АДМИНИСТРАТИВНЫЙ ОКРУГ',
    uin: 'IH2812-10-0001-001',
    floors: '10 этажей',
  },
  {
    address:
      'КОРПУСА N 15 В КВАРТАЛЕ N 57 ПО УЛИЦЕ ВАСИЛИСЫ КОЖИНОЙ ВО ВЛАДЕНИИ N14 РАЙОНА ФИЛЕВСКИЙ ПАРК (ЗАПАДНЫЙ АДМИНИСТРАТИВНЫЙ ОКРУГ',
    uin: 'IH2812-10-0001-001',
    floors: '10 этажей',
  },
  {
    address:
      'КОРПУСА N 16 В КВАРТАЛЕ N 57 ПО УЛИЦЕ ВАСИЛИСЫ КОЖИНОЙ ВО ВЛАДЕНИИ N14 РАЙОНА ФИЛЕВСКИЙ ПАРК (ЗАПАДНЫЙ АДМИНИСТРАТИВНЫЙ ОКРУГ',
    uin: 'IH2812-10-0001-001',
    floors: '10 этажей',
  },
  {
    address:
      'КОРПУСА N 17 В КВАРТАЛЕ N 57 ПО УЛИЦЕ ВАСИЛИСЫ КОЖИНОЙ ВО ВЛАДЕНИИ N14 РАЙОНА ФИЛЕВСКИЙ ПАРК (ЗАПАДНЫЙ АДМИНИСТРАТИВНЫЙ ОКРУГ',
    uin: 'IH2812-10-0001-001',
    floors: '10 этажей',
  },
  {
    address:
      'КОРПУСА N 18 В КВАРТАЛЕ N 57 ПО УЛИЦЕ ВАСИЛИСЫ КОЖИНОЙ ВО ВЛАДЕНИИ N14 РАЙОНА ФИЛЕВСКИЙ ПАРК (ЗАПАДНЫЙ АДМИНИСТРАТИВНЫЙ ОКРУГ',
    uin: 'IH2812-10-0001-001',
    floors: '10 этажей',
  },
  {
    address:
      'КОРПУСА N 19 В КВАРТАЛЕ N 57 ПО УЛИЦЕ ВАСИЛИСЫ КОЖИНОЙ ВО ВЛАДЕНИИ N14 РАЙОНА ФИЛЕВСКИЙ ПАРК (ЗАПАДНЫЙ АДМИНИСТРАТИВНЫЙ ОКРУГ',
    uin: 'IH2812-10-0001-001',
    floors: '10 этажей',
  },
  {
    address:
      'КОРПУСА N 20 В КВАРТАЛЕ N 57 ПО УЛИЦЕ ВАСИЛИСЫ КОЖИНОЙ ВО ВЛАДЕНИИ N14 РАЙОНА ФИЛЕВСКИЙ ПАРК (ЗАПАДНЫЙ АДМИНИСТРАТИВНЫЙ ОКРУГ',
    uin: 'IH2812-10-0001-001',
    floors: '10 этажей',
  },
  {
    address:
      'КОРПУСА N 21 В КВАРТАЛЕ N 57 ПО УЛИЦЕ ВАСИЛИСЫ КОЖИНОЙ ВО ВЛАДЕНИИ N14 РАЙОНА ФИЛЕВСКИЙ ПАРК (ЗАПАДНЫЙ АДМИНИСТРАТИВНЫЙ ОКРУГ',
    uin: 'IH2812-10-0001-001',
    floors: '10 этажей',
  },
  {
    address:
      'КОРПУСА N 22 В КВАРТАЛЕ N 57 ПО УЛИЦЕ ВАСИЛИСЫ КОЖИНОЙ ВО ВЛАДЕНИИ N14 РАЙОНА ФИЛЕВСКИЙ ПАРК (ЗАПАДНЫЙ АДМИНИСТРАТИВНЫЙ ОКРУГ',
    uin: 'IH2812-10-0001-001',
    floors: '10 этажей',
  },
  {
    address:
      'КОРПУСА N 23 В КВАРТАЛЕ N 57 ПО УЛИЦЕ ВАСИЛИСЫ КОЖИНОЙ ВО ВЛАДЕНИИ N14 РАЙОНА ФИЛЕВСКИЙ ПАРК (ЗАПАДНЫЙ АДМИНИСТРАТИВНЫЙ ОКРУГ',
    uin: 'IH2812-10-0001-001',
    floors: '10 этажей',
  },
  {
    address:
      'КОРПУСА N 24 В КВАРТАЛЕ N 57 ПО УЛИЦЕ ВАСИЛИСЫ КОЖИНОЙ ВО ВЛАДЕНИИ N14 РАЙОНА ФИЛЕВСКИЙ ПАРК (ЗАПАДНЫЙ АДМИНИСТРАТИВНЫЙ ОКРУГ',
    uin: 'IH2812-10-0001-001',
    floors: '10 этажей',
  },
  {
    address:
      'КОРПУСА N 25 В КВАРТАЛЕ N 57 ПО УЛИЦЕ ВАСИЛИСЫ КОЖИНОЙ ВО ВЛАДЕНИИ N14 РАЙОНА ФИЛЕВСКИЙ ПАРК (ЗАПАДНЫЙ АДМИНИСТРАТИВНЫЙ ОКРУГ',
    uin: 'IH2812-10-0001-001',
    floors: '10 этажей',
  },
  {
    address:
      'КОРПУСА N 26 В КВАРТАЛЕ N 57 ПО УЛИЦЕ ВАСИЛИСЫ КОЖИНОЙ ВО ВЛАДЕНИИ N14 РАЙОНА ФИЛЕВСКИЙ ПАРК (ЗАПАДНЫЙ АДМИНИСТРАТИВНЫЙ ОКРУГ',
    uin: 'IH2812-10-0001-001',
    floors: '10 этажей',
  },
];

const BasePage = () => {
  const navigate = useNavigate();
  // const [openModal, setOpenModal] = useState(false);

  // const onModalOpen = () => {
  //   setOpenModal(true);
  // };

  // const onModalClose = () => {
  //   setOpenModal(false);
  // };

  // navigate(`/project/${result.id}`);

  return (
    <div className="container">
      <div className={s.input}>
        <SearchInput />
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

export default BasePage;
