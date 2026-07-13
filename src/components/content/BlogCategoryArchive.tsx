import Link from "next/link";
import BlogArchiveList from "@/components/content/BlogArchiveList";
import BlogCategoryIcon from "@/components/content/BlogCategoryIcon";
import {blogCategories,blogCategoryHref,type BlogCategory} from "@/data/blog-categories";
import {blogPosts} from "@/data/blog-posts";
import {siteConfig} from "@/config/site";

export default function BlogCategoryArchive({category,currentPage=1}:{category:BlogCategory;currentPage?:number}){const basePath=blogCategoryHref(category.slug);const pagePath=currentPage===1?basePath:`${basePath}page/${currentPage}/`;const pageUrl=`${siteConfig.url}${pagePath}`;const posts=blogPosts.filter(post=>post.categorySlug===category.slug).sort((a,b)=>b.publishedDate.localeCompare(a.publishedDate));const breadcrumb={"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:siteConfig.url},{"@type":"ListItem",position:2,name:"Blog",item:`${siteConfig.url}/blog/`},{"@type":"ListItem",position:3,name:category.name,item:pageUrl}]};return <>
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumb).replace(/</g,"\\u003c")}}/>
  <div className="content-page blog-category-page"><div className="shell blog-shell"><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/blog/">Blog</Link><span aria-hidden="true">/</span><span aria-current="page">{category.name}</span></nav><header className="blog-category-header"><BlogCategoryIcon type={category.icon}/><h1>{category.name}{currentPage>1?` - Page ${currentPage}`:""}</h1><p className="lede">{category.introduction}</p></header>
  <section className="category-article-area" aria-labelledby="category-articles-heading"><div className="blog-section-heading"><h2 id="category-articles-heading">Articles In {category.name}</h2></div><BlogArchiveList posts={posts} basePath={basePath} currentPage={currentPage}/></section>
  <section className="related-blog-categories"><div className="blog-section-heading"><h2>Explore Related Categories</h2><p>Browse another part of the BIBIBOP nutrition guide library.</p></div><div className="related-category-grid">{blogCategories.filter(item=>item.slug!==category.slug).map(item=><Link href={blogCategoryHref(item.slug)} key={item.slug}><BlogCategoryIcon type={item.icon}/><span>{item.name}</span></Link>)}</div><Link className="all-guides-link" href="/blog/">View all guides</Link></section>
  <section className="blog-calculator-cta"><h2>Calculate Your BIBIBOP Order</h2><p>Build a bowl and see calories, protein, carbohydrates, fat, sodium, and published allergen flags update in real time.</p><Link className="button" href="/#calculator">Open the BIBIBOP calculator</Link></section>
  </div></div>
  </>}
