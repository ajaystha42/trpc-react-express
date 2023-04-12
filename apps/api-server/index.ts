import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "./routers";

dotenv.config();

const app: Express = express();

app.use(cors());
app.use("/trpc", createExpressMiddleware({ router: appRouter }));

const port = process.env.PORT || 8080;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

export type AppRouter = typeof appRouter;
