import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  BAD_REQUEST_MESSAGE,
  CONFLICT_MESSAGE,
  FORBIDDEN_MESSAGE,
  HTTP_STATUS_CODE,
  INTERNAL_SERVER_ERROR_MESSAGE,
  SERVER_UNREACHABLE_MESSAGE,
  UNAUTHORIZED_MESSAGE,
} from "../constant";
import fetcher from "../fetcher";

// Mock fetch globally
global.fetch = vi.fn();

describe("fetcher", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should make a successful request", async () => {
    const mockResponse = { data: "test" };
    const mockFetch = vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockResponse),
    } as Response);

    const result = await fetcher({
      url: "https://api.example.com/test",
    });

    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.example.com/test",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          "Content-Type": "application/json",
        }),
      }),
    );

    expect(result).toEqual({
      status: 200,
      data: mockResponse,
    });
  });

  it("should handle 400 Bad Request", async () => {
    const mockError = { error: "Bad request" };
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: () => Promise.resolve(mockError),
    } as Response);

    const result = await fetcher({
      url: "https://api.example.com/test",
    });

    expect(result).toEqual({
      status: 400,
      error: BAD_REQUEST_MESSAGE,
      rawError: mockError,
    });
  });

  it("should handle 401 Unauthorized", async () => {
    const mockError = { error: "Unauthorized" };
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: () => Promise.resolve(mockError),
    } as Response);

    const result = await fetcher({
      url: "https://api.example.com/test",
    });

    expect(result).toEqual({
      status: 401,
      error: UNAUTHORIZED_MESSAGE,
      rawError: mockError,
    });
  });

  it("should handle 403 Forbidden", async () => {
    const mockError = { error: "Forbidden" };
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      status: 403,
      json: () => Promise.resolve(mockError),
    } as Response);

    const result = await fetcher({
      url: "https://api.example.com/test",
    });

    expect(result).toEqual({
      status: 403,
      error: FORBIDDEN_MESSAGE,
      rawError: mockError,
    });
  });

  it("should handle 409 Conflict", async () => {
    const mockError = { error: "Conflict" };
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      status: 409,
      json: () => Promise.resolve(mockError),
    } as Response);

    const result = await fetcher({
      url: "https://api.example.com/test",
    });

    expect(result).toEqual({
      status: 409,
      error: CONFLICT_MESSAGE,
      rawError: mockError,
    });
  });

  it("should handle 502 Bad Gateway", async () => {
    const mockError = { error: "Bad Gateway" };
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      status: 502,
      json: () => Promise.resolve(mockError),
    } as Response);

    const result = await fetcher({
      url: "https://api.example.com/test",
    });

    expect(result).toEqual({
      status: 502,
      error: SERVER_UNREACHABLE_MESSAGE,
      rawError: mockError,
    });
  });

  it("should handle unknown error status", async () => {
    const mockError = { error: "Unknown error" };
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      status: 418,
      json: () => Promise.resolve(mockError),
    } as Response);

    const result = await fetcher({
      url: "https://api.example.com/test",
    });

    expect(result).toEqual({
      status: 418,
      error: INTERNAL_SERVER_ERROR_MESSAGE,
      rawError: mockError,
    });
  });

  it("should handle network errors", async () => {
    vi.mocked(fetch).mockRejectedValueOnce(new Error("Network error"));

    const result = await fetcher({
      url: "https://api.example.com/test",
    });

    expect(result).toEqual({
      status: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
      error: INTERNAL_SERVER_ERROR_MESSAGE,
    });
  });

  it("should use custom options", async () => {
    const mockResponse = { data: "test" };
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockResponse),
    } as Response);

    await fetcher({
      url: "https://api.example.com/test",
      options: {
        method: "GET",
        headers: {
          "Custom-Header": "custom-value",
        },
      },
    });

    expect(fetch).toHaveBeenCalledWith(
      "https://api.example.com/test",
      expect.objectContaining({
        method: "GET",
        headers: expect.objectContaining({
          "Content-Type": "application/json",
          "Custom-Header": "custom-value",
        }),
      }),
    );
  });
});
