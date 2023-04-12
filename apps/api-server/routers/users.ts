import { adminProcedure, t } from "../trpc";
import { z } from "zod";

// const userProcedure = t.procedure.input((v) => {
//   if (typeof v === "string") return v;
//   throw new Error("String Expected");
// });

const userProcedure = t.procedure.input(
  z.object({
    userId: z.string(),
  })
);

// export const userRouter = t.router({
//   getUser: t.procedure.query(() => {
//     return { id: 1, name: "John Wick" };
//   }),
// });

export const userRouter = t.router({
  get: userProcedure.query(({ input }) => {
    return { id: input.userId, name: "John Wick" };
  }),
  update: userProcedure
    .input(z.object({ name: z.string() }))
    .output(z.object({ id: z.string(), name: z.string() }))
    .mutation((req) => {
      console.log({ context: req.ctx.req });
      console.log(
        `Updating user: ${req.input.userId} with name: ${req.input.name}`
      );
      console.log(
        "====================================================================="
      );
      return { id: req.input.userId, name: req.input.name, password: "12345" };
    }),
  private: adminProcedure.query(({ ctx }) => {
    console.log({ loggedInUser: ctx.user.id });
    return "Route Accessible";
  }),
});
