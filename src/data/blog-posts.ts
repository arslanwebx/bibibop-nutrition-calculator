import {blogCategorySlugs,type BlogPrimaryCategorySlug} from "@/data/blog-categories";

export type BlogContentSection={heading:string;paragraphs:string[]};
export type BlogPostSummary={
  id:string;
  slug:string;
  title:string;
  description:string;
  publishedDate:string;
  updatedDate?:string;
  authorSlug:"m-arslan";
  primaryCategory:BlogPrimaryCategorySlug;
  featuredImage?:{src:string;alt:string;width:number;height:number};
  relatedSlugs:string[];
  sections:BlogContentSection[];
};

export const blogArticleHref=(slug:string)=>`/blog/${slug}/` as const;
export const blogPostBySlug=(slug:string)=>blogPosts.find(post=>post.slug===slug);

// Add a post only after its complete article content is source-checked and ready to publish.
export const blogPosts:BlogPostSummary[]=[];

const reservedSlugs=new Set<string>(blogCategorySlugs);
const ids=new Set<string>();
const slugs=new Set<string>();
for(const post of blogPosts){
  if(reservedSlugs.has(post.slug))throw new Error(`Blog article slug conflicts with a category route: ${post.slug}`);
  if(ids.has(post.id))throw new Error(`Duplicate blog article ID: ${post.id}`);
  if(slugs.has(post.slug))throw new Error(`Duplicate blog article slug: ${post.slug}`);
  ids.add(post.id);
  slugs.add(post.slug);
}
