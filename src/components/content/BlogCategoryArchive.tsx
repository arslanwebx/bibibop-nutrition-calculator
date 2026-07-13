import Link from "next/link";
import BlogArchiveList from "@/components/content/BlogArchiveList";
import BlogCategoryIcon from "@/components/content/BlogCategoryIcon";
import {blogCategories,blogCategoryBySlug,blogCategoryHref,comparisonChildCategories,mainBlogCategories,postsForBlogArchive,type BlogCategory} from "@/data/blog-categories";
import {blogPosts} from "@/data/blog-posts";
import {siteConfig} from "@/config/site";

export default function BlogCategoryArchive({category,currentPage=1}:{category:BlogCategory;currentPage?:number}){
  const basePath=blogCategoryHref(category.slug);
  const pagePath=currentPage===1?basePath:`${basePath}page/${currentPage}/`;
  const pageUrl=`${siteConfig.url}${pagePath}`;
  const posts=postsForBlogArchive(blogPosts,category.slug).sort((a,b)=>b.publishedDate.localeCompare(a.publishedDate));
  const parent=category.parent?blogCategoryBySlug(category.parent):undefined;
  const breadcrumbItems=[
    {"@type":"ListItem",position:1,name:"Home",item:siteConfig.url},
    {"@type":"ListItem",position:2,name:"Blog",item:`${siteConfig.url}/blog/`},
    ...(parent?[{"@type":"ListItem",position:3,name:parent.name,item:`${siteConfig.url}${parent.url}`}]:[]),
    {"@type":"ListItem",position:parent?4:3,name:category.name,item:pageUrl},
  ];
  const schema=[
    {"@context":"https://schema.org","@type":"CollectionPage",name:category.name,url:pageUrl,description:category.metaDescription,isPartOf:{"@type":"Blog",name:"BIBIBOP Nutrition Guides",url:`${siteConfig.url}/blog/`}},
    {"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:breadcrumbItems},
  ];
  const related=category.parent
    ? blogCategories.filter(item=>item.slug===category.parent||(item.parent===category.parent&&item.slug!==category.slug))
    : mainBlogCategories.filter(item=>item.slug!==category.slug);
  return <>
    {schema.map((data,index)=><script key={index} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(data).replace(/</g,"\\u003c")}}/>)}
    <div className="content-page blog-category-page"><div className="shell blog-shell"><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/blog/">Blog</Link><span aria-hidden="true">/</span>{parent&&<><Link href={parent.url}>{parent.name}</Link><span aria-hidden="true">/</span></>}<span aria-current="page">{category.name}</span></nav><header className="blog-category-header"><BlogCategoryIcon type={category.icon}/><h1>{category.name}{currentPage>1?` - Page ${currentPage}`:""}</h1><p className="lede">{category.introduction}</p></header>
    {category.slug==="comparisons"&&<section className="comparison-child-section"><div className="blog-section-heading"><h2>Choose A Comparison Type</h2><p>Browse meal-level comparisons or comparisons between BIBIBOP and similar restaurants.</p></div><div className="comparison-child-grid">{comparisonChildCategories.map(child=><Link href={child.url} key={child.slug}><BlogCategoryIcon type={child.icon}/><span><strong>{child.name}</strong><small>{child.description}</small></span></Link>)}</div></section>}
    <section className="category-article-area" aria-labelledby="category-articles-heading"><div className="blog-section-heading"><h2 id="category-articles-heading">Articles In {category.name}</h2>{category.slug==="comparisons"&&<p>This combined archive automatically includes both Meal Comparisons and Restaurant Comparisons without duplicating article records.</p>}</div><BlogArchiveList posts={posts} basePath={basePath} currentPage={currentPage}/></section>
    <section className="related-blog-categories"><div className="blog-section-heading"><h2>{category.parent?"More Comparison Categories":"Explore Related Categories"}</h2><p>{category.parent?"Return to all comparisons or browse the other comparison type.":"Browse another part of the BIBIBOP nutrition guide library."}</p></div><div className="related-category-grid">{related.map(item=><Link href={blogCategoryHref(item.slug)} key={item.slug}><BlogCategoryIcon type={item.icon}/><span>{item.name}</span></Link>)}</div><Link className="all-guides-link" href="/blog/">View all guides</Link></section>
    <section className="blog-calculator-cta"><h2>Calculate Your BIBIBOP Order</h2><p>Build a bowl and see calories, protein, carbohydrates, fat, sodium, and published allergen flags update in real time.</p><Link className="button" href="/#calculator">Open the BIBIBOP calculator</Link></section>
    </div></div>
  </>;
}
