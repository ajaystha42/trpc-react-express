import { CreateExpressContextOptions } from "@trpc/server/adapters/express";

export function createContext({ req, res }: CreateExpressContextOptions) {
  // jwt verification
  return {
    isAdmin: false,
    req,
    res,
  };
}
