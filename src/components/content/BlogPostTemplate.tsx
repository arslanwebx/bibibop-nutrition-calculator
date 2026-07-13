import Link from "next/link";
import AuthorBox from "@/components/content/AuthorBox";
import { authorConfig } from "@/config/author";
import { siteConfig } from "@/config/site";
import {blogCategoryBySlug,blogCategoryHref,type BlogCategorySlug} from "@/data/blog-categories";

type BlogPostTemplateProps = {
  title: string;
  description: string;
  path: string;
  publishedDate: string;
  updatedDate?: string;
  categorySlug: BlogCategorySlug;
  children: React.ReactNode;
};

export default function BlogPostTemplate({title,description,path,publishedDate,updatedDate,categorySlug,children}:BlogPostTemplateProps) {
  const url=`${siteConfig.url}${path}`;
  const category=blogCategoryBySlug(categorySlug)!;
  const articleSchema={
    "@context":"https://schema.org",
    "@type":"Article",
    headline:title,
    description,
    url,
    datePublished:publishedDate,
    dateModified:updatedDate ?? publishedDate,
    author:{"@type":"Person",name:authorConfig.name,url:authorConfig.url},
    publisher:{"@type":"Organization",name:siteConfig.name,url:siteConfig.url},
    articleSection:category.name,
  };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(articleSchema).replace(/</g,"\\u003c")}}/>
    <article className="shell blog-article">
      <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/blog/">Blog</Link><span aria-hidden="true">/</span><Link href={blogCategoryHref(category.slug)}>{category.name}</Link><span aria-hidden="true">/</span><span aria-current="page">{title}</span></nav>
      <header className="blog-article-header"><h1>{title}</h1><p className="lede">{description}</p><p className="byline">By <Link href={authorConfig.path}>{authorConfig.name}</Link> · <time dateTime={publishedDate}>{publishedDate}</time></p></header>
      <div className="blog-article-body">{children}<nav className="article-next-links" aria-label="Continue exploring"><Link href={blogCategoryHref(category.slug)}>More {category.name}</Link><Link href="/#calculator">Use the BIBIBOP Nutrition Calculator</Link></nav></div>
      <AuthorBox/>
    </article>
  </>;
}
