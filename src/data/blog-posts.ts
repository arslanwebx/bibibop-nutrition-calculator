import {blogCategorySlugs,type BlogPrimaryCategorySlug} from "@/data/blog-categories";

export type BlogImage={src:string;alt:string;width:number;height:number;caption?:string};
export type BlogFaq={question:string;answer:string};
export type BlogTocItem={id:string;label:string};
export type BlogPostSummary={
  id:string;
  slug:string;
  title:string;
  seoTitle:string;
  metaDescription:string;
  description:string;
  excerpt:string;
  publishedDate:string;
  updatedDate?:string;
  dataSourceDate?:string;
  authorSlug:"m-arslan";
  primaryCategory:BlogPrimaryCategorySlug;
  featuredImage:BlogImage;
  inlineImages:BlogImage[];
  relatedSlugs:string[];
  toc:BlogTocItem[];
  faq:BlogFaq[];
};

export const blogArticleHref=(slug:string)=>`/blog/${slug}/` as const;
export const blogPostBySlug=(slug:string)=>blogPosts.find(post=>post.slug===slug);

export const blogPosts:BlogPostSummary[]=[
  {
    id:"bibibop-calories-nutrition-guide",slug:"bibibop-calories-and-nutrition-guide/".slice(0,-1),
    title:"BIBIBOP Calories and Nutrition Guide",seoTitle:"BIBIBOP Calories and Nutrition Guide (2026)",
    metaDescription:"Understand BIBIBOP calories, macros, sodium, serving sizes, allergens, and custom bowl totals using current official nutrition information.",description:"A source-aware guide to BIBIBOP calories, macros, sodium, portions, and complete bowl totals.",
    excerpt:"A source-aware guide to building and interpreting a BIBIBOP bowl total, from the base and protein to sauces, sides, and drinks.",
    publishedDate:"2026-07-10",updatedDate:"2026-07-14",dataSourceDate:"2026-04-23",authorSlug:"m-arslan",primaryCategory:"nutrition-guides",
    featuredImage:{src:"/blog/bibibop-calories-nutrition-guide.webp",alt:"Illustrated customizable bowl beside four abstract nutrition metric cards",width:1200,height:675},
    inlineImages:[
      {src:"/blog/bowl-total-layers.svg",alt:"Diagram showing how a base, protein, toppings, sauce, and extras combine into one bowl total",width:1000,height:560,caption:"A bowl total is the sum of every selected portion, not a fixed menu number."},
      {src:"/blog/portion-source-check.svg",alt:"Three-step diagram for checking serving size, source version, and calculated total",width:1000,height:560,caption:"Serving size and source date should be checked before two totals are compared."},
    ],
    relatedSlugs:["bibibop-proteins-compared","bibibop-menu-first-time-ordering-guide","calories-vs-macros-restaurant-bowl"],
    toc:[{id:"quick-answer",label:"Quick answer"},{id:"how-totals-work",label:"How totals work"},{id:"sample-bowl",label:"Sample bowl"},{id:"nutrients",label:"Calories, macros, and sodium"},{id:"allergens",label:"Allergens and dietary flags"},{id:"data-limits",label:"Data limitations"},{id:"faq",label:"FAQs"}],
    faq:[
      {question:"How many calories are in a BIBIBOP bowl?",answer:"There is no single calorie number for every BIBIBOP bowl. The total depends on the bowl size and each selected base, protein, topping, sauce, side, and drink portion."},
      {question:"Does the BIBIBOP nutrition PDF show Original Bowl portions?",answer:"The April 23, 2026 PDF lists ingredient portions and states that BIBICUP base calories use half portions. Check the note and portion beside each ingredient before comparing it with an older sheet."},
      {question:"Which part of a BIBIBOP bowl changes calories the most?",answer:"The base, protein, and sauce often create the largest shifts because their listed portions contain more calories than most individual vegetable toppings. The exact effect depends on the selected items."},
      {question:"Can the calculator guarantee an exact restaurant serving?",answer:"No. It adds the published values for selected portions. Hand preparation, ingredient substitutions, recipe changes, and serving variation can make an actual order differ."},
      {question:"Is the nutrition calculator medical advice?",answer:"No. It is an informational calculation tool. People managing a medical condition or food allergy should use appropriate professional guidance and verify current information with the restaurant."},
    ],
  },
  {
    id:"bibibop-menu-first-time-ordering-guide",slug:"bibibop-menu-first-time-ordering-guide",
    title:"BIBIBOP Menu Explained: A First-Time Ordering Guide",seoTitle:"BIBIBOP Menu Explained: First-Time Ordering Guide",
    metaDescription:"Learn how to order at BIBIBOP step by step, including bowl size, bases, proteins, toppings, sauces, sides, and allergen questions.",description:"A practical first-time walkthrough of the BIBIBOP ordering line and its major choices.",
    excerpt:"A practical walkthrough of the BIBIBOP ordering line, with clear choices for texture, flavor, dietary needs, and first-time combinations.",
    publishedDate:"2026-07-11",updatedDate:"2026-07-14",dataSourceDate:"2026-07-14",authorSlug:"m-arslan",primaryCategory:"ordering-guides",
    featuredImage:{src:"/blog/bibibop-first-time-ordering.webp",alt:"Five illustrated stages showing a bowl built from base through sauce",width:1200,height:675},
    inlineImages:[
      {src:"/blog/ordering-line-map.svg",alt:"Ordering flow from bowl format to base, protein, toppings, sauce, and sides",width:1000,height:560,caption:"Deciding on a base and protein first makes the rest of the line easier."},
      {src:"/blog/flavor-texture-map.svg",alt:"Flavor and texture map grouping fresh, savory, spicy, creamy, and crunchy bowl elements",width:1000,height:560,caption:"Use contrast, such as a fresh base with a warm protein and one bold sauce, to make a bowl feel intentional."},
    ],
    relatedSlugs:["bibibop-calories-and-nutrition-guide","bibibop-proteins-compared"],
    toc:[{id:"order-sequence",label:"The ordering sequence"},{id:"choose-format",label:"Choose a format"},{id:"bases",label:"Pick a base"},{id:"proteins",label:"Choose a protein"},{id:"toppings-sauces",label:"Toppings and sauces"},{id:"example-orders",label:"Example orders"},{id:"allergy-check",label:"Dietary and allergy checks"},{id:"faq",label:"FAQs"}],
    faq:[
      {question:"What do you choose first at BIBIBOP?",answer:"Start with the bowl format and base. Then choose a protein, hot and cold toppings, and a sauce. Sides and drinks are separate decisions."},
      {question:"Can a BIBIBOP bowl use more than one base?",answer:"Availability and ordering options can vary, but customizable bowl formats may allow a combination. Ask the restaurant how a split base affects portions before assuming it equals two full servings."},
      {question:"Which sauce is mild for a first BIBIBOP order?",answer:"Flavor and heat tolerance are personal. Yum Yum is described as creamy, while Teriyaki is sweet and savory. Ask for sauce on the side if you want to control intensity and quantity."},
      {question:"Does BIBIBOP have a plant-based protein?",answer:"The current official nutrition materials list tofu as vegan friendly. Confirm current availability and review the allergen matrix because tofu is listed with soy, sesame, and allium."},
      {question:"Should someone with an allergy rely only on the menu line?",answer:"No. Review the current official allergen information and speak directly with restaurant staff. Shared preparation and substitutions can create risks that a general ordering guide cannot resolve."},
    ],
  },
  {
    id:"calories-vs-macros-restaurant-bowl",slug:"calories-vs-macros-restaurant-bowl",
    title:"Calories vs. Macros: What to Compare in a Restaurant Bowl",seoTitle:"Calories vs. Macros in a Restaurant Bowl",
    metaDescription:"Compare calories, protein, carbohydrates, fat, and fiber in customizable restaurant bowls without losing serving-size context.",description:"A clear framework for comparing calories, macros, fiber, portions, and sodium in restaurant bowls.",
    excerpt:"A plain-language framework for comparing restaurant bowls that separates total energy from protein, carbohydrate, fat, fiber, and portion context.",
    publishedDate:"2026-07-12",updatedDate:"2026-07-14",dataSourceDate:"2026-07-14",authorSlug:"m-arslan",primaryCategory:"nutrition-education",
    featuredImage:{src:"/blog/calories-vs-macros.webp",alt:"Restaurant bowl surrounded by abstract symbols for calories, protein, carbohydrates, and fat",width:1200,height:675},
    inlineImages:[
      {src:"/blog/calorie-macro-relationship.svg",alt:"Diagram showing calories as total energy and macros as protein, carbohydrate, and fat components",width:1000,height:560,caption:"Calories answer how much energy is listed; macros describe where much of that energy comes from."},
      {src:"/blog/equal-calorie-bowls.svg",alt:"Two equal-calorie bowl diagrams with different proportions of protein, carbohydrate, and fat",width:1000,height:560,caption:"Similar calorie totals can describe very different nutrient mixes."},
    ],
    relatedSlugs:["bibibop-calories-and-nutrition-guide","bibibop-proteins-compared","bibibop-vs-chipotle-nutrition-comparison"],
    toc:[{id:"difference",label:"Calories and macros"},{id:"equal-calories",label:"Equal calories, different meals"},{id:"protein-per-calorie",label:"Protein per calorie"},{id:"sauces-portions",label:"Sauces and portions"},{id:"comparison-method",label:"A comparison method"},{id:"limits",label:"Restaurant data limits"},{id:"faq",label:"FAQs"}],
    faq:[
      {question:"Are calories and macros the same thing?",answer:"No. Calories measure energy. Protein, carbohydrate, and fat are macronutrients that contribute energy and also describe the composition of the meal."},
      {question:"Can two bowls have the same calories but different macros?",answer:"Yes. One bowl may contain more protein and less fat, while another has more carbohydrate or fat, even when their rounded calorie totals are similar."},
      {question:"What does protein per calorie mean?",answer:"It is a comparison ratio calculated by dividing listed protein grams by listed calories. It can help compare protein density, but it does not measure overall meal quality or personal suitability."},
      {question:"Should fiber be counted as a macro?",answer:"Nutrition discussions often group carbohydrate, protein, and fat as macros. Fiber is a type of carbohydrate and is useful to compare separately when reliable restaurant data is available."},
      {question:"Why might calculated macro calories not equal the menu calorie total?",answer:"Restaurant values are rounded, fiber and sugar alcohol treatment can differ, and recipes or laboratory methods can introduce small discrepancies. Use the published calorie value rather than forcing the macro calculation to match exactly."},
    ],
  },
  {
    id:"bibibop-proteins-compared",slug:"bibibop-proteins-compared",
    title:"BIBIBOP Proteins Compared",seoTitle:"BIBIBOP Proteins Compared: Calories, Protein and Sodium",
    metaDescription:"Compare all seven current BIBIBOP proteins by calories, protein, fat, carbohydrates, sodium, allergens, and listed portion.",description:"All seven current BIBIBOP proteins compared using the April 23, 2026 official nutrition sheet.",
    excerpt:"A side-by-side comparison of the seven proteins in BIBIBOP’s April 2026 nutrition sheet, with practical tradeoffs instead of one universal winner.",
    publishedDate:"2026-07-13",updatedDate:"2026-07-14",dataSourceDate:"2026-04-23",authorSlug:"m-arslan",primaryCategory:"meal-comparisons",
    featuredImage:{src:"/blog/bibibop-proteins-compared.webp",alt:"Seven illustrated protein dishes arranged evenly around a neutral comparison chart",width:1200,height:675},
    inlineImages:[
      {src:"/blog/protein-calorie-plot.svg",alt:"Plot comparing listed calories and protein grams for seven BIBIBOP proteins",width:1000,height:560,caption:"Chicken and spicy chicken pair 25 grams of protein with 170 to 190 listed calories; the chart is based on the April 23, 2026 PDF."},
      {src:"/blog/protein-choice-path.svg",alt:"Decision path comparing higher protein, plant-based, lower listed calories, and lower listed sodium preferences",width:1000,height:560,caption:"The useful choice depends on the nutrient or dietary preference being prioritized."},
    ],
    relatedSlugs:["bibibop-calories-and-nutrition-guide","calories-vs-macros-restaurant-bowl","bibibop-menu-first-time-ordering-guide"],
    toc:[{id:"current-options",label:"Current protein options"},{id:"comparison-table",label:"Nutrition table"},{id:"higher-protein",label:"Higher-protein choices"},{id:"lower-calorie-sodium",label:"Calories and sodium"},{id:"plant-based-allergens",label:"Plant-based and allergens"},{id:"version-change",label:"Source-version changes"},{id:"faq",label:"FAQs"}],
    faq:[
      {question:"Which BIBIBOP protein has the most listed protein?",answer:"In the April 23, 2026 nutrition PDF, miso glazed salmon lists 27 grams of protein per 4-ounce portion, the highest of the seven proteins on that sheet."},
      {question:"Which BIBIBOP protein has the fewest listed calories?",answer:"Korean crispy chicken lists 140 calories per 5-ounce portion on the April 2026 sheet. Calories alone do not describe its sodium, protein, preparation, or overall bowl total."},
      {question:"Which current protein has the lowest listed sodium?",answer:"Tofu lists 300 milligrams of sodium per 4-ounce portion, the lowest value among the seven proteins in the April 2026 PDF."},
      {question:"Is tofu at BIBIBOP vegan?",answer:"The official allergen matrix marks tofu vegan friendly. It also lists soy, sesame, and allium, and restaurant cross-contact limitations still apply."},
      {question:"Why do some protein values differ from older BIBIBOP sheets?",answer:"Restaurant recipes, suppliers, testing, and portions can change. The April 2026 values differ materially from the September 2025 sheet used by this site’s current calculator, so values from the two versions should not be mixed."},
    ],
  },
  {
    id:"bibibop-vs-chipotle-nutrition-comparison",slug:"bibibop-vs-chipotle-nutrition-comparison",
    title:"BIBIBOP vs. Chipotle Nutrition Comparison",seoTitle:"BIBIBOP vs. Chipotle Nutrition: Data Comparison",
    metaDescription:"Compare BIBIBOP and Chipotle bowl nutrition fairly across bases, proteins, toppings, sauces, sodium, vegan choices, and allergen context.",description:"A neutral category-by-category comparison of BIBIBOP and Chipotle customizable bowls.",
    excerpt:"A neutral comparison of two customizable bowl formats, focused on equivalent categories, source transparency, portions, dietary options, and data limitations.",
    publishedDate:"2026-07-14",updatedDate:"2026-07-14",dataSourceDate:"2026-07-14",authorSlug:"m-arslan",primaryCategory:"restaurant-comparisons",
    featuredImage:{src:"/blog/bibibop-vs-chipotle.webp",alt:"Two equally sized customizable bowls separated by a balanced comparison scale",width:1200,height:675},
    inlineImages:[
      {src:"/blog/restaurant-bowl-category-map.svg",alt:"Side-by-side map aligning base, protein, vegetables, sauce, and extras across two restaurant bowls",width:1000,height:560,caption:"A fair comparison aligns the same meal-building roles before comparing totals."},
      {src:"/blog/portion-variability.svg",alt:"Diagram showing how recipe version, serving scoop, and selected extras change restaurant bowl totals",width:1000,height:560,caption:"Published totals are useful planning figures, not measurements of a specific hand-built bowl."},
    ],
    relatedSlugs:["calories-vs-macros-restaurant-bowl","bibibop-calories-and-nutrition-guide","bibibop-menu-first-time-ordering-guide"],
    toc:[{id:"fair-comparison",label:"How to compare fairly"},{id:"ordering-model",label:"Ordering models"},{id:"category-table",label:"Category comparison"},{id:"nutrition-context",label:"Calories, protein, and sodium"},{id:"dietary-allergen",label:"Dietary and allergen context"},{id:"data-transparency",label:"Data transparency"},{id:"which-fits",label:"Which may fit"},{id:"faq",label:"FAQs"}],
    faq:[
      {question:"Is BIBIBOP lower in calories than Chipotle?",answer:"Not automatically. Both restaurants allow many combinations, so calories depend on the chosen base, protein, toppings, sauces, extras, and portions. Compare complete builds rather than restaurant names."},
      {question:"Which restaurant has a vegan protein?",answer:"BIBIBOP lists tofu as vegan friendly, while Chipotle identifies Sofritas as vegan and vegetarian. Review each restaurant’s current ingredient and allergen information before ordering."},
      {question:"Can BIBIBOP and Chipotle bowl numbers be compared directly?",answer:"Only with care. Ingredient roles can be aligned, but recipes, serving sizes, source dates, and preparation differ. A category-matched comparison is more responsible than treating unlike items as equivalents."},
      {question:"Which restaurant provides better allergen information?",answer:"Both publish allergen guidance with different formats and limitations. The useful document depends on the allergen being checked, and neither publication can guarantee the absence of cross-contact in a restaurant."},
      {question:"Which restaurant is better for a high-protein bowl?",answer:"Either can produce a higher-protein order through protein selection and portion choices. Compare the complete order’s calories, sodium, and other ingredients rather than judging protein grams alone."},
    ],
  },
];

const reservedSlugs=new Set<string>(blogCategorySlugs);
const ids=new Set<string>();
const slugs=new Set<string>();
for(const post of blogPosts){
  if(reservedSlugs.has(post.slug))throw new Error(`Blog article slug conflicts with a category route: ${post.slug}`);
  if(ids.has(post.id))throw new Error(`Duplicate blog article ID: ${post.id}`);
  if(slugs.has(post.slug))throw new Error(`Duplicate blog article slug: ${post.slug}`);
  ids.add(post.id);slugs.add(post.slug);
}
