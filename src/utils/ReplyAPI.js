import { post } from './index';

export const ReplyAPI = {
  createReply(params) {
    return post('/api/replys', params);
  },
  createLike(params) {
    return post('/api/likes', params);
  },
  deleteLike(params) {
    return post('/api/likes/delete', params);
  },
};
