import {
  get, post, put, del,
} from './index';

export const ReplyAPI = {
  createReply(params) {
    return post('/api/replys', params);
  },
  getReply(id) {
    return get(`/api/replys/${Number(id)}`);
  },
  getReplysByTweet(tweetId) {
    return get(`/api/replys/tweet/${Number(tweetId)}`);
  },
  updateReply(id, params) {
    return put(`/api/replys/${Number(id)}`, params);
  },
  createLike(params) {
    return post('/api/likes', params);
  },
  getLikesByTweet(tweetId) {
    return get(`/api/likes/tweet/${Number(tweetId)}`);
  },
  getLikesByComment(commentId) {
    return get(`/api/likes/comment/${Number(commentId)}`);
  },
  getLikesByUser(userId) {
    return get(`/api/likes/user/${Number(userId)}`);
  },
  getIsLiked(userId, tweetId) {
    return get(`/api/likes/isLiked/${Number(userId)}/${Number(tweetId)}`);
  },
  getIsLikedComment(userId, commentId) {
    return get(`/api/likes/isLiked/comment/${Number(userId)}/${Number(commentId)}`);
  },
  deleteLike(likedId) {
    return del(`/api/likes/${Number(likedId)}`);
  },
};
