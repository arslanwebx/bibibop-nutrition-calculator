export const siteConfig = {
  name: "BIBIBOP Nutrition Calculator",
  shortName: "BIBIBOP Calculator",
  url: "https://bibibopnutritioncalculator.pro",
  email: "contact@bibibopnutritioncalculator.pro",
  description: "Build your BIBIBOP bowl and calculate calories, protein, carbs, fat, sodium and allergens using official nutrition data for every ingredient.",
  title: "BIBIBOP Nutrition Calculator [Calories, Macros & Allergens]",
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
  "/", "/bibibop-nutrition-facts/", "/blog/", "/blog/nutrition-guides/", "/blog/ordering-guides/", "/blog/nutrition-education/", "/blog/comparisons/", "/blog/comparisons/meal-comparisons/", "/blog/comparisons/restaurant-comparisons/", "/nutrition-calculators/", "/nutrition-calculators/calorie-calculator/",
  "/nutrition-calculators/macro-calculator/", "/nutrition-calculators/protein-calculator/",
  "/nutrition-calculators/carb-calculator/", "/nutrition-calculators/fat-intake-calculator/",
  "/nutrition-calculators/tdee-calculator/", "/nutrition-calculators/bmr-calculator/",
  "/nutrition-calculators/bmi-calculator/", "/nutrition-calculators/calorie-deficit-calculator/",
  "/about/", "/contact/", "/editorial-policy/",
  "/corrections-policy/", "/privacy-policy/", "/cookie-policy/", "/terms/",
  "/medical-disclaimer/", "/trademark-disclaimer/", "/advertising-disclosure/",
  "/accessibility/", "/author/m-arslan/", "/sitemap/",
] as const;

export const allHumanRoutes = publicRoutes;
