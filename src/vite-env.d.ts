/// <reference types="vite/client" />

declare module "*.md" {
  export const plainText: string
  export default plainText
}
