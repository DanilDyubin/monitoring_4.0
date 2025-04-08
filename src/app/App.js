import { createHashRouter, RouterProvider, Navigate } from 'react-router-dom';

import Layout from '../layouts/Layout';
import StartLayout from '../layouts/start-layout/StartLayout';
import BasePage from '../pages/base-page/BasePage';
import CustomPage from '../pages/custom-page/CustomPage';
import CreateProjectPage from '../pages/create-project-page/CreateProjectPage';
import ProjectLayout from '../layouts/project-layout/ProjectLayout';
import ProjectPage from '../pages/project-page/ProjectPage';
import CreateReportPage from '../pages/create-report-page/CreateReportPage';
import ArchivePage from '../pages/archive-page/ArchivePage';
import ReportLayout from '../layouts/report-layout/ReportLayout';
import ReportPageTotal from '../pages/report-page/report-page-total/ReportPageTotal';
import ReportPageSingle from '../pages/report-page/report-page-single/ReportPageSingle';
import PdfPage from '../pages/pdf-page/PdfPage';

const App = () => {
  const router = createHashRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          // Стартовая страница (base, custom и т.д.)
          path: '',
          element: <StartLayout />,
          children: [
            {
              index: true,
              element: <Navigate to="base" replace />,
            },
            {
              path: 'base',
              element: <BasePage />,
            },
            {
              path: 'custom',
              element: <CustomPage />,
            },
          ],
        },
        {
          path: '/create-project',
          element: <CreateProjectPage />,
        },
        {
          // Главный роут для проекта
          path: 'project/:projectId',
          element: <ProjectLayout />,
          children: [
            {
              index: true,
              element: <Navigate to="overview" replace />,
            },
            {
              // Общий обзор проекта (календарь, статистика и т.д.)
              path: 'overview',
              element: <ProjectPage />,
            },
            {
              // Создание нового отчёта
              path: 'create-report',
              element: <CreateReportPage />,
            },
            {
              // Архив отчетов проекта
              path: 'archive',
              element: <ArchivePage />,
            },
          ],
        },
        {
          // Страница отчёта
          path: 'project/:projectId/report/:uploadId',
          element: <ReportLayout />,
          children: [
            {
              index: true,
              element: <Navigate to="total" replace />,
            },
            {
              path: 'total',
              element: <ReportPageTotal />,
            },
            {
              path: 'single',
              element: <ReportPageSingle />,
            },
          ],
        },
        {
          path: '/pdf',
          element: <PdfPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
