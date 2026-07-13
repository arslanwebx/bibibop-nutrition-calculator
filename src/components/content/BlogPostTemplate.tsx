import Link from "next/link";
import AuthorBox from "@/components/content/AuthorBox";
import {authorConfig} from "@/config/author";
import {siteConfig} from "@/config/site";
import {blogCategoryBySlug,blogCategoryHref,type BlogPrimaryCategorySlug} from "@/data/blog-categories";
import {blogArticleHref,type BlogPostSummary} from "@/data/blog-posts";

type BlogPostTemplateProps={
  title:string;
  description:string;
  slug:string;
  publishedDate:string;
  updatedDate?:string;
  primaryCategory:BlogPrimaryCategorySlug;
  relatedPosts:BlogPostSummary[];
  children:React.ReactNode;
};

export default function BlogPostTemplate({title,description,slug,publishedDate,updatedDate,primaryCategory,relatedPosts,children}:BlogPostTemplateProps){
  const path=blogArticleHref(slug);
  const url=`${siteConfig.url}${path}`;
  const category=blogCategoryBySlug(primaryCategory)!;
  const parent=category.parent?blogCategoryBySlug(category.parent):undefined;
  const breadcrumbTrail=[
    {name:"Home",href:"/"},
    {name:"Blog",href:"/blog/"},
    ...(parent?[{name:parent.name,href:parent.url}]:[]),
    {name:category.name,href:category.url},
  ];
  const schema=[
    {"@context":"https://schema.org","@type":"Article",headline:title,description,url,mainEntityOfPage:url,datePublished:publishedDate,dateModified:updatedDate??publishedDate,author:{"@type":"Person",name:authorConfig.name,url:authorConfig.url},publisher:{"@type":"Organization",name:siteConfig.name,url:siteConfig.url},articleSection:category.name},
    {"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[...breadcrumbTrail.map((item,index)=>({"@type":"ListItem",position:index+1,name:item.name,item:`${siteConfig.url}${item.href}`})),{"@type":"ListItem",position:breadcrumbTrail.length+1,name:title,item:url}]},
  ];
  return <>
    {schema.map((data,index)=><script key={index} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(data).replace(/</g,"\\u003c")}}/>)}
    <article className="shell blog-article">
      <nav className="breadcrumbs" aria-label="Breadcrumb">{breadcrumbTrail.map(item=><span className="breadcrumb-part" key={item.href}><Link href={item.href}>{item.name}</Link><span aria-hidden="true">/</span></span>)}<span aria-current="page">{title}</span></nav>
      <header className="blog-article-header"><h1>{title}</h1><p className="lede">{description}</p><p className="byline">By <Link href={authorConfig.path}>{authorConfig.name}</Link> · <time dateTime={publishedDate}>{publishedDate}</time></p></header>
      <div className="blog-article-body">{children}{relatedPosts.length>0&&<aside className="article-related-guides"><h2>Related Guides</h2><ul>{relatedPosts.map(post=><li key={post.id}><Link href={blogArticleHref(post.slug)}>{post.title}</Link></li>)}</ul></aside>}<nav className="article-next-links" aria-label="Continue exploring">{parent&&<Link href={parent.url}>All {parent.name}</Link>}<Link href={blogCategoryHref(category.slug)}>More {category.name}</Link><Link href="/#calculator">Use the BIBIBOP Nutrition Calculator</Link></nav></div>
      <AuthorBox/>
    </article>
  </>;
}
