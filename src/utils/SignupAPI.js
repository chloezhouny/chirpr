import { post } from './index';

const SignupAPI = (params) => post('/api/accounts/signup', params);

export default SignupAPI;
