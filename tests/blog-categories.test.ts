import {describe,expect,it} from "vitest";
import {archiveCategorySlugsForPrimary,blogCategories,blogCategoryHref,blogCategorySlugs,comparisonChildCategories,mainBlogCategories,postsForBlogArchive} from "@/data/blog-categories";
import {blogArticleHref,blogPosts} from "@/data/blog-posts";

describe("blog category and flat URL architecture",()=>{
  it("defines four main categories and two comparison children",()=>{
    expect(mainBlogCategories).toHaveLength(4);
    expect(comparisonChildCategories).toHaveLength(2);
    expect(blogCategories).toHaveLength(6);
    expect(new Set(blogCategorySlugs).size).toBe(6);
    expect(comparisonChildCategories.every(category=>category.parent==="comparisons")).toBe(true);
    expect(comparisonChildCategories.map(category=>blogCategoryHref(category.slug))).toEqual([
      "/blog/comparisons/meal-comparisons/","/blog/comparisons/restaurant-comparisons/",
    ]);
  });
  it("derives Comparisons from either child primary category",()=>{
    expect(archiveCategorySlugsForPrimary("meal-comparisons")).toEqual(["comparisons","meal-comparisons"]);
    expect(archiveCategorySlugsForPrimary("restaurant-comparisons")).toEqual(["comparisons","restaurant-comparisons"]);
    expect(archiveCategorySlugsForPrimary("nutrition-guides")).toEqual(["nutrition-guides"]);
  });
  it("aggregates comparison children without duplicate records and keeps child filters separate",()=>{
    const meal={id:"meal",slug:"meal",primaryCategory:"meal-comparisons" as const};
    const restaurant={id:"restaurant",slug:"restaurant",primaryCategory:"restaurant-comparisons" as const};
    expect(postsForBlogArchive([meal,restaurant,meal],"comparisons")).toEqual([meal,restaurant]);
    expect(postsForBlogArchive([meal,restaurant],"meal-comparisons")).toEqual([meal]);
    expect(postsForBlogArchive([meal,restaurant],"restaurant-comparisons")).toEqual([restaurant]);
  });
  it("builds article URLs from the article slug only",()=>{
    expect(blogArticleHref("bibibop-vs-cava-nutrition-comparison")).toBe("/blog/bibibop-vs-cava-nutrition-comparison/");
    expect(blogArticleHref("bibibop-vs-cava-nutrition-comparison")).not.toContain("/comparisons/");
  });
  it("uses unique category metadata and publishes the source-checked articles",()=>{
    expect(new Set(blogCategories.map(category=>category.metaTitle)).size).toBe(6);
    expect(new Set(blogCategories.map(category=>category.metaDescription)).size).toBe(6);
    expect(blogPosts).toHaveLength(8);
    expect(blogPosts.map(post=>post.slug)).toEqual([
      "protein-per-calorie-explained-restaurant-bowl-examples","bibibop-menu-nutrition-facts","how-to-build-a-low-calorie-bibibop-bowl","bibibop-calories-and-nutrition-guide","bibibop-menu-first-time-ordering-guide","calories-vs-macros-restaurant-bowl","bibibop-proteins-compared","bibibop-vs-chipotle-nutrition-comparison",
    ]);
    expect(new Set(blogPosts.map(post=>post.seoTitle)).size).toBe(8);
    expect(new Set(blogPosts.map(post=>post.metaDescription)).size).toBe(8);
    expect(blogPosts.every(post=>post.featuredImage.width===1200&&post.featuredImage.height===675)).toBe(true);
    expect(blogPosts.every(post=>post.inlineImages.length===2)).toBe(true);
    expect(blogPosts.every(post=>post.faq.length>=4&&post.faq.length<=7)).toBe(true);
    expect(blogPosts.every(post=>post.relatedSlugs.length>=2)).toBe(true);
  });
  it("places comparison posts in their child and derived parent archives",()=>{
    const meal=blogPosts.find(post=>post.primaryCategory==="meal-comparisons")!;
    const restaurant=blogPosts.find(post=>post.primaryCategory==="restaurant-comparisons")!;
    expect(postsForBlogArchive(blogPosts,"comparisons")).toEqual(expect.arrayContaining([meal,restaurant]));
    expect(postsForBlogArchive(blogPosts,"meal-comparisons")).toEqual([meal]);
    expect(postsForBlogArchive(blogPosts,"restaurant-comparisons")).toEqual([restaurant]);
  });
});
