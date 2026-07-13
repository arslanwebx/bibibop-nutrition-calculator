import Link from "next/link";
import Image from "next/image";
import {authorConfig} from "@/config/author";
import {blogArticleHref,type BlogPostSummary} from "@/data/blog-posts";
import {blogCategoryBySlug,blogCategoryHref} from "@/data/blog-categories";

export const BLOG_PAGE_SIZE=9;
export const archivePageCount=(posts:BlogPostSummary[])=>Math.max(1,Math.ceil(posts.length/BLOG_PAGE_SIZE));

export default function BlogArchiveList({posts,basePath,currentPage=1,emptyMessage="New guides in this category will be published soon."}:{posts:BlogPostSummary[];basePath:string;currentPage?:number;emptyMessage?:string}){
  const pageCount=archivePageCount(posts);
  const visible=posts.slice((currentPage-1)*BLOG_PAGE_SIZE,currentPage*BLOG_PAGE_SIZE);
  if(!visible.length)return <div className="blog-empty-state"><svg viewBox="0 0 180 120" aria-hidden="true"><rect x="27" y="13" width="126" height="94" rx="10"/><path d="M48 40h50M48 57h82M48 74h68"/><circle cx="130" cy="39" r="10"/></svg><p>{emptyMessage}</p></div>;
  return <><div className="blog-post-grid">{visible.map(post=>{const href=blogArticleHref(post.slug);const category=blogCategoryBySlug(post.primaryCategory)!;return <article className="blog-post-card" key={post.id}>{post.featuredImage&&<Link className="blog-card-image" href={href} tabIndex={-1} aria-hidden="true"><Image src={post.featuredImage.src} alt="" width={post.featuredImage.width} height={post.featuredImage.height}/></Link>}<Link className="blog-category-label" href={blogCategoryHref(category.slug)}>{category.name}</Link><h3><Link href={href}>{post.title}</Link></h3><p>{post.description}</p><div className="blog-post-meta"><time dateTime={post.publishedDate}>{post.publishedDate}</time><span>By <Link href={authorConfig.path}>{authorConfig.name}</Link></span></div><Link className="blog-read-link" href={href}>Read guide <span aria-hidden="true">→</span></Link></article>})}</div>{pageCount>1&&<nav className="archive-pagination" aria-label="Article pages">{Array.from({length:pageCount},(_,index)=>index+1).map(page=><Link key={page} href={page===1?basePath:`${basePath}page/${page}/`} aria-current={page===currentPage?"page":undefined}>{page}</Link>)}</nav>}</>;
}
