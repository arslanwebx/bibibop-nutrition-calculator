import type {Metadata} from "next";
import Link from "next/link";
import BlogArchiveList from "@/components/content/BlogArchiveList";
import BlogCategoryIcon from "@/components/content/BlogCategoryIcon";
import {blogCategories,blogCategoryHref} from "@/data/blog-categories";
import {blogPosts} from "@/data/blog-posts";
import {siteConfig} from "@/config/site";

const pageUrl=`${siteConfig.url}/blog/`;
export const metadata:Metadata={title:"BIBIBOP Nutrition Guides, Ordering Tips and Comparisons",description:"Explore BIBIBOP nutrition guides, ordering tips, ingredient comparisons, and simple restaurant nutrition education.",alternates:{canonical:"/blog/"},openGraph:{title:"BIBIBOP Nutrition Guides, Ordering Tips and Comparisons",description:"Explore BIBIBOP nutrition guides, ordering tips, ingredient comparisons, and simple restaurant nutrition education.",url:pageUrl,type:"website"}};

export default function BlogPage(){const latest=[...blogPosts].sort((a,b)=>b.publishedDate.localeCompare(a.publishedDate));const breadcrumb={"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:siteConfig.url},{"@type":"ListItem",position:2,name:"Blog",item:pageUrl}]};return <>
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumb).replace(/</g,"\\u003c")}}/>
  <div className="content-page blog-hub-page"><div className="shell blog-shell"><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Blog</span></nav><header className="blog-hub-header"><h1>BIBIBOP Nutrition Guides</h1><p className="lede">Explore clear, source-conscious guidance for understanding BIBIBOP nutrition, customizing an order, reading restaurant nutrition data, and comparing menu choices.</p></header>
  <section className="blog-category-grid" aria-label="Blog categories">{blogCategories.map(category=><article className="blog-category-card" key={category.slug}><BlogCategoryIcon type={category.icon}/><h2>{category.name}</h2><p>{category.description}</p><Link href={blogCategoryHref(category.slug)}>View Guides <span aria-hidden="true">→</span></Link></article>)}</section>
  <section className="latest-articles"><div className="blog-section-heading"><h2>Latest Articles</h2><p>New articles will appear here only after they are written, reviewed, and published.</p></div><BlogArchiveList posts={latest} basePath="/blog/" emptyMessage="New BIBIBOP nutrition guides will be published soon."/></section>
  </div></div>
  </>}
