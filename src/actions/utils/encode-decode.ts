"use server";

export const Encode = async (text: string): Promise<string> => {
  return Buffer.from(text).toString("base64");
};
export const Decode = async (cipher: string): Promise<string> => {
  return Buffer.from(cipher, "base64").toString();
};
