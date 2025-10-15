import {
  BAD_REQUEST_MESSAGE,
  CONFLICT_MESSAGE,
  FORBIDDEN_MESSAGE,
  HTTP_STATUS_CODE,
  INTERNAL_SERVER_ERROR_MESSAGE,
  SERVER_UNREACHABLE_MESSAGE,
  UNAUTHORIZED_MESSAGE,
} from "./constant";

const updateOptions = async (options?: RequestInit) => {
  const update = { method: "POST", ...options };
  update.headers = {
    "Content-Type": "application/json",
    ...update.headers,
  };
  return update;
};

export type Fetcher = {
  url: string;
  options?: RequestInit;
};
export type ResponseTemplate<T> = {
  status: number;
  data?: T;
  error?: string;
  rawError?: any;
};
const fetcher = async <T>({
  url,
  options,
}: Fetcher): Promise<ResponseTemplate<T>> => {
  const logger = console;
  try {
    logger.info({
      fetch: url,
    });
    const response = await fetch(url, await updateOptions(options));
    if (!response.ok) {
      const rawError = await response.json();
      switch (response.status) {
        case HTTP_STATUS_CODE.BAD_GATEWAY:
          return {
            status: response.status,
            error: SERVER_UNREACHABLE_MESSAGE,
            rawError: rawError,
          };
        case HTTP_STATUS_CODE.BAD_REQUEST:
          logger.info({ rawError });
          return {
            status: response.status,
            error: BAD_REQUEST_MESSAGE,
            rawError: rawError,
          };
        case HTTP_STATUS_CODE.UNAUTHORIZED:
          return {
            status: response.status,
            error: UNAUTHORIZED_MESSAGE,
            rawError: rawError,
          };
        case HTTP_STATUS_CODE.FORBIDDEN:
          return {
            status: response.status,
            error: FORBIDDEN_MESSAGE,
            rawError: rawError,
          };
        case HTTP_STATUS_CODE.CONFLICT:
          return {
            status: response.status,
            error: CONFLICT_MESSAGE,
            rawError: rawError,
          };
        default:
          return {
            status: response.status,
            error: INTERNAL_SERVER_ERROR_MESSAGE,
            rawError: rawError,
          };
      }
    }
    const result: ResponseTemplate<T> = {
      status: response.status,
      data: (await response.json()) as T,
    };
    return result;
  } catch (error) {
    logger.error(error);
    return {
      status: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
      error: INTERNAL_SERVER_ERROR_MESSAGE,
    };
  }
};
export default fetcher;
