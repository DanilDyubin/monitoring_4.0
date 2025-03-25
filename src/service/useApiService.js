import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useHttp } from './http.hook';

const useApiService = () => {
  const { loading, request, error, clearError } = useHttp();

  const API_BASE = 'https://msi.construction-monitoring.contextmachine.cloud/';
  const calendarItems = useSelector((state) => state.schedule.items);

  const navigate = useNavigate();
  // создание проекта
  const createProject = async (formData) => {
    const { uin, address, floor_count } = formData;

    // const url = `${API_BASE}create_project?uin=${encodeURIComponent(
    //   uin
    // )}&address=${encodeURIComponent(address)}&floor_count=${encodeURIComponent(
    //   Number(floor_count)
    // )}&info=""`;
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
      console.log(result);
      navigate(`/project/${result.id}`);
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

  const usersPhotosUpload = async (projectId, shotDate, photos) => {
    const loadDate = new Date().getTime();

    const formData = new FormData();
    photos.forEach((photo) => formData.append('upl_img', photo));

    const url = `${API_BASE}create_upload_and_photos?project_id=${encodeURIComponent(
      projectId
    )}&load_date=${encodeURIComponent(loadDate)}&shot_date=${encodeURIComponent(
      shotDate
    )}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error(`Ошибка загрузки: ${response.status}`);
      }

      const result = await response.json();
      console.log(
        `Photos - ${result?.data?.insert_msi_sf_photo?.returning[0].upload_id}`
      );

      return result?.data?.insert_msi_sf_photo?.returning[0].upload_id;
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  const getPhotos = async (id) => {
    try {
      const response = await fetch(`${API_BASE}get_photos?upload_id=${id}`);

      if (!response.ok) {
        throw new Error(`Error, status: ${response.status}`);
      }

      const result = await response.json();
      console.log(`getPhotos - ${JSON.stringify(result)}`);
      return result;
    } catch (e) {
      console.error(e.message);
      throw e;
    }
  };

  // const deletePhoto = async (id) => {
  //   const url = `${API_BASE}delete_photo?photo_id=${id}`;

  //   try {
  //     const response = await fetch(url, {
  //       method: 'DELETE',
  //     });

  //     if (!response.ok) {
  //       throw new Error(`Error, status: ${response.status}`);
  //     }
  //   } catch (e) {
  //     console.error(e.message);
  //     throw e;
  //   }
  // };
  const deletePhoto = async (id) => {
    const url = `${API_BASE}delete_photo?photo_id=${id}`;

    await request(url, 'DELETE');
  };

  const createCalendar = async (projectId) => {
    const url = `${API_BASE}create_calendar?project_id=${projectId}&make_str=true`;

    if (!Array.isArray(calendarItems) || calendarItems.length === 0) {
      console.error('Ошибка: calendarItems пуст или имеет неверный формат');
      return;
    }

    const sendItems = calendarItems.map((item) => {
      return {
        id: item.id,
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
      const responseData = await response.json();
      console.log('Успешный ответ:', responseData);
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

  return {
    createProject,
    getProject,
    usersPhotosUpload,
    getPhotos,
    deletePhoto,
    createCalendar,
    getCalendar,
    createPredict,
    getMainReport,
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

//getCalendar

// [
//   {
//     project_id: 'bab6235e-6f2f-4456-b562-5ae94132a75a',
//     stage_id: 0,
//     plan_start: '2025-02-23',
//     plan_end: '2025-03-29',
//     fact_start: '2025-03-23',
//     fact_end: '2025-03-24',
//   },
//   {
//     project_id: 'bab6235e-6f2f-4456-b562-5ae94132a75a',
//     stage_id: 1,
//     plan_start: '2025-03-04',
//     plan_end: '2025-03-21',
//     fact_start: '2025-03-23',
//     fact_end: '2025-03-24',
//   },
//   {
//     project_id: 'bab6235e-6f2f-4456-b562-5ae94132a75a',
//     stage_id: 2,
//     plan_start: '2025-02-23',
//     plan_end: '2025-03-07',
//     fact_start: '2025-03-23',
//     fact_end: '2025-03-24',
//   },
//   {
//     project_id: 'bab6235e-6f2f-4456-b562-5ae94132a75a',
//     stage_id: 3,
//     plan_start: '2025-04-03',
//     plan_end: '2025-04-06',
//     fact_start: '2025-03-23',
//     fact_end: '2025-03-24',
//   },
//   {
//     project_id: 'bab6235e-6f2f-4456-b562-5ae94132a75a',
//     stage_id: 4,
//     plan_start: '2025-03-22',
//     plan_end: '2025-03-28',
//     fact_start: '2025-03-23',
//     fact_end: '2025-03-24',
//   },
//   {
//     project_id: 'bab6235e-6f2f-4456-b562-5ae94132a75a',
//     stage_id: 5,
//     plan_start: '2025-04-10',
//     plan_end: '2025-04-18',
//     fact_start: '2025-03-23',
//     fact_end: '2025-03-24',
//   },
// ];
