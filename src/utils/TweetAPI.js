import { get, post, put } from './index';

export const TweetAPI = {
  createTweet(params) {
    return post('/api/tweets', params);
  },
  getFeeds() {
    return get('/api/tweets').then((res) => {
      if (res.data && res.data.length > 0) {
        return res.data.reverse();
      }
      return [];
    });
  },
  getTweet(id) {
    return get(`/api/tweets/${Number(id)}`);
  },
  getTweetsByUserId(userId) {
    return get(`/api/tweets/user/${Number(userId)}`);
  },
  updateTweet(id, params) {
    return put(`/api/tweets/${Number(id)}`, params);
  },
};
