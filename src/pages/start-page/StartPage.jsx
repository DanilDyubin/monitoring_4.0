import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { setOpenModal } from '../../redux/slices/projectSlice';
import NavigationLink from '../../components/navigation-link/NavigationLink';
import Modal from '../../components/modal/Modal';
import CreateProjectForm from '../../components/create-project-form/CreateProjectForm';

import s from './startPage.module.scss';

const StartPage = () => {
  const openModal = useSelector((state) => state.project.openModal);

  const dispatch = useDispatch();

  const onModalClose = () => {
    dispatch(setOpenModal(false));
  };

  return (
    <div className={s.container}>
      <div className={s.navigation}>
        <NavigationLink label="База" to={`/base`} />
        <NavigationLink label="Пользовательские" to={`/custom`} />
      </div>
      <Outlet />
      <Modal active={openModal} onClose={onModalClose}>
        <CreateProjectForm />
      </Modal>
    </div>
  );
};

export default StartPage;
