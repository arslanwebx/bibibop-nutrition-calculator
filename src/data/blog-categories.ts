export const blogCategorySlugs=["nutrition-guides","ordering-guides","nutrition-education","comparisons"] as const;
export type BlogCategorySlug=typeof blogCategorySlugs[number];

export type BlogCategory={
  slug:BlogCategorySlug;
  name:string;
  description:string;
  introduction:string;
  metaTitle:string;
  metaDescription:string;
  icon:"book"|"bowl"|"label"|"compare";
};

export const blogCategories:BlogCategory[]=[
  {slug:"nutrition-guides",name:"Nutrition Guides",description:"Detailed guides covering BIBIBOP calories, nutrients, ingredients, allergens, proteins, bases, sauces, toppings, and menu nutrition.",introduction:"Explore source-checked guides to BIBIBOP calories, nutrients, ingredients, allergens, proteins, bases, sauces, toppings, and menu nutrition.",metaTitle:"BIBIBOP Nutrition Guides: Calories, Ingredients and Allergens",metaDescription:"Explore BIBIBOP nutrition guides covering calories, ingredients, allergens, sauces, proteins, toppings, and menu nutrition.",icon:"book"},
  {slug:"ordering-guides",name:"Ordering Guides",description:"Practical advice for building and customizing BIBIBOP bowls based on taste, calories, protein, sodium, and dietary preferences.",introduction:"Find practical guidance for building and customizing BIBIBOP bowls around taste, calories, protein, sodium, and dietary preferences.",metaTitle:"BIBIBOP Ordering Guides: Build and Customize Your Bowl",metaDescription:"Learn how to order and customize BIBIBOP bowls based on calories, protein, sodium, taste, and dietary preferences.",icon:"bowl"},
  {slug:"nutrition-education",name:"Nutrition Education",description:"Simple explanations of calories, macros, nutrition labels, serving sizes, allergens, restaurant data, and meal calculations.",introduction:"Learn how calories, macros, serving sizes, nutrition labels, allergens, restaurant data, and meal calculations work in clear language.",metaTitle:"Nutrition Education: Calories, Macros and Restaurant Labels",metaDescription:"Understand calories, macros, serving sizes, nutrition labels, allergens, and restaurant nutrition calculations.",icon:"label"},
  {slug:"comparisons",name:"Comparisons",description:"Nutrition comparisons between BIBIBOP ingredients, proteins, bases, bowl sizes, sauces, and similar restaurants.",introduction:"Compare BIBIBOP proteins, bases, sauces, ingredients, bowl sizes, and similar restaurant meals using clearly stated serving information.",metaTitle:"BIBIBOP Nutrition Comparisons: Proteins, Bases and Bowls",metaDescription:"Compare BIBIBOP proteins, bases, sauces, bowl sizes, ingredients, and similar restaurant meals.",icon:"compare"},
];

export const blogCategoryBySlug=(slug:string)=>blogCategories.find(category=>category.slug===slug);
export const blogCategoryHref=(slug:BlogCategorySlug)=>`/blog/${slug}/` as const;
