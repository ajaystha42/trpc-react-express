import { CreateExpressContextOptions } from "@trpc/server/adapters/express";

export function createContext({ req, res }: CreateExpressContextOptions) {
  // jwt verification
  return {
    isAuthorized: true,
    req,
    res,
  };
}
