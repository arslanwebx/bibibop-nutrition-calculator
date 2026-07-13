import type {BlogCategory} from "@/data/blog-categories";

const paths:Record<BlogCategory["icon"],React.ReactNode>={
  book:<><path d="M11 8h9a4 4 0 0 1 4 4v16h-9a4 4 0 0 0-4 4V8Z"/><path d="M37 8h-9a4 4 0 0 0-4 4v16h9a4 4 0 0 1 4 4V8Z"/></>,
  bowl:<><path d="M7 22h34c-2 12-8 18-17 18S9 34 7 22Z"/><path d="M13 16h22M17 11h14"/></>,
  label:<><rect x="9" y="6" width="30" height="36" rx="4"/><path d="M16 15h16M16 22h16M16 29h10"/></>,
  compare:<><path d="M8 15h28M30 9l6 6-6 6M40 33H12M18 27l-6 6 6 6"/></>,
};

export default function BlogCategoryIcon({type}:{type:BlogCategory["icon"]}){return <span className="blog-category-icon"><svg viewBox="0 0 48 48" aria-hidden="true">{paths[type]}</svg></span>}
