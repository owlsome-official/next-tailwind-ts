import "@testing-library/jest-dom";
import { afterEach, vi } from "vitest";

// Mock server-only module for tests
vi.mock("server-only", () => ({}));

// Global mocks for security component tests
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock window.location
Object.defineProperty(window, "location", {
  value: {
    origin: "http://localhost:3000",
    href: "http://localhost:3000",
    pathname: "/",
    search: "",
    hash: "",
  },
  writable: true,
});

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  log: vi.fn(),
  debug: vi.fn(),
  info: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
};

// Mock Image constructor for Next.js Image component
global.Image = vi.fn().mockImplementation(() => ({
  src: "",
  onload: vi.fn(),
  onerror: vi.fn(),
}));

// Mock navigator.mediaDevices for webcam
Object.defineProperty(navigator, "mediaDevices", {
  value: {
    getUserMedia: vi.fn().mockResolvedValue({
      getTracks: vi.fn().mockReturnValue([
        {
          stop: vi.fn(),
        },
      ]),
    }),
  },
  writable: true,
});

// Mock URL.createObjectURL
global.URL.createObjectURL = vi.fn().mockReturnValue("blob:mock-url");
global.URL.revokeObjectURL = vi.fn();

// Mock fetch for any API calls
global.fetch = vi.fn();

// Clean up after each test
afterEach(() => {
  vi.clearAllMocks();

  // Force garbage collection if available
  if (global.gc) {
    global.gc();
  }

  // Clear any timers
  vi.clearAllTimers();

  // Clear any intervals
  if (typeof window !== "undefined") {
    // Clear any pending timeouts/intervals
    const highestTimeoutId = setTimeout(() => {}, 0);
    for (let i = 0; i < Number(highestTimeoutId); i++) {
      clearTimeout(i);
      clearInterval(i);
    }
  }
});
