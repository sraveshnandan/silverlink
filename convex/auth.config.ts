import { AuthConfig } from "convex/server";

export default {
  providers: [
    {
      domain: "https://free-pika-74.clerk.accounts.dev",
      applicationID: "convex",
    },
  ],
} satisfies AuthConfig;
