import axios from 'axios';
import Vconsole from 'vconsole';
import { Toast } from 'antd-mobile';
import { isMobile } from 'react-device-detect';

export const startVconsole = () => isMobile && new Vconsole();

const baseURL = 'http://localhost:3333';
axios.interceptors.request.use((config) => ({
  ...config,
  url: baseURL + config.url,
}));

axios.interceptors.response.use(
  (res) => res.data,
  (err) => {
    Toast.show(err.message);
  },
);

export const get = (url) => axios.get(url);
export const post = (url, params) => axios.post(url, params);
export const put = (url, params) => axios.put(url, params);
export const del = (url, params) => axios.del(url, params);
