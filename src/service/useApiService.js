import { useSelector, useDispatch } from 'react-redux';

import { useHttp } from './http.hook';

const useApiService = () => {
  const { loading, request, error, clearError } = useHttp();

  const API_BASE = 'https://msi.construction-monitoring.contextmachine.cloud/';
  const calendarItems = useSelector((state) => state.schedule.items);

  // получение всех проектов
  const getAllProjects = async () => {
    return await request(`${API_BASE}get_all_projects`);
  };

  // создание проекта
  const createProject = async (formData) => {
    const { uin, address, floor_count } = formData;

    const url = `${API_BASE}create_project?uin=${encodeURIComponent(
      uin
    )}&address=${encodeURIComponent(address)}&floor_count=${encodeURIComponent(
      Number(floor_count)
    )}&info=`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Error, status: ${response.status}`);
      }

      const result = await response.json();

      return result;
    } catch (e) {
      console.error(e.message);
      throw e;
    }
  };

  // получение проекта
  // const getProject = async (id) => {
  //   try {
  //     const response = await fetch(`${API_BASE}get_project?id=${id}`);

  //     if (!response.ok) {
  //       throw new Error(`Error, status: ${response.status}`);
  //     }

  //     const result = await response.json();
  //     console.log(`getProject - ${JSON.stringify(result)}`);
  //     return result;
  //   } catch (e) {
  //     console.error(e.message);
  //     throw e;
  //   }
  // };
  const getProject = async (id) => {
    return await request(`${API_BASE}get_project?id=${id}`);
  };

  const createUpload = async (projectId, shotDate, photos) => {
    const loadDate = new Date().getTime();

    const formData = new FormData();
    photos.forEach((photo) => formData.append('upl_img', photo));

    const url = `${API_BASE}create_upload_and_photos?project_id=${encodeURIComponent(
      projectId
    )}&load_date=${encodeURIComponent(loadDate)}&shot_date=${encodeURIComponent(
      shotDate
    )}`;

    const result = await request(url, 'POST', formData, {});
    return result?.data?.insert_msi_sf_photo?.returning[0].upload_id;
  };

  // const uploadPhotos = async (upload_id, photos) => {
  //   const formData = new FormData();
  //   photos.forEach((photo) => formData.append('upl_img', photo));

  //   const url = `${API_BASE}upload_photos?upload_id=${encodeURIComponent(
  //     upload_id
  //   )}`;

  //   try {
  //     const response = await fetch(url, {
  //       method: 'POST',
  //       body: formData,
  //     });
  //     if (!response.ok) {
  //       throw new Error(`Ошибка загрузки: ${response.status}`);
  //     }

  //     const result = await response.json();
  //     console.log(
  //       `Photos - ${result?.data?.insert_msi_sf_photo?.returning[0].upload_id}`
  //     );

  //     return result?.data?.insert_msi_sf_photo?.returning[0].upload_id;
  //   } catch (error) {
  //     console.error('Upload failed:', error);
  //   }
  // };
  const uploadPhotos = async (upload_id, photos) => {
    const formData = new FormData();
    photos.forEach((photo) => formData.append('upl_img', photo));

    const url = `${API_BASE}upload_photos?upload_id=${encodeURIComponent(
      upload_id
    )}`;

    const result = await request(url, 'POST', formData, {});
    return result?.data?.insert_msi_sf_photo?.returning[0].upload_id;
  };

  // const getPhotos = async (id) => {
  //   try {
  //     const response = await fetch(`${API_BASE}get_photos?upload_id=${id}`);

  //     if (!response.ok) {
  //       throw new Error(`Error, status: ${response.status}`);
  //     }

  //     const result = await response.json();
  //     console.log(`getPhotos - ${JSON.stringify(result)}`);
  //     return result;
  //   } catch (e) {
  //     console.error(e.message);
  //     throw e;
  //   }
  // };

  const getPhotos = async (id) => {
    return await request(`${API_BASE}get_photos?upload_id=${id}`);
  };

  const getPhotosFromDB = async (projectId, uin, date) => {
    const result = await request(
      `${API_BASE}photos_from_bd?project_id=${projectId}&uin=${uin}&date=${date}`,
      'POST'
    );
    return result?.data?.insert_msi_sf_photo?.returning;
  };

  const getPhotosDatesFromDB = async (uin) => {
    return await request(`${API_BASE}photos_dates_from_bd?uin=${uin}`);
  };

  const deletePhoto = async (id) => {
    await request(`${API_BASE}delete_photo?photo_id=${id}`, 'DELETE');
  };

  const createCalendar = async (projectId) => {
    const url = `${API_BASE}create_calendar?project_id=${projectId}&make_str=true`;

    if (!Array.isArray(calendarItems) || calendarItems.length === 0) {
      console.error('Ошибка: calendarItems пуст или имеет неверный формат');
      return;
    }

    const sendItems = calendarItems.map((item) => {
      return {
        id: item.group,
        title: item.group_title,
        start_time: item.start_time,
        end_time: item.end_time,
        current_time: 1743195599999,
      };
    });

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sendItems),
      });

      if (!response.ok) {
        throw new Error(`Error, status: ${response.status}`);
      }
      const result = await response.json();
      console.log('Успешный ответ:', result);
      return result;
    } catch (e) {
      console.error(e.message);
      throw e;
    }
  };

  const getCalendar = async (id) => {
    return await request(`${API_BASE}get_calendar?project_id=${id}`);
  };

  const updateRowCalendar = async (projectId, stageId, planStart, planEnd) => {
    const data = await request(
      `${API_BASE}update_row_calendar?project_id=${projectId}&stage_id=${stageId}&plan_start=${planStart}&plan_end=${planEnd}`,
      'POST'
    );
    console.log(JSON.stringify(data));
    return data;
  };

  const deleteRowCalendar = async (projectId, stageId) => {
    await request(
      `${API_BASE}delete_row_calendar?project_id=${projectId}&stage_id=${stageId}`,
      'DELETE'
    );
  };

  const createPredict = async (id) => {
    while (true) {
      try {
        const response = await fetch(
          `${API_BASE}create_predict?upload_id=${id}`,
          {
            method: 'POST',
          }
        );

        if (!response.ok) {
          throw new Error(`Error, status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Промежуточный статус:', result.status);

        if (result.status === 'done' || result.status === 'error') {
          console.log(`getPredict - ${JSON.stringify(result)}`);
          return result;
        }
      } catch (e) {
        console.error(e.message);
        throw e;
      }

      await new Promise((resolve) => setTimeout(resolve, 7000));
    }
  };

  const getMainReport = async (id) => {
    return await request(`${API_BASE}get_main_report?upload_id=${id}`);
  };

  const getPhotosReport = async (id) => {
    try {
      const response = await fetch(`${API_BASE}get_photos?upload_id=${id}`);

      if (!response.ok) {
        throw new Error(`Error, status: ${response.status}`);
      }
      const photosId = await response.json();

      const photosReportRequests = photosId.map(async (photoObj) => {
        const reportResponse = await fetch(
          `${API_BASE}get_photo_report?photo_id=${photoObj.id}`
        );

        if (!response.ok) {
          throw new Error(`Error, status: ${response.status}`);
        }

        const report = await reportResponse.json();

        return {
          photoId: photoObj.id,
          report: report,
        };
      });

      const photosData = await Promise.all(photosReportRequests);
      console.log(`PhotosData - ${JSON.stringify(photosData)}`);
      return photosData;
    } catch (e) {
      console.error(e.message);
      throw e;
    }
  };

  return {
    getAllProjects,
    createProject,
    getProject,
    createUpload,
    uploadPhotos,
    getPhotos,
    deletePhoto,
    getPhotosFromDB,
    getPhotosDatesFromDB,
    createCalendar,
    updateRowCalendar,
    deleteRowCalendar,
    getCalendar,
    createPredict,
    getMainReport,
    getPhotosReport,
    loading,
    request,
    error,
  };
};

export default useApiService;

// report
// [
//   {
//     stage_id: 0,
//     percent: 100,
//     info: null,
//     stage: {
//       name: 'Земляные работы',
//       calendar_dull: '#FFD9D9',
//       calendar_vivid: '#FF8080',
//       color: '#FF0000',
//     },
//   },
//   {
//     stage_id: 1,
//     percent: 100,
//     info: null,
//     stage: {
//       name: 'Шпунтовое ограждение',
//       calendar_dull: '#D9F8EF',
//       calendar_vivid: '#80E6CB',
//       color: '#00CC96',
//     },
//   },
//   {
//     stage_id: 2,
//     percent: 100,
//     info: null,
//     stage: {
//       name: 'Распорная система',
//       calendar_dull: '#D9D9FF',
//       calendar_vivid: '#8080FF',
//       color: '#0000FF',
//     },
//   },
//   {
//     stage_id: 3,
//     percent: 83.33,
//     info: null,
//     stage: {
//       name: 'Устройство фундамента',
//       calendar_dull: '#FFFFD9',
//       calendar_vivid: '#FFFF80',
//       color: '#FFFF00',
//     },
//   },
//   {
//     stage_id: 4,
//     percent: 66.67,
//     info: null,
//     stage: {
//       name: 'Монолит',
//       calendar_dull: '#D9FFFF',
//       calendar_vivid: '#80FFFF',
//       color: '#00FFFF',
//     },
//   },
//   {
//     stage_id: 5,
//     percent: 43.28,
//     info: null,
//     stage: {
//       name: 'Кладка',
//       calendar_dull: '#FFE8EF',
//       calendar_vivid: '#FFB3C9',
//       color: '#FF6692',
//     },
//   },
//   {
//     stage_id: 6,
//     percent: 31.54,
//     info: null,
//     stage: {
//       name: 'Теплоизоляция',
//       calendar_dull: '#F1D9FF',
//       calendar_vivid: '#D280FF',
//       color: '#A500FF',
//     },
//   },
//   {
//     stage_id: 7,
//     percent: 31.54,
//     info: null,
//     stage: {
//       name: 'Подсистема фасада',
//       calendar_dull: '#D9F1FF',
//       calendar_vivid: '#80D2FF',
//       color: '#00A5FF',
//     },
//   },
//   {
//     stage_id: 8,
//     percent: 14.72,
//     info: null,
//     stage: {
//       name: 'Облицовка фасада',
//       calendar_dull: '#F1FFD9',
//       calendar_vivid: '#D2FF80',
//       color: '#A5FF00',
//     },
//   },
//   {
//     stage_id: 11,
//     percent: 57.44,
//     info: null,
//     stage: {
//       name: 'Работы завершены',
//       calendar_dull: '#D9FFF1',
//       calendar_vivid: '#80FFD2',
//       color: '#00FFA5',
//     },
//   },
//   {
//     stage_id: 9,
//     percent: 21.3,
//     info: null,
//     stage: {
//       name: 'Остекление',
//       calendar_dull: '#FFF2DF',
//       calendar_vivid: '#FFD394',
//       color: '#FFA629',
//     },
//   },
//   {
//     stage_id: 10,
//     percent: 0,
//     info: null,
//     stage: {
//       name: 'Благоустройство',
//       calendar_dull: '#E5F8E4',
//       calendar_vivid: '#A9E7A4',
//       color: '#52CE49',
//     },
//   },
// ];

const getCalendar = [
  {
    project_id: 'f8a20e63-c7ae-49e9-b716-48c613f1c6a2',
    stage_id: 0,
    plan_start: '2025-03-30',
    plan_end: '2025-04-26',
    fact_start: '2025-04-02',
    fact_end: '2025-04-03',
    percent: 100,
    stage: {
      id: 0,
      name: 'Земляные работы',
      calendar_dull: '#FFD9D9',
      calendar_vivid: '#FF8080',
      color: '#FF0000',
    },
  },
  {
    project_id: 'f8a20e63-c7ae-49e9-b716-48c613f1c6a2',
    stage_id: 1,
    plan_start: '2025-04-06',
    plan_end: '2025-04-26',
    fact_start: '2025-04-02',
    fact_end: '2025-04-03',
    percent: 100,
    stage: {
      id: 1,
      name: 'Шпунтовое ограждение',
      calendar_dull: '#D9F8EF',
      calendar_vivid: '#80E6CB',
      color: '#00CC96',
    },
  },
  {
    project_id: 'f8a20e63-c7ae-49e9-b716-48c613f1c6a2',
    stage_id: 2,
    plan_start: '2025-03-30',
    plan_end: '2025-04-15',
    fact_start: '2025-04-02',
    fact_end: '2025-04-03',
    percent: 100,
    stage: {
      id: 2,
      name: 'Распорная система',
      calendar_dull: '#D9D9FF',
      calendar_vivid: '#8080FF',
      color: '#0000FF',
    },
  },
];

const mainReportSorted = [
  {
    percent: 100,
    stage_id: 0,
    stage: {
      name: 'Земляные работы',
      color: '#FF0000',
      calendar_dull: '#FFD9D9',
      calendar_vivid: '#FF8080',
      calendars: [],
    },
  },
  {
    percent: 100,
    stage_id: 1,
    stage: {
      name: 'Шпунтовое ограждение',
      color: '#00CC96',
      calendar_dull: '#D9F8EF',
      calendar_vivid: '#80E6CB',
      calendars: [
        {
          fact_end: '2024-12-25',
          fact_start: '2024-12-24',
          info: null,
          percent: 100,
          report_date: '2024-12-25',
          plan_end: '2025-05-04',
          plan_start: '2025-04-06',
        },
      ],
    },
  },
  {
    percent: 90,
    stage_id: 2,
    stage: {
      name: 'Распорная система',
      color: '#0000FF',
      calendar_dull: '#D9D9FF',
      calendar_vivid: '#8080FF',
      calendars: [],
    },
  },
  {
    percent: 80,
    stage_id: 3,
    stage: {
      name: 'Устройство фундамента',
      color: '#FFFF00',
      calendar_dull: '#FFFFD9',
      calendar_vivid: '#FFFF80',
      calendars: [],
    },
  },
  {
    percent: 100,
    stage_id: 4,
    stage: {
      name: 'Монолит',
      color: '#00FFFF',
      calendar_dull: '#D9FFFF',
      calendar_vivid: '#80FFFF',
      calendars: [],
    },
  },
  {
    percent: 71.69,
    stage_id: 5,
    stage: {
      name: 'Кладка',
      color: '#FF6692',
      calendar_dull: '#FFE8EF',
      calendar_vivid: '#FFB3C9',
      calendars: [],
    },
  },
  {
    percent: 24.09,
    stage_id: 6,
    stage: {
      name: 'Теплоизоляция',
      color: '#A500FF',
      calendar_dull: '#F1D9FF',
      calendar_vivid: '#D280FF',
      calendars: [],
    },
  },
  {
    percent: 24.09,
    stage_id: 7,
    stage: {
      name: 'Подсистема фасада',
      color: '#00A5FF',
      calendar_dull: '#D9F1FF',
      calendar_vivid: '#80D2FF',
      calendars: [],
    },
  },
  {
    percent: 23.81,
    stage_id: 8,
    stage: {
      name: 'Облицовка фасада',
      color: '#A5FF00',
      calendar_dull: '#F1FFD9',
      calendar_vivid: '#D2FF80',
      calendars: [],
    },
  },
  {
    percent: 4.39,
    stage_id: 9,
    stage: {
      name: 'Остекление',
      color: '#FFA629',
      calendar_dull: '#FFF2DF',
      calendar_vivid: '#FFD394',
      calendars: [
        {
          fact_end: '2024-12-25',
          fact_start: '2024-12-24',
          info: null,
          percent: 4.39,
          report_date: '2024-12-25',
          plan_end: '2025-04-15',
          plan_start: '2025-03-31',
        },
      ],
    },
  },
  {
    percent: 70,
    stage_id: 10,
    stage: {
      name: 'Благоустройство',
      color: '#52CE49',
      calendar_dull: '#E5F8E4',
      calendar_vivid: '#A9E7A4',
      calendars: [],
    },
  },
  {
    percent: 68.07,
    stage_id: 11,
    stage: {
      name: 'Работы завершены',
      color: '#00FFA5',
      calendar_dull: '#D9FFF1',
      calendar_vivid: '#80FFD2',
      calendars: [],
    },
  },
];

const photosReport = [
  {
    photoId: '0afc0334-247f-4560-a26d-fd5618de59fa',
    report: [
      {
        stage_id: 0,
        percent: 100,
        info: null,
        stage: {
          name: 'Земляные работы',
          calendar_dull: '#FFD9D9',
          calendar_vivid: '#FF8080',
          color: '#FF0000',
        },
      },
      {
        stage_id: 1,
        percent: 100,
        info: null,
        stage: {
          name: 'Шпунтовое ограждение',
          calendar_dull: '#D9F8EF',
          calendar_vivid: '#80E6CB',
          color: '#00CC96',
        },
      },
      {
        stage_id: 2,
        percent: 100,
        info: null,
        stage: {
          name: 'Распорная система',
          calendar_dull: '#D9D9FF',
          calendar_vivid: '#8080FF',
          color: '#0000FF',
        },
      },
      {
        stage_id: 3,
        percent: 100,
        info: null,
        stage: {
          name: 'Устройство фундамента',
          calendar_dull: '#FFFFD9',
          calendar_vivid: '#FFFF80',
          color: '#FFFF00',
        },
      },
      {
        stage_id: 4,
        percent: 99.99999999999999,
        info: null,
        stage: {
          name: 'Монолит',
          calendar_dull: '#D9FFFF',
          calendar_vivid: '#80FFFF',
          color: '#00FFFF',
        },
      },
      {
        stage_id: 5,
        percent: 25.41982456696316,
        info: null,
        stage: {
          name: 'Кладка',
          calendar_dull: '#FFE8EF',
          calendar_vivid: '#FFB3C9',
          color: '#FF6692',
        },
      },
      {
        stage_id: 6,
        percent: 0,
        info: null,
        stage: {
          name: 'Теплоизоляция',
          calendar_dull: '#F1D9FF',
          calendar_vivid: '#D280FF',
          color: '#A500FF',
        },
      },
      {
        stage_id: 7,
        percent: 0,
        info: null,
        stage: {
          name: 'Подсистема фасада',
          calendar_dull: '#D9F1FF',
          calendar_vivid: '#80D2FF',
          color: '#00A5FF',
        },
      },
      {
        stage_id: 8,
        percent: 0,
        info: null,
        stage: {
          name: 'Облицовка фасада',
          calendar_dull: '#F1FFD9',
          calendar_vivid: '#D2FF80',
          color: '#A5FF00',
        },
      },
      {
        stage_id: 11,
        percent: 59.42747807087039,
        info: null,
        stage: {
          name: 'Работы завершены',
          calendar_dull: '#D9FFF1',
          calendar_vivid: '#80FFD2',
          color: '#00FFA5',
        },
      },
      {
        stage_id: 9,
        percent: 0,
        info: null,
        stage: {
          name: 'Остекление',
          calendar_dull: '#FFF2DF',
          calendar_vivid: '#FFD394',
          color: '#FFA629',
        },
      },
      {
        stage_id: 10,
        percent: 100,
        info: null,
        stage: {
          name: 'Благоустройство',
          calendar_dull: '#E5F8E4',
          calendar_vivid: '#A9E7A4',
          color: '#52CE49',
        },
      },
    ],
  },
  {
    photoId: '797ee1b5-3e85-41d6-b9c2-e8c0347f15aa',
    report: [
      {
        stage_id: 0,
        percent: 100,
        info: null,
        stage: {
          name: 'Земляные работы',
          calendar_dull: '#FFD9D9',
          calendar_vivid: '#FF8080',
          color: '#FF0000',
        },
      },
      {
        stage_id: 1,
        percent: 100,
        info: null,
        stage: {
          name: 'Шпунтовое ограждение',
          calendar_dull: '#D9F8EF',
          calendar_vivid: '#80E6CB',
          color: '#00CC96',
        },
      },
      {
        stage_id: 2,
        percent: 100,
        info: null,
        stage: {
          name: 'Распорная система',
          calendar_dull: '#D9D9FF',
          calendar_vivid: '#8080FF',
          color: '#0000FF',
        },
      },
      {
        stage_id: 3,
        percent: 100,
        info: null,
        stage: {
          name: 'Устройство фундамента',
          calendar_dull: '#FFFFD9',
          calendar_vivid: '#FFFF80',
          color: '#FFFF00',
        },
      },
      {
        stage_id: 4,
        percent: 100,
        info: null,
        stage: {
          name: 'Монолит',
          calendar_dull: '#D9FFFF',
          calendar_vivid: '#80FFFF',
          color: '#00FFFF',
        },
      },
      {
        stage_id: 5,
        percent: 100,
        info: null,
        stage: {
          name: 'Кладка',
          calendar_dull: '#FFE8EF',
          calendar_vivid: '#FFB3C9',
          color: '#FF6692',
        },
      },
      {
        stage_id: 6,
        percent: 0,
        info: null,
        stage: {
          name: 'Теплоизоляция',
          calendar_dull: '#F1D9FF',
          calendar_vivid: '#D280FF',
          color: '#A500FF',
        },
      },
      {
        stage_id: 7,
        percent: 0,
        info: null,
        stage: {
          name: 'Подсистема фасада',
          calendar_dull: '#D9F1FF',
          calendar_vivid: '#80D2FF',
          color: '#00A5FF',
        },
      },
      {
        stage_id: 8,
        percent: 0,
        info: null,
        stage: {
          name: 'Облицовка фасада',
          calendar_dull: '#F1FFD9',
          calendar_vivid: '#D2FF80',
          color: '#A5FF00',
        },
      },
      {
        stage_id: 11,
        percent: 68.75,
        info: null,
        stage: {
          name: 'Работы завершены',
          calendar_dull: '#D9FFF1',
          calendar_vivid: '#80FFD2',
          color: '#00FFA5',
        },
      },
      {
        stage_id: 9,
        percent: 0,
        info: null,
        stage: {
          name: 'Остекление',
          calendar_dull: '#FFF2DF',
          calendar_vivid: '#FFD394',
          color: '#FFA629',
        },
      },
      {
        stage_id: 10,
        percent: 50,
        info: null,
        stage: {
          name: 'Благоустройство',
          calendar_dull: '#E5F8E4',
          calendar_vivid: '#A9E7A4',
          color: '#52CE49',
        },
      },
    ],
  },
  {
    photoId: 'c9ee353c-b31e-48e7-893f-4a700afdf4e5',
    report: [
      {
        stage_id: 0,
        percent: 100,
        info: null,
        stage: {
          name: 'Земляные работы',
          calendar_dull: '#FFD9D9',
          calendar_vivid: '#FF8080',
          color: '#FF0000',
        },
      },
      {
        stage_id: 1,
        percent: 100,
        info: null,
        stage: {
          name: 'Шпунтовое ограждение',
          calendar_dull: '#D9F8EF',
          calendar_vivid: '#80E6CB',
          color: '#00CC96',
        },
      },
      {
        stage_id: 2,
        percent: 100,
        info: null,
        stage: {
          name: 'Распорная система',
          calendar_dull: '#D9D9FF',
          calendar_vivid: '#8080FF',
          color: '#0000FF',
        },
      },
      {
        stage_id: 3,
        percent: 50,
        info: null,
        stage: {
          name: 'Устройство фундамента',
          calendar_dull: '#FFFFD9',
          calendar_vivid: '#FFFF80',
          color: '#FFFF00',
        },
      },
      {
        stage_id: 4,
        percent: 100,
        info: null,
        stage: {
          name: 'Монолит',
          calendar_dull: '#D9FFFF',
          calendar_vivid: '#80FFFF',
          color: '#00FFFF',
        },
      },
      {
        stage_id: 5,
        percent: 99.40986559820925,
        info: null,
        stage: {
          name: 'Кладка',
          calendar_dull: '#FFE8EF',
          calendar_vivid: '#FFB3C9',
          color: '#FF6692',
        },
      },
      {
        stage_id: 6,
        percent: 75.20544740930652,
        info: null,
        stage: {
          name: 'Теплоизоляция',
          calendar_dull: '#F1D9FF',
          calendar_vivid: '#D280FF',
          color: '#A500FF',
        },
      },
      {
        stage_id: 7,
        percent: 75.20544740930652,
        info: null,
        stage: {
          name: 'Подсистема фасада',
          calendar_dull: '#D9F1FF',
          calendar_vivid: '#80D2FF',
          color: '#00A5FF',
        },
      },
      {
        stage_id: 8,
        percent: 73.8549935916894,
        info: null,
        stage: {
          name: 'Облицовка фасада',
          calendar_dull: '#F1FFD9',
          calendar_vivid: '#D2FF80',
          color: '#A5FF00',
        },
      },
      {
        stage_id: 11,
        percent: 79.81850427545524,
        info: null,
        stage: {
          name: 'Работы завершены',
          calendar_dull: '#D9FFF1',
          calendar_vivid: '#80FFD2',
          color: '#00FFA5',
        },
      },
      {
        stage_id: 9,
        percent: 2.188373150150103,
        info: null,
        stage: {
          name: 'Остекление',
          calendar_dull: '#FFF2DF',
          calendar_vivid: '#FFD394',
          color: '#FFA629',
        },
      },
      {
        stage_id: 10,
        percent: 100,
        info: null,
        stage: {
          name: 'Благоустройство',
          calendar_dull: '#E5F8E4',
          calendar_vivid: '#A9E7A4',
          color: '#52CE49',
        },
      },
    ],
  },
  {
    photoId: '9fd70d06-2fc3-46b7-9236-d4a4cb30a0cc',
    report: [
      {
        stage_id: 0,
        percent: 100,
        info: null,
        stage: {
          name: 'Земляные работы',
          calendar_dull: '#FFD9D9',
          calendar_vivid: '#FF8080',
          color: '#FF0000',
        },
      },
      {
        stage_id: 1,
        percent: 100,
        info: null,
        stage: {
          name: 'Шпунтовое ограждение',
          calendar_dull: '#D9F8EF',
          calendar_vivid: '#80E6CB',
          color: '#00CC96',
        },
      },
      {
        stage_id: 2,
        percent: 50,
        info: null,
        stage: {
          name: 'Распорная система',
          calendar_dull: '#D9D9FF',
          calendar_vivid: '#8080FF',
          color: '#0000FF',
        },
      },
      {
        stage_id: 3,
        percent: 50,
        info: null,
        stage: {
          name: 'Устройство фундамента',
          calendar_dull: '#FFFFD9',
          calendar_vivid: '#FFFF80',
          color: '#FFFF00',
        },
      },
      {
        stage_id: 4,
        percent: 100,
        info: null,
        stage: {
          name: 'Монолит',
          calendar_dull: '#D9FFFF',
          calendar_vivid: '#80FFFF',
          color: '#00FFFF',
        },
      },
      {
        stage_id: 5,
        percent: 45.714059051144034,
        info: null,
        stage: {
          name: 'Кладка',
          calendar_dull: '#FFE8EF',
          calendar_vivid: '#FFB3C9',
          color: '#FF6692',
        },
      },
      {
        stage_id: 6,
        percent: 45.243240202246135,
        info: null,
        stage: {
          name: 'Теплоизоляция',
          calendar_dull: '#F1D9FF',
          calendar_vivid: '#D280FF',
          color: '#A500FF',
        },
      },
      {
        stage_id: 7,
        percent: 45.243240202246135,
        info: null,
        stage: {
          name: 'Подсистема фасада',
          calendar_dull: '#D9F1FF',
          calendar_vivid: '#80D2FF',
          color: '#00A5FF',
        },
      },
      {
        stage_id: 8,
        percent: 45.21848347391736,
        info: null,
        stage: {
          name: 'Облицовка фасада',
          calendar_dull: '#F1FFD9',
          calendar_vivid: '#D2FF80',
          color: '#A5FF00',
        },
      },
      {
        stage_id: 11,
        percent: 65.09212070154672,
        info: null,
        stage: {
          name: 'Работы завершены',
          calendar_dull: '#D9FFF1',
          calendar_vivid: '#80FFD2',
          color: '#00FFA5',
        },
      },
      {
        stage_id: 9,
        percent: 19.773203129351945,
        info: null,
        stage: {
          name: 'Остекление',
          calendar_dull: '#FFF2DF',
          calendar_vivid: '#FFD394',
          color: '#FFA629',
        },
      },
      {
        stage_id: 10,
        percent: 0,
        info: null,
        stage: {
          name: 'Благоустройство',
          calendar_dull: '#E5F8E4',
          calendar_vivid: '#A9E7A4',
          color: '#52CE49',
        },
      },
    ],
  },
  {
    photoId: '2191b10c-560d-4f90-8beb-39df2c340f6b',
    report: [
      {
        stage_id: 0,
        percent: 100,
        info: null,
        stage: {
          name: 'Земляные работы',
          calendar_dull: '#FFD9D9',
          calendar_vivid: '#FF8080',
          color: '#FF0000',
        },
      },
      {
        stage_id: 1,
        percent: 100,
        info: null,
        stage: {
          name: 'Шпунтовое ограждение',
          calendar_dull: '#D9F8EF',
          calendar_vivid: '#80E6CB',
          color: '#00CC96',
        },
      },
      {
        stage_id: 2,
        percent: 100,
        info: null,
        stage: {
          name: 'Распорная система',
          calendar_dull: '#D9D9FF',
          calendar_vivid: '#8080FF',
          color: '#0000FF',
        },
      },
      {
        stage_id: 3,
        percent: 100,
        info: null,
        stage: {
          name: 'Устройство фундамента',
          calendar_dull: '#FFFFD9',
          calendar_vivid: '#FFFF80',
          color: '#FFFF00',
        },
      },
      {
        stage_id: 4,
        percent: 100,
        info: null,
        stage: {
          name: 'Монолит',
          calendar_dull: '#D9FFFF',
          calendar_vivid: '#80FFFF',
          color: '#00FFFF',
        },
      },
      {
        stage_id: 5,
        percent: 87.92508986396321,
        info: null,
        stage: {
          name: 'Кладка',
          calendar_dull: '#FFE8EF',
          calendar_vivid: '#FFB3C9',
          color: '#FF6692',
        },
      },
      {
        stage_id: 6,
        percent: 0,
        info: null,
        stage: {
          name: 'Теплоизоляция',
          calendar_dull: '#F1D9FF',
          calendar_vivid: '#D280FF',
          color: '#A500FF',
        },
      },
      {
        stage_id: 7,
        percent: 0,
        info: null,
        stage: {
          name: 'Подсистема фасада',
          calendar_dull: '#D9F1FF',
          calendar_vivid: '#80D2FF',
          color: '#00A5FF',
        },
      },
      {
        stage_id: 8,
        percent: 0,
        info: null,
        stage: {
          name: 'Облицовка фасада',
          calendar_dull: '#F1FFD9',
          calendar_vivid: '#D2FF80',
          color: '#A5FF00',
        },
      },
      {
        stage_id: 11,
        percent: 67.2406362329954,
        info: null,
        stage: {
          name: 'Работы завершены',
          calendar_dull: '#D9FFF1',
          calendar_vivid: '#80FFD2',
          color: '#00FFA5',
        },
      },
      {
        stage_id: 9,
        percent: 0,
        info: null,
        stage: {
          name: 'Остекление',
          calendar_dull: '#FFF2DF',
          calendar_vivid: '#FFD394',
          color: '#FFA629',
        },
      },
      {
        stage_id: 10,
        percent: 100,
        info: null,
        stage: {
          name: 'Благоустройство',
          calendar_dull: '#E5F8E4',
          calendar_vivid: '#A9E7A4',
          color: '#52CE49',
        },
      },
    ],
  },
];
