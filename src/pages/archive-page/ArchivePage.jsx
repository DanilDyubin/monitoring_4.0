import DateForm from '../../components/date-form/DateForm';
import Pagination from '../../components/pagination/Pagination';
import ReportsList from '../../components/reports-list/ReportsList';
import Subtitle from '../../components/subtitle/Subtitle';
import s from './archivePage.module.scss';

const img =
  'https://ionic.io/blog/wp-content/uploads/2024/04/vite-feature-image.png';

const data = [
  { name: 'Отчет за 21.02.2025', link: img },
  { name: 'Отчет за 01.03.2025', link: img },
  { name: 'Отчет за 11.03.2025', link: img },
  { name: 'Отчет за 22.03.2025', link: img },
  { name: 'Отчет за 24.03.2025', link: img },
  { name: 'Отчет за 21.04.2025', link: img },
  { name: 'Отчет за 21.04.2025', link: img },
  { name: 'Отчет за 21.04.2025', link: img },
  { name: 'Отчет за 21.04.2025', link: img },
  { name: 'Отчет за 21.05.2025', link: img },
  { name: 'Отчет за 21.05.2025', link: img },
  { name: 'Отчет за 21.05.2025', link: img },
  { name: 'Отчет за 21.05.2025', link: img },
  { name: 'Отчет за 26.05.2025', link: img },
  { name: 'Отчет за 29.05.2025', link: img },
  { name: 'Отчет за 21.06.2025', link: img },
  { name: 'Отчет за 21.06.2025', link: img },
  { name: 'Отчет за 21.07.2025', link: img },
  { name: 'Отчет за 21.07.2025', link: img },
  { name: 'Отчет за 21.09.2025', link: img },
];

const ArchivePage = () => {
  return (
    <div className={s['archive-page']}>
      <Subtitle subtitle="История изменений" />
      <div className={s.form}>
        <DateForm label="Поиск по дате" btnTitle="Найти" />
      </div>
      <Pagination itemsPerPage={10} data={data} Component={ReportsList} />
    </div>
  );
};

export default ArchivePage;
