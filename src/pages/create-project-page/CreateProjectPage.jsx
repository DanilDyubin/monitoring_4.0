import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import useApiService from '../../service/useApiService';

import Subtitle from '../../components/subtitle/Subtitle';
import CreateProjectForm from '../../components/forms/create-project-form/CreateProjectForm';
import TimeLine from '../../components/time-line/TimeLine';
import Button from '../../ui/button/Button';
import Skeleton from '../../ui/skeletons/page-skeleton/PageSkeleton';

import s from './createProjectPage.module.scss';

const CreateProjectPage = () => {
  const [formData, setFormData] = useState({
    uin: '',
    address: '',
    floor_count: '',
  });
  const [loading, setLoading] = useState(false);

  const scheduleItems = useSelector((state) => state.schedule.items);

  const navigate = useNavigate();

  const { createProject, createCalendar } = useApiService();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createProject(formData)
      .then((res) => createCalendar(res.id))
      .then((res) => navigate(`/project/${res[0].project_id}`))
      .catch((err) => {
        console.error(err);
      });
    setLoading(false);
  };

  if (loading) {
    return <Skeleton />;
  }

  return (
    <div className={s.container}>
      <section className={s.form}>
        <Subtitle subtitle="Заполните основную информацию" />
        <CreateProjectForm
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
        />
      </section>
      <section className={s.schedule}>
        <Subtitle subtitle="График строительных работ" />
        <TimeLine items={scheduleItems} />
      </section>
      <Button
        form="createProjectForm"
        type="submit"
        title="Создать"
        size="big"
        variant="primary"
        disabled={scheduleItems.length < 1}
      />
    </div>
  );
};

export default CreateProjectPage;
