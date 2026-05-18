const configuredApiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const defaultApiBaseUrl = import.meta.env.PROD
  ? "/api"
  : "http://localhost:5000/api";

export const apiBaseUrl = (configuredApiBaseUrl || defaultApiBaseUrl).replace(
  /\/+$/,
  ""
);
