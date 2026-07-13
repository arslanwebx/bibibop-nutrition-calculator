import {describe,expect,it} from "vitest";
import {blogCategories,blogCategoryHref,blogCategorySlugs} from "@/data/blog-categories";
import {blogPosts} from "@/data/blog-posts";

describe("blog category architecture",()=>{
  it("defines four unique permanent categories",()=>{
    expect(blogCategories).toHaveLength(4);
    expect(new Set(blogCategorySlugs).size).toBe(4);
    expect(blogCategories.map(category=>blogCategoryHref(category.slug))).toEqual([
      "/blog/nutrition-guides/","/blog/ordering-guides/","/blog/nutrition-education/","/blog/comparisons/",
    ]);
  });
  it("uses unique titles and descriptions",()=>{
    expect(new Set(blogCategories.map(category=>category.metaTitle)).size).toBe(4);
    expect(new Set(blogCategories.map(category=>category.metaDescription)).size).toBe(4);
  });
  it("does not create placeholder articles",()=>{
    expect(blogPosts).toEqual([]);
  });
});
