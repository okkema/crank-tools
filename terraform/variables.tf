variable "cloudflare_account_id" {}
variable "cloudflare_zone_id" {}
variable "github_repository" {}

# GitHub Actions Secrets
variable "TF_API_TOKEN" {
  sensitive = true
}
variable "ACTIONS_GITHUB_TOKEN" {
  sensitive = true
}

# Environment Variables
variable "SENTRY_DSN" {
  sensitive = true
}