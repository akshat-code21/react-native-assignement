export const API_BASE_URL = __DEV__
  ? 'http://localhost:8080/api/v1'
  : process.env.API_BASE_URL;

export const API_ENDPOINTS = {
  LEADERBOARD: '/leaderboard',
  SEARCH_USERS: '/users/search',
  USER_RANK: '/users',
} as const;
