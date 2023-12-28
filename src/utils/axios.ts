import axios from "axios";

const config = {
  baseURL: process.env.BASE_URL_API,
  withCredentials: true,
};
const Client = axios.create(config);

// NOTE: [Optional] for cache axios instance, use `setupCache` from `axios-cache-interceptor`
// export const ClientWithCache = setupCache(axios.create(config));

// Request interceptor for API calls
Client.interceptors.request.use(
  async (config) => {
    // NOTE: An Idea for token attached
    // let token = UtilsStorage.Cookies.get(STORAGE_KEY_TOKEN);
    // if (token) {
    //   config.headers["Authorization"] =
    //     config.headers["Authorization"] || `Bearer ${token}`;
    // } else {
    //   throw Error(EXPIRED_TOKEN_TEXT);
    // }
    return config;
  },
  (error) => {
    // console.error(error);
    Promise.reject(error);
  }
);
// Response interceptor for API calls
Client.interceptors.response.use(
  (response) => {
    // NOTE: An Idea for extending token expire time
    // UtilsStorage.Cookies.extend(STORAGE_KEY_TOKEN);
    return response;
  },
  async function (error) {
    // console.error(error);
    return Promise.reject(error);
  }
);

export const HttpStatusCode = axios.HttpStatusCode;
export default Client;
