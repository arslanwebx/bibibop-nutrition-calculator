import type {Metadata} from "next";
import {notFound} from "next/navigation";
import BlogArticleContent from "@/components/content/BlogArticleContent";
import BlogCategoryArchive from "@/components/content/BlogCategoryArchive";
import BlogPostTemplate from "@/components/content/BlogPostTemplate";
import {blogCategoryBySlug,mainBlogCategories} from "@/data/blog-categories";
import {blogArticleHref,blogPostBySlug,blogPosts} from "@/data/blog-posts";
import {siteConfig} from "@/config/site";

export const dynamicParams=false;
export function generateStaticParams(){return [...mainBlogCategories.filter(category=>category.slug!=="comparisons").map(category=>({segment:category.slug})),...blogPosts.map(post=>({segment:post.slug}))]}
export async function generateMetadata({params}:{params:Promise<{segment:string}>}):Promise<Metadata>{
  const {segment}=await params;const category=blogCategoryBySlug(segment);
  if(category&&category.parent===null)return {title:category.metaTitle,description:category.metaDescription,alternates:{canonical:category.url},openGraph:{title:category.metaTitle,description:category.metaDescription,url:`${siteConfig.url}${category.url}`,type:"website"}};
  const post=blogPostBySlug(segment);if(!post)return {};const path=blogArticleHref(post.slug);
  return {title:post.seoTitle,description:post.metaDescription,alternates:{canonical:path},robots:{index:true,follow:true},openGraph:{title:post.seoTitle,description:post.metaDescription,url:`${siteConfig.url}${path}`,type:"article",publishedTime:post.publishedDate,modifiedTime:post.updatedDate,authors:["M. Arsalan"],images:[{url:post.featuredImage.src,width:post.featuredImage.width,height:post.featuredImage.height,alt:post.featuredImage.alt}]},twitter:{card:"summary_large_image",title:post.seoTitle,description:post.metaDescription,images:[post.featuredImage.src]}};
}
export default async function BlogSegmentPage({params}:{params:Promise<{segment:string}>}){
  const {segment}=await params;const category=blogCategoryBySlug(segment);if(category&&category.parent===null)return <BlogCategoryArchive category={category}/>;
  const post=blogPostBySlug(segment);if(!post)notFound();
  const relatedPosts=[...new Set(post.relatedSlugs)].map(slug=>blogPostBySlug(slug)).filter((item):item is NonNullable<typeof item>=>Boolean(item&&item.id!==post.id));
  return <BlogPostTemplate post={post} relatedPosts={relatedPosts}><BlogArticleContent post={post}/></BlogPostTemplate>;
}
