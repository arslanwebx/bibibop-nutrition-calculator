import type {Metadata} from "next";
import {notFound} from "next/navigation";
import BlogCategoryArchive from "@/components/content/BlogCategoryArchive";
import {blogCategories,blogCategoryBySlug} from "@/data/blog-categories";
import {siteConfig} from "@/config/site";

export const dynamicParams=false;
export function generateStaticParams(){return blogCategories.map(category=>({category:category.slug}))}
export async function generateMetadata({params}:{params:Promise<{category:string}>}):Promise<Metadata>{const {category:slug}=await params;const category=blogCategoryBySlug(slug);if(!category)return {};const path=`/blog/${category.slug}/`;return {title:category.metaTitle,description:category.metaDescription,alternates:{canonical:path},openGraph:{title:category.metaTitle,description:category.metaDescription,url:`${siteConfig.url}${path}`,type:"website"}}}
export default async function CategoryPage({params}:{params:Promise<{category:string}>}){const {category:slug}=await params;const category=blogCategoryBySlug(slug);if(!category)notFound();return <BlogCategoryArchive category={category}/>}
