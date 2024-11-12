import { cookies } from "next/headers";
import {
  BASE_URL_API,
  HTTP_STATUS_CODE,
  NETWORK_ERROR_TEXT,
  TOKEN_HEADER_NAME,
  TOKEN_KEY_NAME,
} from "./constant";

const updateOptions = async (options?: RequestInit) => {
  const update = { method: "POST", ...options };
  const store = await cookies();
  const valueToken = store.get(TOKEN_KEY_NAME)?.value || "";
  if (valueToken) {
    update.headers = {
      "Content-Type": "application/json",
      ...update.headers,
      [TOKEN_HEADER_NAME]: valueToken,
    };
  }
  return update;
};

export type Fetcher = {
  url: string;
  options?: RequestInit;
  isAbsolutePath?: boolean;
  isBlobResponse?: boolean;
};
export type ResponseTemplate = {
  status: number;
  data?: typeof Object | Array<typeof Object> | Blob;
  error?: string;
};
const fetcher = async ({
  url,
  options,
  isAbsolutePath,
  isBlobResponse,
}: Fetcher): Promise<ResponseTemplate> => {
  const logger = console;
  try {
    const target = isAbsolutePath ? url : `${BASE_URL_API}${url}`;
    logger.info({
      fetch: target,
      nextOptions: options?.next,
    });
    const response = await fetch(target, await updateOptions(options));
    const result: ResponseTemplate = {
      status: response.status,
      data: isBlobResponse ? await response.blob() : await response.json(),
    };
    return result;
  } catch (error) {
    logger.error(error);
    return {
      status: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
      error: NETWORK_ERROR_TEXT,
    };
  }
};
export default fetcher;
