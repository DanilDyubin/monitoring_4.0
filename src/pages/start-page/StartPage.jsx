import { useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { setOpenModal } from '../../redux/slices/projectSlice';
import NavigationLink from '../../components/navigation-link/NavigationLink';
import Modal from '../../components/modal/Modal';

import s from './startPage.module.scss';

const StartPage = () => {
  // const [openModal, setOpenModal] = useState(false);

  // const openModal = useSelector((state) => state.project.openModal);

  // const dispatch = useDispatch();

  // const onModalClose = () => {
  //   dispatch(setOpenModal(false));
  // };

  // const onModalClose = () => {
  //   setOpenModal(false);
  // };

  return (
    <div className={s.container}>
      <div className={s.navigation}>
        <NavigationLink label="База" to={`/base`} />
        <NavigationLink label="Пользовательские" to={`/custom`} />
      </div>
      <Outlet />
    </div>
  );
};

export default StartPage;
