export type BlogPostSummary = {
  title: string;
  description: string;
  href: string;
  publishedDate: string;
  authorSlug: "m-arslan";
};

// Add a post here only after its page is published and source-checked.
export const blogPosts: BlogPostSummary[] = [];
