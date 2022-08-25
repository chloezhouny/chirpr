import { post } from './index';

export const TweetAPI = {
  createTweet(params) {
    return post('/api/tweets', params);
  },
};
