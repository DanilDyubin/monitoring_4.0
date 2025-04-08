import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useApiService from '../../service/useApiService';
import Pagination from '../../components/pagination/Pagination';
import SearchForm from '../../components/search-form/SearchForm';
import ProjectList from '../../components/project-list/ProjectList';

import Button from '../../ui/button/Button';

import s from './customPage.module.scss';
import { resetAllSlices } from '../../redux/actions/globalActions';
import { useDispatch } from 'react-redux';

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
  const [allProjects, setAllProjects] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { getAllProjects } = useApiService();

  const fetchAllProjects = async () => {
    try {
      const result = await getAllProjects();
      setAllProjects(result);
    } catch (error) {
      console.error('Ошибка получения проектов:', error);
    }
  };
  console.log(JSON.stringify(allProjects));
  useEffect(() => {
    fetchAllProjects();
  }, []);

  const navigateToCreateProject = () => {
    // dispatch(clearReport());
    // dispatch(clearSchedule());
    // persistor.purge();
    // dispatch(resetAllSlices());
    navigate('/create-project');
  };

  return (
    <div className="container">
      <div className={s.form}>
        <SearchForm />
      </div>
      <Pagination itemsPerPage={4} data={allProjects}>
        {(currentItems) => (
          <>
            <ProjectList allProjects={currentItems} />
            <Button
              title="Создать новый проект"
              size="big"
              variant="secondaryHovered"
              onClick={() => navigateToCreateProject()}
            />
          </>
        )}
      </Pagination>
    </div>
  );
};

export default CustomPage;
