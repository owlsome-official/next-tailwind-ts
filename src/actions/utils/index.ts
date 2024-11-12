"use server";

const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const SSRDelay = async (someText?: string) => {
  // NOTE: Simulate expensive calculate.
  await delay(5000);

  // NOTE: return UPPERCASE of input text after delay
  return someText ? someText.toUpperCase() : null;
};
