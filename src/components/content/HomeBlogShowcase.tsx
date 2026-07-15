import Image from "next/image";
import Link from "next/link";
import {blogCategoryBySlug,blogCategoryHref,type BlogPrimaryCategorySlug} from "@/data/blog-categories";
import {blogArticleHref,blogPosts} from "@/data/blog-posts";

const featuredCategories:BlogPrimaryCategorySlug[]=["nutrition-guides","ordering-guides","nutrition-education","meal-comparisons","restaurant-comparisons"];

const featuredPosts=featuredCategories.map(category=>[...blogPosts]
  .filter(post=>post.primaryCategory===category)
  .sort((a,b)=>(b.updatedDate??b.publishedDate).localeCompare(a.updatedDate??a.publishedDate))[0])
  .filter((post):post is NonNullable<typeof post>=>Boolean(post));

export default function HomeBlogShowcase(){return <section className="home-blog-showcase" aria-labelledby="home-blog-heading"><div className="shell"><div className="showcase-heading"><h2 id="home-blog-heading">Latest From the Blog</h2><p>Explore practical BIBIBOP nutrition, ordering, and meal-comparison guides.</p></div><div className="blog-post-grid home-blog-grid">{featuredPosts.map(post=>{const href=blogArticleHref(post.slug);const category=blogCategoryBySlug(post.primaryCategory)!;return <article className="blog-post-card" key={post.id}><Link className="blog-card-image" href={href}><Image src={post.featuredImage.src} alt={post.featuredImage.alt} width={post.featuredImage.width} height={post.featuredImage.height} sizes="(max-width: 600px) calc(100vw - 66px), (max-width: 900px) 45vw, 360px"/></Link><Link className="blog-category-label" href={blogCategoryHref(category.slug)}>{category.name}</Link><h3><Link href={href}>{post.title}</Link></h3><p>{post.excerpt}</p><Link className="blog-read-link" href={href}>Read article <span aria-hidden="true">→</span></Link></article>})}</div><Link className="button-secondary showcase-all-link" href="/blog/">View more blog posts <span aria-hidden="true">→</span></Link></div></section>}
