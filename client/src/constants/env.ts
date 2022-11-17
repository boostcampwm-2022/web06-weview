export const SERVER_URL = import.meta.env.VITE_SERVER_URL as string; // 서버 전체 URL
export const API_SERVER_URL = `${SERVER_URL}/api`; // API 서버 URL
export const LOCAL_URL = import.meta.env.VITE_LOCAL_URL as string; // 웹서버 localhost
export const GITHUB_AUTH_SERVER_URL = import.meta.env
  .VITE_GITHUB_AUTH_SERVER_URL as string; // github login url
export const API_MODE = import.meta.env.VITE_API_MODE as string; // api mode
