import { cardano } from "./utilty/namiCoinSelector";
// declaration.d.ts
declare module "*.scss" {
  const content: Record<string, string>;
  export default content;
}

declare module "*.svg?inline" {
  const content: any;
}

declare global {
  interface Window {
    cardano: any;
  }
}

declare module "*.svg" {
  const content: any;
}
// declare module "*.scss";
