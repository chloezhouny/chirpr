import {
  get, post, put, del,
} from './index';

// eslint-disable-next-line import/prefer-default-export
export const UserAPI = {
  getUser(id) {
    return get(`/api/users/${Number(id)}`);
  },
  updateUser(id, params) {
    return put(`/api/users/${Number(id)}`, params);
  },
  getAllUsers() {
    return get('/api/users');
  },
  getFollowers(userId) {
    return get(`/api/friendships/${Number(userId)}/followers`);
  },
  getFollowings(userId) {
    return get(`/api/friendships/${Number(userId)}/followings`);
  },
  createFollowing(params) {
    return post('/api/friendships/following', params);
  },
  deleteFollowing(id) {
    return del(`/api/friendships/following/${Number(id)}`);
  },
  isFollowing(userId, targetUserId) {
    return get(`/api/friendships/${Number(userId)}/following/${Number(targetUserId)}`);
  },
};
