import { t } from "../trpc";
import jwt from "jsonwebtoken";
import { userRouter } from "./users";
import { z } from "zod";

export const appRouter = t.router({
  helloWorld: t.procedure.query(() => {
    {
      return "Hello world!";
    }
  }),
  log: t.procedure
    .input((v) => {
      if (typeof v === "string") return v;
      throw new Error("String Expected");
    })
    .mutation((req) => {
      console.log(`Client says:  ${req.input}`);
      return true;
    }),
  login: t.procedure
    .input(z.object({ id: z.string(), name: z.string() }))
    .query(({ input }) => {
      const token = jwt.sign(
        { _id: input.id, name: input.name },
        "____fusemachines____",
        {
          expiresIn: "1h",
        }
      );

      return { id: input.id, name: input.name, token: `Bearer ${token}` };
    }),
  users: userRouter,
});
