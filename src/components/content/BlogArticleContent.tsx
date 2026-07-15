import type {BlogPostSummary} from "@/data/blog-posts";
import CaloriesNutritionGuide from "@/components/content/articles/CaloriesNutritionGuide";
import FirstTimeOrderingGuide from "@/components/content/articles/FirstTimeOrderingGuide";
import CaloriesVsMacros from "@/components/content/articles/CaloriesVsMacros";
import ProteinsCompared from "@/components/content/articles/ProteinsCompared";
import BibibopVsChipotle from "@/components/content/articles/BibibopVsChipotle";

export default function BlogArticleContent({post}:{post:BlogPostSummary}){
  const components:Record<string,React.ReactNode>={
    "bibibop-calories-and-nutrition-guide":<CaloriesNutritionGuide post={post}/>,
    "bibibop-menu-first-time-ordering-guide":<FirstTimeOrderingGuide post={post}/>,
    "calories-vs-macros-restaurant-bowl":<CaloriesVsMacros post={post}/>,
    "bibibop-proteins-compared":<ProteinsCompared post={post}/>,
    "bibibop-vs-chipotle-nutrition-comparison":<BibibopVsChipotle post={post}/>,
  };
  return components[post.slug]??null;
}
