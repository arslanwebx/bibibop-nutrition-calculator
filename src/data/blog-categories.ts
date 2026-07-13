export const mainBlogCategorySlugs=["nutrition-guides","ordering-guides","nutrition-education","comparisons"] as const;
export const comparisonChildCategorySlugs=["meal-comparisons","restaurant-comparisons"] as const;
export const blogCategorySlugs=[...mainBlogCategorySlugs,...comparisonChildCategorySlugs] as const;
export type MainBlogCategorySlug=typeof mainBlogCategorySlugs[number];
export type ComparisonChildCategorySlug=typeof comparisonChildCategorySlugs[number];
export type BlogCategorySlug=typeof blogCategorySlugs[number];
export type BlogPrimaryCategorySlug=Exclude<BlogCategorySlug,"comparisons">;

export type BlogCategory={
  slug:BlogCategorySlug;
  name:string;
  parent:"comparisons"|null;
  url:string;
  description:string;
  introduction:string;
  metaTitle:string;
  metaDescription:string;
  icon:"book"|"bowl"|"label"|"compare";
};

export const blogCategories:BlogCategory[]=[
  {slug:"nutrition-guides",name:"Nutrition Guides",parent:null,url:"/blog/nutrition-guides/",description:"Detailed guides covering BIBIBOP calories, nutrients, ingredients, allergens, proteins, bases, sauces, toppings, and menu nutrition.",introduction:"Explore source-checked guides to BIBIBOP calories, nutrients, ingredients, allergens, proteins, bases, sauces, toppings, and menu nutrition.",metaTitle:"BIBIBOP Nutrition Guides: Calories, Ingredients and Allergens",metaDescription:"Explore BIBIBOP nutrition guides covering calories, ingredients, allergens, sauces, proteins, toppings, and menu nutrition.",icon:"book"},
  {slug:"ordering-guides",name:"Ordering Guides",parent:null,url:"/blog/ordering-guides/",description:"Practical advice for building and customizing BIBIBOP bowls based on taste, calories, protein, sodium, and dietary preferences.",introduction:"Find practical guidance for building and customizing BIBIBOP bowls around taste, calories, protein, sodium, and dietary preferences.",metaTitle:"BIBIBOP Ordering Guides: Build and Customize Your Bowl",metaDescription:"Learn how to order and customize BIBIBOP bowls based on calories, protein, sodium, taste, and dietary preferences.",icon:"bowl"},
  {slug:"nutrition-education",name:"Nutrition Education",parent:null,url:"/blog/nutrition-education/",description:"Simple explanations of calories, macros, nutrition labels, serving sizes, allergens, restaurant data, and meal calculations.",introduction:"Learn how calories, macros, serving sizes, nutrition labels, allergens, restaurant data, and meal calculations work in clear language.",metaTitle:"Nutrition Education: Calories, Macros and Restaurant Labels",metaDescription:"Understand calories, macros, serving sizes, nutrition labels, allergens, and restaurant nutrition calculations.",icon:"label"},
  {slug:"comparisons",name:"Comparisons",parent:null,url:"/blog/comparisons/",description:"Nutrition comparisons between BIBIBOP ingredients, proteins, bases, bowl sizes, sauces, and similar restaurants.",introduction:"Compare BIBIBOP meals and restaurant choices through clearly stated serving information, calories, macronutrients, and sodium.",metaTitle:"BIBIBOP Nutrition Comparisons: Proteins, Bases and Bowls",metaDescription:"Compare BIBIBOP proteins, bases, sauces, bowl sizes, ingredients, and similar restaurant meals.",icon:"compare"},
  {slug:"meal-comparisons",name:"Meal Comparisons",parent:"comparisons",url:"/blog/comparisons/meal-comparisons/",description:"Compare BIBIBOP proteins, bases, sauces, toppings, bowl sizes, and complete meal combinations.",introduction:"Review nutrition comparisons between BIBIBOP ingredients, bowl components, serving formats, and complete meal combinations.",metaTitle:"BIBIBOP Meal Comparisons: Ingredients, Bowls and Nutrition",metaDescription:"Compare BIBIBOP ingredients, proteins, bases, sauces, bowl sizes, and complete meals using published nutrition information.",icon:"bowl"},
  {slug:"restaurant-comparisons",name:"Restaurant Comparisons",parent:"comparisons",url:"/blog/comparisons/restaurant-comparisons/",description:"Compare BIBIBOP nutrition with similar restaurant meals using serving context and published menu data.",introduction:"Explore nutrition comparisons between BIBIBOP and similar restaurants with clear serving context and source-aware menu data.",metaTitle:"BIBIBOP Restaurant Comparisons: Nutrition and Menu Choices",metaDescription:"Compare BIBIBOP nutrition and menu choices with similar restaurants using published calories, macros, and serving information.",icon:"compare"},
];

export const blogCategoryBySlug=(slug:string)=>blogCategories.find(category=>category.slug===slug);
export const blogCategoryHref=(slug:BlogCategorySlug)=>blogCategoryBySlug(slug)!.url;
export const mainBlogCategories=blogCategories.filter((category):category is BlogCategory&{slug:MainBlogCategorySlug}=>category.parent===null);
export const comparisonChildCategories=blogCategories.filter((category):category is BlogCategory&{slug:ComparisonChildCategorySlug}=>category.parent==="comparisons");
export const archiveCategorySlugsForPrimary=(primary:BlogPrimaryCategorySlug):BlogCategorySlug[]=>{const category=blogCategoryBySlug(primary)!;return category.parent?[category.parent,primary]:[primary]};
export const postBelongsToArchive=(primary:BlogPrimaryCategorySlug,archive:BlogCategorySlug)=>archiveCategorySlugsForPrimary(primary).includes(archive);

type CategorizedPost={id:string;slug:string;primaryCategory:BlogPrimaryCategorySlug};
export const postsForBlogArchive=<T extends CategorizedPost>(posts:T[],archive:BlogCategorySlug)=>{const seen=new Set<string>();return posts.filter(post=>postBelongsToArchive(post.primaryCategory,archive)).filter(post=>{const key=post.id||post.slug;if(seen.has(key))return false;seen.add(key);return true})};
