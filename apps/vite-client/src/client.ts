import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "./../../api-server/index";

const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:8080/trpc",
    }),
  ],
});

async function main() {
  // batching
  //   client.helloWorld.query();
  //   client.helloWorld.query();
  //   client.helloWorld.query();
  //
  //query
  //   const result = await client.helloWorld.query();
  //   console.log({ result });
  //
  //   mutation
  //   const result = await client.log.mutate("Hello from Client!!");
  //   console.log({ result });
  //
  // user routes
  const user = await client.users.get.query({ userId: "12" });
  console.log({ user });

  const updateUser = await client.users.update.mutate({
    name: "Ajay",
    userId: "4",
  });
  console.log({ updateUser });

  const login = await client.users.private.query();
  console.log({ login });
}

main();
