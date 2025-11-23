/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

export interface Environment {
  ENVIRONMENT: "demo" | "local"
}

declare global {
  namespace App {
    interface Locals {
      db: import("./Database").Database<typeof import("./schema").schema>
    }
  }
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Environment {}
  }
}