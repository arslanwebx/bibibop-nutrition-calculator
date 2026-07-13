import type {Metadata} from "next";
import {notFound} from "next/navigation";
import BlogCategoryArchive from "@/components/content/BlogCategoryArchive";
import {blogCategoryBySlug,comparisonChildCategories} from "@/data/blog-categories";
import {siteConfig} from "@/config/site";

export const dynamicParams=false;
export function generateStaticParams(){return comparisonChildCategories.map(category=>({subcategory:category.slug}))}
export async function generateMetadata({params}:{params:Promise<{subcategory:string}>}):Promise<Metadata>{const {subcategory}=await params;const category=blogCategoryBySlug(subcategory);if(!category||category.parent!=="comparisons")return {};return {title:category.metaTitle,description:category.metaDescription,alternates:{canonical:category.url},openGraph:{title:category.metaTitle,description:category.metaDescription,url:`${siteConfig.url}${category.url}`,type:"website"}}}
export default async function ComparisonChildPage({params}:{params:Promise<{subcategory:string}>}){const {subcategory}=await params;const category=blogCategoryBySlug(subcategory);if(!category||category.parent!=="comparisons")notFound();return <BlogCategoryArchive category={category}/>}
