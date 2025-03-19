import { useNavigate } from 'react-router-dom';
import { useHttp } from './http.hook';

const useApiService = () => {
  // const { request, loading, error } = useHttp();

  const API_BASE = 'https://msi.construction-monitoring.contextmachine.cloud/';

  const navigate = useNavigate();
  // создание проекта
  const createProject = async (formData) => {
    const { uin, address, info } = formData;

    const url = `${API_BASE}create_project?uin=${encodeURIComponent(
      uin
    )}&address=${encodeURIComponent(address)}&info=${encodeURIComponent(info)}`;

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
      navigate(`/project/${result}`);
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

  const usersPhotosUpload = () => {};

  return { createProject, usersPhotosUpload, getProject };
};

export default useApiService;

// const createProjectHttp = async (formData) => {
//   const { uin, address, info } = formData;

//   const url = `${API_BASE}create_project?uin=${encodeURIComponent(
//     uin
//   )}&address=${encodeURIComponent(address)}&info=${encodeURIComponent(info)}`;

//   request(url, 'POST');
// };
