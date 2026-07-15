import Image from "next/image";
import Link from "next/link";
import AuthorBox from "@/components/content/AuthorBox";
import {authorConfig} from "@/config/author";
import {siteConfig} from "@/config/site";
import {blogCategoryBySlug,blogCategoryHref} from "@/data/blog-categories";
import {blogArticleHref,type BlogPostSummary} from "@/data/blog-posts";

export default function BlogPostTemplate({post,relatedPosts,children}:{post:BlogPostSummary;relatedPosts:BlogPostSummary[];children:React.ReactNode}){
  const path=blogArticleHref(post.slug);const url=`${siteConfig.url}${path}`;
  const category=blogCategoryBySlug(post.primaryCategory)!;const parent=category.parent?blogCategoryBySlug(category.parent):undefined;
  const lastUpdated=post.updatedDate??post.publishedDate;
  const lastUpdatedLabel=new Intl.DateTimeFormat("en-US",{month:"long",day:"numeric",year:"numeric",timeZone:"UTC"}).format(new Date(`${lastUpdated}T00:00:00Z`));
  const counters=[0,0,0];
  const numberedToc=post.toc.map(item=>{const index=item.level-2;counters[index]+=1;for(let nested=index+1;nested<counters.length;nested+=1)counters[nested]=0;return {...item,number:counters.slice(0,index+1).filter(Boolean).join(".")};});
  const breadcrumbTrail=[{name:"Home",href:"/"},{name:"Blog",href:"/blog/"},...(parent?[{name:parent.name,href:parent.url}]:[]),{name:category.name,href:category.url}];
  const schema=[
    {"@context":"https://schema.org","@type":"BlogPosting",headline:post.title,description:post.metaDescription,url,mainEntityOfPage:{"@type":"WebPage","@id":url},image:`${siteConfig.url}${post.featuredImage.src}`,datePublished:post.publishedDate,dateModified:post.updatedDate??post.publishedDate,author:{"@type":"Person","@id":`${authorConfig.url}#person`,name:authorConfig.name,url:authorConfig.url,image:authorConfig.imageUrl},publisher:{"@type":"Organization","@id":`${siteConfig.url}/#organization`,name:siteConfig.name,url:siteConfig.url,logo:{"@type":"ImageObject",url:`${siteConfig.url}/apple-touch-icon.svg`}},articleSection:category.name,inLanguage:"en-US"},
    {"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[...breadcrumbTrail.map((item,index)=>({"@type":"ListItem",position:index+1,name:item.name,item:`${siteConfig.url}${item.href}`})),{"@type":"ListItem",position:breadcrumbTrail.length+1,name:post.title,item:url}]},
    {"@context":"https://schema.org","@type":"Person","@id":`${authorConfig.url}#person`,name:authorConfig.name,url:authorConfig.url,image:authorConfig.imageUrl,description:authorConfig.description},
    {"@context":"https://schema.org","@type":"Organization","@id":`${siteConfig.url}/#organization`,name:siteConfig.name,url:siteConfig.url},
    {"@context":"https://schema.org","@type":"FAQPage",mainEntity:post.faq.map(item=>({"@type":"Question",name:item.question,acceptedAnswer:{"@type":"Answer",text:item.answer}}))},
  ];
  return <>
    {schema.map((data,index)=><script key={index} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(data).replace(/</g,"\\u003c")}}/>)}
    <article className="shell blog-article">
      <nav className="breadcrumbs" aria-label="Breadcrumb">{breadcrumbTrail.map(item=><span className="breadcrumb-part" key={item.href}><Link href={item.href}>{item.name}</Link><span aria-hidden="true">/</span></span>)}<span aria-current="page">{post.title}</span></nav>
      <header className="blog-article-header"><Link className="article-category" href={category.url}>{category.name}</Link><h1>{post.title}</h1><p className="lede">{post.excerpt}</p><p className="article-meta"><span>By <Link href={authorConfig.path}>{authorConfig.name}</Link></span><span className="article-meta-separator" aria-hidden="true">•</span><span>Last updated <time dateTime={lastUpdated}>{lastUpdatedLabel}</time></span></p></header>
      <figure className="article-featured-image"><Image src={post.featuredImage.src} alt={post.featuredImage.alt} width={post.featuredImage.width} height={post.featuredImage.height} priority sizes="(max-width: 900px) calc(100vw - 28px), 900px"/></figure>
      <div className="blog-article-layout"><details className="article-toc"><summary>In this guide</summary><nav aria-label="Table of contents"><ol>{numberedToc.map(item=><li className={`toc-level-${item.level}`} key={item.id}><a href={`#${item.id}`}><span className="toc-number" aria-hidden="true">{item.number}</span><span>{item.label}</span></a></li>)}</ol></nav></details><div className="blog-article-body">{children}
        <section className="article-faq" id="faq"><h2>Frequently Asked Questions</h2>{post.faq.map(item=><details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</section>
        {relatedPosts.length>0&&<aside className="article-related-guides"><h2>Related Guides</h2><div className="article-related-grid">{relatedPosts.map(related=><Link key={related.id} href={blogArticleHref(related.slug)}><span>{blogCategoryBySlug(related.primaryCategory)?.name}</span><strong>{related.title}</strong><small>{related.excerpt}</small></Link>)}</div></aside>}
        <nav className="article-next-links" aria-label="Continue exploring">{parent&&<Link href={parent.url}>All {parent.name}</Link>}<Link href={blogCategoryHref(category.slug)}>More {category.name}</Link><Link href="/#calculator">Use the BIBIBOP Nutrition Calculator</Link></nav>
      </div></div><AuthorBox/>
    </article>
  </>;
}
