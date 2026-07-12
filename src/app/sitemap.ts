import type {MetadataRoute} from "next";import {publicRoutes,siteConfig} from "@/config/site";
export const dynamic = "force-static";
export default function sitemap():MetadataRoute.Sitemap{return publicRoutes.map((route,index)=>({url:`${siteConfig.url}${route}`,lastModified:"2026-07-12",changeFrequency:index===0?"monthly":"yearly",priority:index===0?1:.5}))}
