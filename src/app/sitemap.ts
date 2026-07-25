import type {MetadataRoute} from "next";
import {publicRoutes,siteConfig} from "@/config/site";
import {archiveCategorySlugsForPrimary} from "@/data/blog-categories";
import {blogArticleHref,blogPosts} from "@/data/blog-posts";

export const dynamic="force-static";

export default function sitemap():MetadataRoute.Sitemap{
  const latestPostDate=blogPosts.reduce((latest,post)=>[latest,post.updatedDate??post.publishedDate].sort().at(-1)!,"2026-07-12");
  const categoryDates=new Map<string,string>();
  for(const post of blogPosts)for(const category of archiveCategorySlugsForPrimary(post.primaryCategory)){
    const route=category==="comparisons"?"/blog/comparisons/":`/blog/${category==="meal-comparisons"||category==="restaurant-comparisons"?`comparisons/${category}`:category}/`;
    categoryDates.set(route,[categoryDates.get(route)??"2026-07-12",post.updatedDate??post.publishedDate].sort().at(-1)!);
  }
  const routeEntries:MetadataRoute.Sitemap=publicRoutes.map(route=>{
    const blogRoute=route.startsWith("/blog/");
    let priority=.5;
    if(route==="/")priority=1;
    else if(route==="/bibibop-nutrition-facts/")priority=.8;
    else if(route==="/blog/")priority=.7;
    else if(blogRoute)priority=.6;
    const lastModified=route==="/"?siteConfig.contentUpdatedDate:route==="/blog/"?latestPostDate:categoryDates.get(route)??"2026-07-12";
    return {url:`${siteConfig.url}${route}`,lastModified,changeFrequency:route==="/"||blogRoute?"monthly":"yearly",priority};
  });
  const articleEntries:MetadataRoute.Sitemap=blogPosts.map(post=>({url:`${siteConfig.url}${blogArticleHref(post.slug)}`,lastModified:post.updatedDate??post.publishedDate,changeFrequency:"monthly",priority:.65}));
  return [...new Map([...routeEntries,...articleEntries].map(entry=>[entry.url,entry])).values()];
}
