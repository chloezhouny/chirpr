import axios from 'axios';
import Vconsole from 'vconsole';
import { Toast } from 'antd-mobile';
import moment from 'moment';
import { isMobile } from 'react-device-detect';

export const startVconsole = () => isMobile && new Vconsole();

export const fileByBase64 = (file) => new Promise((r) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (e) => {
    r(e.target.result);
  };
});

export const timeDiff = (time) => {
  const hours = moment().diff(time, 'hours');
  if (hours > 23) {
    return moment(time).format('MMM Do');
  }
  if (hours > 0) {
    return `${hours}h`;
  }
  const min = moment().diff(time, 'minutes');
  return `${min || 1}m`;
};

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
export const del = (url) => axios.delete(url);
