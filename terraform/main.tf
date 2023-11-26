locals {
  secrets = {
    "TF_API_TOKEN" : var.TF_API_TOKEN,
    "ACTIONS_GITHUB_TOKEN" : var.ACTIONS_GITHUB_TOKEN
  }
}

module "secrets" {
  for_each = local.secrets

  source  = "app.terraform.io/okkema/secret/github"
  version = "~> 0.2"

  repository = var.github_repository
  key        = each.key
  value      = each.value
}

module "page" {
  source  = "app.terraform.io/okkema/page/cloudflare"
  version = "~> 0.3"

  account_id      = var.cloudflare_account_id
  zone_id         = var.cloudflare_zone_id
  name            = var.github_repository
  repo_name       = var.github_repository
  build_command   = "npm run build:vite"
  destination_dir = "dist/vite"
  pages_hostname  = "@"
  production_secrets = {
    VITE_SENTRY_DSN   = var.SENTRY_DSN
    SENTRY_ORG        = var.SENTRY_ORG
    SENTRY_PROJECT    = var.SENTYR_PROJECT
    SENTRY_AUTH_TOKEN = var.SENTRY_AUTH_TOKEN
  }
}