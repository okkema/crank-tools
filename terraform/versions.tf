terraform {
  backend "remote" {
    organization = "okkema"
    workspaces {
      name = "crank-tools"
    }
  }
}