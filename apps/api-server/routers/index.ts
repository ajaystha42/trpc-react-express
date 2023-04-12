import { t } from "../trpc";
import { userRouter } from "./users";

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
  users: userRouter,
});
