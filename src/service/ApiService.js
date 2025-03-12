import { useNavigate } from 'react-router-dom';

const useApiService = () => {
  const API_BASE = 'https://msi.construction-monitoring.contextmachine.cloud/';

  const navigate = useNavigate();

  const createProject = async (formData) => {
    const { uin, address, info } = formData;

    const url = `${API_BASE}create_project?uin=${encodeURIComponent(
      uin
    )}&address=${encodeURIComponent(address)}&info=${encodeURIComponent(info)}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Error, status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      navigate(`project/${data.id}`);
    } catch (e) {
      console.error(e.message);
      throw e;
    }
  };

  const usersPhotosUpload = () => {};

  return { createProject, usersPhotosUpload };
};

export default useApiService;
