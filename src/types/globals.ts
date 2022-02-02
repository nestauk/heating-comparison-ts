export {};

declare global {
 interface Window {
   __RUNTIME_CONFIG__: {
     CALC_URL: string;
     LEARN_MORE_URL :string;
   };
 }
}