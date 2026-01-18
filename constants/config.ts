export const API_BASE_URL = __DEV__
  ? 'http://localhost:8080/api/v1'
  : 'https://your-backend-url.com/api/v1';

export const API_ENDPOINTS = {
  LEADERBOARD: '/leaderboard',
  SEARCH_USERS: '/users/search',
  USER_RANK: '/users',
} as const;
