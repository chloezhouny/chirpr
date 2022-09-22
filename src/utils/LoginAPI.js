import { get, put } from './index';

// eslint-disable-next-line import/prefer-default-export
export const LoginAPI = {
  login(username, password) {
    return get(`/api/login/${username}/${password}`);
  },
  getUser(id) {
    return get(`/api/users/${Number(id)}`);
  },
  updateUser(id, params) {
    return put(`/api/users/${Number(id)}`, params);
  },
};
