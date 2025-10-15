/* eslint-disable @next/next/no-img-element */
import { vi } from "vitest";

vi.mock("next/image", () => ({
  default: vi.fn(({ src, alt, ...props }) => (
    <img
      src={src}
      alt={alt}
      {...props}
      data-testid={props["data-testid"] ?? "image"}
    />
  )),
}));
