import { createHashRouter, RouterProvider, Navigate } from 'react-router-dom';

import Layout from '../layouts/Layout';
import MainPage from '../pages/main-page/MainPage';
import FormPage from '../pages/form-page/FormPage';
import ReportPage from '../pages/report-page/ReportPage';
import ReportPageTotal from '../pages/report-page/report-page-total/ReportPageTotal';
import ReportPageSingle from '../pages/report-page/report-page-single/ReportPageSingle';
import PdfPage from '../pages/pdf-page/PdfPage';
import StartPage from '../pages/start-page/StartPage';
import BasePage from '../pages/base-page/BasePage';
import CustomPage from '../pages/custom-page/CustomPage';
import ProjectLayout from '../layouts/project-layout/ProjectLayout';
import ProjectPage from '../pages/project-page/ProjectPage';
import CreateReportPage from '../pages/create-report-page/CreateReportPage';
import ArchivePage from '../pages/archive-page/ArchivePage';

const App = () => {
  const router = createHashRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '',
          element: <StartPage />,
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
              path: 'custom', // /report/:id/single
              element: <CustomPage />,
            },
          ],
        },
        {
          path: 'project/:id',
          element: <ProjectLayout />,
          children: [
            {
              index: true,
              element: <Navigate to="overview" replace />,
            },
            {
              path: 'overview',
              element: <ProjectPage />,
            },
            {
              path: 'create-report',
              element: <CreateReportPage />,
            },
            {
              path: 'archive',
              element: <ArchivePage />,
            },
          ],
        },
        {
          path: '/report/:id',
          element: <ReportPage />,
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
              path: 'single', // /report/:id/single
              element: <ReportPageSingle />,
            },
          ],
        },
      ],
    },
    {
      path: '/pdf',
      element: <PdfPage />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
