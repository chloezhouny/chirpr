import { get, post, del } from './index';

export const ReplyAPI = {
  createReply(params) {
    return post('/api/replys', params);
  },
  createLike(params) {
    return post('/api/likes', params);
  },
  getLikesByTweet(tweetId) {
    return get(`/api/likes/tweet/${Number(tweetId)}`);
  },
  getLikesByComment(commentId, tweetId) {
    return get(`/api/likes/comment/${Number(commentId)}/${Number(tweetId)}`);
  },
  getLikesByUser(userId) {
    return get(`/api/likes/user/${Number(userId)}`);
  },
  getIsLiked(userId, tweetId) {
    return get(`/api/likes/isLiked/${Number(userId)}/${Number(tweetId)}`);
  },
  deleteLike(likedId) {
    return del(`/api/likes/${Number(likedId)}`);
  },
};
