import { siteConfig } from "@/config/site";

export const authorConfig = {
  name: "M. Arsalan",
  slug: "m-arslan",
  path: "/author/m-arslan/",
  url: `${siteConfig.url}/author/m-arslan/`,
  image: "/brand/m-arsalan-avatar-orange.svg",
  imageUrl: `${siteConfig.url}/brand/m-arsalan-avatar-orange.svg`,
  shortBio: "M. Arsalan researches restaurant nutrition information, checks food-data accuracy, develops calculator logic, and reviews editorial content for this independent website.",
  description: "Author and editorial reviewer focused on nutrition research, food-data accuracy, calculator development, and clear source-based publishing.",
  expertise: [
    "Restaurant Nutrition Research",
    "Food-Data Accuracy",
    "Nutrition Calculator Development",
    "Source Reconciliation",
    "Editorial Review",
  ],
} as const;
