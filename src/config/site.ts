export const siteConfig = {
  name: "BIBIBOP Nutrition Calculator",
  shortName: "BIBIBOP Calculator",
  url: "https://bibibopnutritioncalculator.pro",
  email: "contact@bibibopnutritioncalculator.pro",
  description: "Build your BIBIBOP bowl and calculate calories, protein, carbs, fat, sodium and allergens using official nutrition data for every ingredient.",
  title: "BIBIBOP Nutrition Calculator: Calories, Macros & Allergens",
  source: {
    pdfUrl: "https://bibibop.com/wp-content/uploads/2025/09/BIBIBOP-Nutrition-Updated-9.10.25.pdf",
    pageUrl: "https://bibibop.com/nutrition/",
    filenameDate: "September 10, 2025",
    footerDate: "Last Updated May 2025",
    checkedDate: "July 12, 2026",
    version: "BIBIBOP-PDF-2025-09-10",
  },
  disclaimer: "This independent calculator is not affiliated with or endorsed by BIBIBOP Asian Grill. Nutrition values are estimates based on publicly available information and may change. For food allergies, verify directly with the restaurant.",
} as const;

export const publicRoutes = [
  "/", "/about/", "/contact/", "/data-sources-methodology/", "/editorial-policy/",
  "/corrections-policy/", "/privacy-policy/", "/cookie-policy/", "/terms/",
  "/medical-disclaimer/", "/trademark-disclaimer/", "/advertising-disclosure/",
  "/accessibility/", "/sitemap/",
] as const;

export const allHumanRoutes = [...publicRoutes, "/blog/", "/nutrition-calculators/"] as const;
