import { describe, expect, it, vi } from "vitest";

// Mock server-only module
vi.mock("server-only", () => ({}));

import { serverLog } from "../logging";

describe("Logging Utilities", () => {
  describe("serverLog", () => {
    it("should be the same as console.log", () => {
      expect(serverLog).toBe(console.log);
    });

    it("should be a function", () => {
      expect(typeof serverLog).toBe("function");
    });

    it("should accept multiple arguments", () => {
      // This test verifies that serverLog can be called with multiple arguments
      // without throwing an error
      expect(() => {
        serverLog("test", 123, { key: "value" });
      }).not.toThrow();
    });

    it("should handle null and undefined", () => {
      expect(() => {
        serverLog(null);
        serverLog(undefined);
      }).not.toThrow();
    });

    it("should handle empty string", () => {
      expect(() => {
        serverLog("");
      }).not.toThrow();
    });

    it("should handle special characters", () => {
      expect(() => {
        serverLog("!@#$%^&*()_+-=[]{}|;':\",./<>?");
      }).not.toThrow();
    });

    it("should handle Thai characters", () => {
      expect(() => {
        serverLog("สวัสดีชาวโลก");
      }).not.toThrow();
    });

    it("should handle emoji characters", () => {
      expect(() => {
        serverLog("Hello 🌍 World 🚀");
      }).not.toThrow();
    });

    it("should handle objects", () => {
      expect(() => {
        serverLog({ name: "Test Object", value: 42 });
      }).not.toThrow();
    });

    it("should handle arrays", () => {
      expect(() => {
        serverLog([1, 2, 3, "string", { key: "value" }]);
      }).not.toThrow();
    });

    it("should handle complex nested structures", () => {
      expect(() => {
        serverLog({
          name: "Complex Object",
          items: [1, 2, 3],
          nested: {
            deep: {
              value: "test",
            },
          },
        });
      }).not.toThrow();
    });
  });
});
