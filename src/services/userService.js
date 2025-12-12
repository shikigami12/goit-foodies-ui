import api, { createFormData } from './api';
import { API_ENDPOINTS } from '../constants';
import '../models';

/**
 * Get current user with stats
 * @returns {Promise<import('../models').UserWithStatsResponse>}
 */
const getCurrentUser = async () => {
  const { data } = await api.get(API_ENDPOINTS.USERS.CURRENT);
  return data;
};

/**
 * Get user by ID with stats
 * @param {string} id - User UUID
 * @returns {Promise<import('../models').UserWithStatsResponse>}
 */
const getUserById = async (id) => {
  const { data } = await api.get(API_ENDPOINTS.USERS.BY_ID(id));
  return data;
};

/**
 * Update current user's avatar
 * @param {File} avatarFile - Image file
 * @returns {Promise<import('../models').UserResponse>}
 */
const updateAvatar = async (avatarFile) => {
  const formData = createFormData({ avatar: avatarFile });
  const { data } = await api.patch(API_ENDPOINTS.USERS.AVATAR, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

/**
 * Get user's followers
 * @param {string} userId - User UUID
 * @returns {Promise<import('../models').FollowersResponse>}
 */
const getFollowers = async (userId) => {
  const { data } = await api.get(API_ENDPOINTS.USERS.FOLLOWERS(userId));
  return data;
};

/**
 * Get current user's following list
 * @returns {Promise<import('../models').FollowingResponse>}
 */
const getFollowing = async () => {
  const { data } = await api.get(API_ENDPOINTS.USERS.FOLLOWING);
  return data;
};

/**
 * Follow a user
 * @param {string} userId - User UUID to follow
 * @returns {Promise<import('../models').MessageResponse>}
 */
const followUser = async (userId) => {
  const { data } = await api.post(API_ENDPOINTS.USERS.FOLLOW(userId));
  return data;
};

/**
 * Unfollow a user
 * @param {string} userId - User UUID to unfollow
 * @returns {Promise<void>}
 */
const unfollowUser = async (userId) => {
  await api.delete(API_ENDPOINTS.USERS.UNFOLLOW(userId));
};

export const userService = {
  getCurrentUser,
  getUserById,
  updateAvatar,
  getFollowers,
  getFollowing,
  followUser,
  unfollowUser,
};
