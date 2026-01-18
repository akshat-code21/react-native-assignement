export interface LeaderboardEntry {
    rank: number;
    username: string;
    rating: number;
  }
  
  export interface LeaderboardResponse {
    entries: LeaderboardEntry[];
    page: number;
    limit: number;
    total: number;
  }
  
  export interface UserSearchResponse {
    users: LeaderboardEntry[];
    count: number;
  }
  
  export interface UserRankResponse {
    username: string;
    rating: number;
    rank: number;
  }