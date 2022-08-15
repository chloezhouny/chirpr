import { post } from './index';

export const ReplyAPI = {
  createReply(params) {
    return post('/api/replys', params);
  },
};
