import {describe,expect,it} from "vitest";
import {siteConfig,publicRoutes,allHumanRoutes} from "@/config/site";
import {blogCategories,blogCategoryHref} from "@/data/blog-categories";

describe("site configuration",()=>{
  it("uses required exact metadata",()=>{
    expect(siteConfig.title).toBe("BIBIBOP Nutrition Calculator: Calories, Macros & Allergens");
    expect(siteConfig.description).toBe("Build your BIBIBOP bowl and calculate calories, protein, carbs, fat, sodium and allergens using official nutrition data for every ingredient.");
    expect(siteConfig.url).toBe("https://bibibopnutritioncalculator.pro");
  });
  it("indexes the nutrition database, blog hub, categories, and calculator routes",()=>{
    expect(publicRoutes).toContain("/bibibop-nutrition-facts/");
    expect(publicRoutes).toContain("/blog/");
    for(const category of blogCategories)expect(publicRoutes).toContain(blogCategoryHref(category.slug));
    expect(publicRoutes).toContain("/nutrition-calculators/");
    expect(publicRoutes).toContain("/nutrition-calculators/bmi-calculator/");
    expect(allHumanRoutes).toEqual(publicRoutes);
  });
  it("includes the indexable author profile",()=>{
    expect(publicRoutes).toContain("/author/m-arslan/");
  });
});
