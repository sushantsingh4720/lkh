import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';



const useAxios = (): AxiosInstance => {
  const FYear = getFYear()
  const Axios: AxiosInstance = axios.create({
    baseURL: 'https://tempapi.vyqdabills.com',
    headers: { token: localStorage.getItem("token") as string, 'fy_id': FYear?.value },

  });

  Axios.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      // const { status } = error.response as { status: number };
      // if (status === 401) {
      //   localStorage.clear();
      //   window.location.href = "/";
      // }
      return Promise.reject(error);
    }
  );
  return Axios;
};

export default useAxios;

function getFYear() {
  const currentDate: Date = new Date();
  const currentYear: number = currentDate.getFullYear();
  const nextYear: number = currentYear + 1;

  const fiscalYearLabel: string = `FY ${currentYear}-${nextYear}`;
  const fiscalYearValue: string = String(currentYear).slice(-2);

  let FYear: { label: string; value: string } = {
    label: fiscalYearLabel,
    value: fiscalYearValue,
  };
  return FYear
}