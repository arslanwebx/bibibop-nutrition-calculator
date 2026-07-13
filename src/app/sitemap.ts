import type {MetadataRoute} from "next";
import {publicRoutes,siteConfig} from "@/config/site";
import {blogArticleHref,blogPosts} from "@/data/blog-posts";

export const dynamic="force-static";

export default function sitemap():MetadataRoute.Sitemap{
  const routeEntries:MetadataRoute.Sitemap=publicRoutes.map(route=>{
    const blogRoute=route.startsWith("/blog/");
    let priority=.5;
    if(route==="/")priority=1;
    else if(route==="/bibibop-nutrition-facts/")priority=.8;
    else if(route==="/blog/")priority=.7;
    else if(blogRoute)priority=.6;
    return {url:`${siteConfig.url}${route}`,lastModified:"2026-07-12",changeFrequency:route==="/"||blogRoute?"monthly":"yearly",priority};
  });
  const articleEntries:MetadataRoute.Sitemap=blogPosts.map(post=>({url:`${siteConfig.url}${blogArticleHref(post.slug)}`,lastModified:post.updatedDate??post.publishedDate,changeFrequency:"monthly",priority:.65}));
  return [...new Map([...routeEntries,...articleEntries].map(entry=>[entry.url,entry])).values()];
}
