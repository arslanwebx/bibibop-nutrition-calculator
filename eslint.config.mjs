import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const config = [
  ...nextVitals,
  ...nextTypescript,
  { ignores: ["out/**", ".next/**", "coverage/**", "playwright-report/**", "test-results/**"], rules:{"react/no-unescaped-entities":"off"} },
];
export default config;
