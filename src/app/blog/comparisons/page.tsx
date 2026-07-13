import type {Metadata} from "next";
import BlogCategoryArchive from "@/components/content/BlogCategoryArchive";
import {blogCategoryBySlug} from "@/data/blog-categories";
import {siteConfig} from "@/config/site";

const category=blogCategoryBySlug("comparisons")!;
export const metadata:Metadata={title:category.metaTitle,description:category.metaDescription,alternates:{canonical:category.url},openGraph:{title:category.metaTitle,description:category.metaDescription,url:`${siteConfig.url}${category.url}`,type:"website"}};
export default function ComparisonsPage(){return <BlogCategoryArchive category={category}/>}
