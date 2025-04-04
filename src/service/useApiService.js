import { useSelector, useDispatch } from 'react-redux';

import { useHttp } from './http.hook';

const useApiService = () => {
  const { loading, request, error, clearError } = useHttp();

  const API_BASE = 'https://msi.construction-monitoring.contextmachine.cloud/';
  const calendarItems = useSelector((state) => state.schedule.items);
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
  const getProject = async (id) => {
    try {
      const response = await fetch(`${API_BASE}get_project?id=${id}`);

      if (!response.ok) {
        throw new Error(`Error, status: ${response.status}`);
      }

      const result = await response.json();
      console.log(`getProject - ${JSON.stringify(result)}`);
      return result;
    } catch (e) {
      console.error(e.message);
      throw e;
    }
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
    console.log(`Отправка запроса: ${url}`);
    console.log('Данные:', JSON.stringify(sendItems));

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
    const url = `${API_BASE}get_calendar?project_id=${id}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error, status: ${response.status}`);
      }

      const result = await response.json();
      console.log(`getCalendar - ${JSON.stringify(result)}`);
      return result;
    } catch (e) {
      console.error(e.message);
      throw e;
    }
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
    const url = `${API_BASE}get_main_report?upload_id=${id}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error, status: ${response.status}`);
      }
      const result = await response.json();
      console.log(`getMainReport - ${JSON.stringify(result)}`);
      return result;
    } catch (e) {
      console.error(e.message);
      throw e;
    }
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
    createProject,
    getProject,
    createUpload,
    uploadPhotos,
    getPhotos,
    deletePhoto,
    createCalendar,
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

const getMainReport = [
  {
    percent: 100,
    stage_id: 0,
    stage: {
      name: 'Земляные работы',
      color: '#FF0000',
      calendar_dull: '#FFD9D9',
      calendar_vivid: '#FF8080',
      calendars: [
        {
          fact_end: '2025-04-02',
          fact_start: '2025-04-01',
          info: null,
          percent: 100,
          report_date: '2025-04-02',
          plan_end: '2025-04-26',
          plan_start: '2025-03-31',
        },
      ],
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
      calendars: [],
    },
  },
  {
    percent: 100,
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
    percent: 83.33,
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
    percent: 66.67,
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
    percent: 43.28,
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
    percent: 31.54,
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
    percent: 31.54,
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
    percent: 14.72,
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
    percent: 57.44,
    stage_id: 11,
    stage: {
      name: 'Работы завершены',
      color: '#00FFA5',
      calendar_dull: '#D9FFF1',
      calendar_vivid: '#80FFD2',
      calendars: [],
    },
  },
  {
    percent: 21.3,
    stage_id: 9,
    stage: {
      name: 'Остекление',
      color: '#FFA629',
      calendar_dull: '#FFF2DF',
      calendar_vivid: '#FFD394',
      calendars: [],
    },
  },
  {
    percent: 0,
    stage_id: 10,
    stage: {
      name: 'Благоустройство',
      color: '#52CE49',
      calendar_dull: '#E5F8E4',
      calendar_vivid: '#A9E7A4',
      calendars: [],
    },
  },
];

const photosReport = [
  {
    photoId: '62cc1c43-8963-4d4d-926d-9a84f534ff13',
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
        percent: 29.905142835336495,
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
        percent: 59.98814285441706,
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
    photoId: '93faffcb-f04f-419c-b86d-52afe793a92d',
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
        percent: 0,
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
        percent: 0,
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
        percent: 25,
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
    photoId: 'b28f9ccd-9972-4dd0-96cb-4ce1d3285889',
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
        percent: 99.94843538390477,
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
        percent: 94.61474109107662,
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
        percent: 94.60790464357217,
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
        percent: 44.15256300124853,
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
        percent: 87.32517690916407,
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
        percent: 63.893924175310744,
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
];
