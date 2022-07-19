import { get } from './index';

const LoginAPI = (username, password) => get(`/api/login/${username}/${password}`);

export default LoginAPI;
