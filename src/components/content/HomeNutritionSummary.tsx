import Link from "next/link";
import {nutritionItems,type NutritionCategory,type NutritionItem} from "@/data/bibibop-nutrition";

type SummaryGroup={label:string;categories:NutritionCategory[]};

const groups:SummaryGroup[]=[
  {label:"Bases",categories:["bases"]},
  {label:"Proteins",categories:["proteins"]},
  {label:"Toppings",categories:["hot-toppings","cold-toppings"]},
  {label:"Sauces",categories:["sauces"]},
  {label:"Sides",categories:["sides"]},
  {label:"Desserts",categories:["desserts"]},
  {label:"Beverages",categories:["coke-beverages","teas-lemonades","honest-kids","kombucha"]},
];

const numeric=(item:NutritionItem,key:"calories"|"proteinG")=>item.nutrients[key].value??0;

export default function HomeNutritionSummary(){return <div className="home-nutrition-summary"><div className="table-wrap"><table className="category-summary-table"><caption>Summary of the 62-item BIBIBOP nutrition database by menu category.</caption><thead><tr><th scope="col">Category</th><th scope="col">Items</th><th scope="col">Calorie range</th><th scope="col">Highest listed protein</th></tr></thead><tbody>{groups.map(group=>{const items=nutritionItems.filter(item=>group.categories.includes(item.category));const calories=items.map(item=>numeric(item,"calories"));const highestProtein=[...items].sort((a,b)=>numeric(b,"proteinG")-numeric(a,"proteinG"))[0];return <tr key={group.label}><th scope="row">{group.label}</th><td>{items.length}</td><td>{Math.min(...calories)}–{Math.max(...calories)} cal</td><td>{highestProtein.name}, {highestProtein.nutrients.proteinG.display} g</td></tr>})}</tbody></table></div><div className="summary-database-link"><Link className="button-secondary" href="/bibibop-nutrition-facts/">Search all 62 nutrition items <span aria-hidden="true">→</span></Link></div></div>}
