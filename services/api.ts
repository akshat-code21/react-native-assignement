import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from 'constants/config';
import { LeaderboardResponse, UserRankResponse, UserSearchResponse } from 'types';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const leaderboardApi = {
  getLeaderboard: async (page: number, limit: number): Promise<LeaderboardResponse> => {
    const response = await api.get(API_ENDPOINTS.LEADERBOARD, {
      params: {
        page,
        limit,
      },
    });
    return response.data;
  },
  searchUsers: async (query: string, limit: number): Promise<UserSearchResponse> => {
    const response = await api.get(API_ENDPOINTS.SEARCH_USERS, {
      params: {
        q: query, // API expects 'q' not 'query'
        limit,
      },
    });
    return response.data;
  },
  getUserRank: async (username: string): Promise<UserRankResponse> => {
    const response = await api.get(`${API_ENDPOINTS.USER_RANK}/${username}/rank`);
    return response.data;
  },
};

export default api;
