/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

export interface Environment {
  ENVIRONMENT: "cloud" | "demo" | "local"
}

export interface LocalEnvironment extends Environment {
  DATABASE_URL: string
}

export interface CloudEnvironment extends Environment {
  CLOUDFLARE_ACCOUNT_ID: string
  CLOUDFLARE_DATABASE_ID: string
  CLOUDFLARE_MIGRATION_TOKEN: string
  DATABASE: D1Database
}

type Runtime = import("@astrojs/cloudflare").Runtime<CloudEnvironment>;

declare global {
  namespace App {
    interface Locals extends Runtime {
      db: import("./Database").Database<typeof import("./schema")>
    }
  }
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends LocalEnvironment, CloudEnvironment {}
  }
}