import { FiDownload } from 'react-icons/fi';

import s from './reportsList.module.scss';

const ReportsList = ({ currentItems }) => {
  return (
    <div className={s['reports-list']}>
      <ul className={s.list}>
        {currentItems.map((report, i) => (
          <li className={s.item} key={i}>
            <span className={s.name}>{report.name}</span>
            {/* <a className={s.link} href="#" download={report.name}>
              <FiDownload className={s.icon} />
            </a> */}
            <div className={s.link} href="#" download={report.name}>
              <FiDownload className={s.icon} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReportsList;
