import Link from "next/link";
import AuthorBox from "@/components/content/AuthorBox";
import { authorConfig } from "@/config/author";
import { siteConfig } from "@/config/site";

type BlogPostTemplateProps = {
  title: string;
  description: string;
  path: string;
  publishedDate: string;
  updatedDate?: string;
  children: React.ReactNode;
};

export default function BlogPostTemplate({title,description,path,publishedDate,updatedDate,children}:BlogPostTemplateProps) {
  const url=`${siteConfig.url}${path}`;
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
  };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(articleSchema).replace(/</g,"\\u003c")}}/>
    <article className="shell blog-article">
      <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/blog/">Blog</Link><span aria-hidden="true">/</span><span aria-current="page">{title}</span></nav>
      <header className="blog-article-header"><h1>{title}</h1><p className="lede">{description}</p><p className="byline">By <Link href={authorConfig.path}>{authorConfig.name}</Link> · <time dateTime={publishedDate}>{publishedDate}</time></p></header>
      <div className="blog-article-body">{children}</div>
      <AuthorBox/>
    </article>
  </>;
}
