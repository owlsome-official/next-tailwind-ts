import { describe, expect, it } from "vitest";
import { Decode, Encode } from "../encode-decode";

describe("Encode/Decode Utilities", () => {
  describe("Encode", () => {
    it("should encode text to base64", async () => {
      const result = await Encode("Hello World");
      expect(result).toBe("SGVsbG8gV29ybGQ=");
    });

    it("should encode empty string", async () => {
      const result = await Encode("");
      expect(result).toBe("");
    });

    it("should encode Thai text", async () => {
      const result = await Encode("สวัสดี");
      expect(result).toBe("4Liq4Lin4Lix4Liq4LiU4Li1");
    });

    it("should encode special characters", async () => {
      const result = await Encode("Hello@World#123");
      expect(result).toBe("SGVsbG9AV29ybGQjMTIz");
    });
  });

  describe("Decode", () => {
    it("should decode base64 to text", async () => {
      const result = await Decode("SGVsbG8gV29ybGQ=");
      expect(result).toBe("Hello World");
    });

    it("should decode empty string", async () => {
      const result = await Decode("");
      expect(result).toBe("");
    });

    it("should decode Thai text", async () => {
      const result = await Decode("4Liq4Lin4Lix4Liq4LiU4Li1");
      expect(result).toBe("สวัสดี");
    });

    it("should decode special characters", async () => {
      const result = await Decode("SGVsbG9AV29ybGQjMTIz");
      expect(result).toBe("Hello@World#123");
    });
  });

  describe("Encode/Decode Round Trip", () => {
    it("should encode and decode back to original text", async () => {
      const originalText = "Hello World! 123 @#$%";
      const encoded = await Encode(originalText);
      const decoded = await Decode(encoded);
      expect(decoded).toBe(originalText);
    });

    it("should handle Unicode characters", async () => {
      const originalText = "Hello 世界 สวัสดี 🌍";
      const encoded = await Encode(originalText);
      const decoded = await Decode(encoded);
      expect(decoded).toBe(originalText);
    });
  });
});
