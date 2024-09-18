import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

const useAxios = (): AxiosInstance => {
  const Axios: AxiosInstance = axios.create({
    baseURL: 'https://tempapi.vyqdabills.com',
    // headers: { "x-access-token": localStorage.getItem("token") as string },
  });

  Axios.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      const { status } = error.response as { status: number };
      if (status === 401) {
        localStorage.clear();
        window.location.href = "/";
      }
      return Promise.reject(error);
    }
  );
  return Axios;
};

export default useAxios;