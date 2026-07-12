import { siteConfig } from "../config/site.ts";

export const nutritionCategories = ["bases", "proteins", "hot-toppings", "cold-toppings", "sauces", "sides", "desserts", "coke-beverages", "teas-lemonades", "honest-kids", "kombucha"] as const;
export type NutritionCategory = typeof nutritionCategories[number];
export type Qualifier = "exact" | "less-than" | "not-available";
export type NumericToken = { display: string; value: number | null; qualifier: Qualifier };
export type AllergenKey = "wheatGluten" | "dairy" | "eggs" | "soy" | "sesame" | "fishShellfish" | "peanuts" | "treeNuts" | "allium" | "msg";
export type NutritionItem = {
  id: string; name: string; aliases?: string[]; category: NutritionCategory; portion: string;
  nutrients: { calories: NumericToken; caloriesFromFat: NumericToken; fatG: NumericToken; saturatedFatG: NumericToken; transFatG: NumericToken; cholesterolMg: NumericToken; sodiumMg: NumericToken; carbsG: NumericToken; fiberG: NumericToken; sugarsG: NumericToken; proteinG: NumericToken };
  allergens: Partial<Record<AllergenKey, boolean>>;
  allergenDataStatus: "listed" | "missing-from-official-matrix" | "not-provided-for-category";
  vegan: boolean | null;
  source: { url: string; version: string };
  notes?: string[];
};

const t = (display: string | number): NumericToken => {
  const s = String(display);
  if (s === "N/A") return { display: s, value: null, qualifier: "not-available" };
  if (s.startsWith("<")) return { display: s, value: 0.5, qualifier: "less-than" };
  return { display: s, value: Number(s), qualifier: "exact" };
};
type Row = [string, string, NutritionCategory, string, ...(string | number)[]];
const rows: Row[] = [
  ["citrus-honey-kale", "Citrus Honey Kale", "bases", "2.5 oz",100,50,6,0.5,0,0,70,11,4,8,3],
  ["crispy-romaine", "Crispy Romaine", "bases", "2.5 oz",45,30,3.5,0,0,0,10,4,2,1,1],
  ["lemon-turmeric-rice", "Lemon Turmeric Rice", "bases", "5 oz",290,30,3.5,0,0,0,1490,60,"<1",0,6],
  ["purple-rice", "Purple Rice", "bases", "5 oz",170,0,0,0,0,0,0,38,1,0,4],
  ["sweet-potato-noodles", "Sweet Potato Noodles", "bases", "6 oz",300,50,6,0.5,0,0,1090,55,3,7,6],
  ["white-rice", "White Rice", "bases", "5 oz",180,0,0,0,0,0,210,40,"<1",0,4],
  ["chicken", "Chicken", "proteins", "4 oz",170,50,6,1,0,85,750,10,"<1",8,20],
  ["korean-bbq-beef", "Korean BBQ Beef", "proteins", "4 oz",160,45,6,0,0,40,700,13,0,10,14],
  ["korean-crispy-chicken", "Korean Crispy Chicken", "proteins", "5 oz",160,25,3,0,0,85,230,45,0,0,27],
  ["miso-glazed-salmon", "Miso Glazed Salmon", "proteins", "4 oz",250,130,14,3,0,50,590,8,0,7,20],
  ["spicy-chicken", "Spicy Chicken", "proteins", "4 oz",230,100,11,2.5,0,60,730,8,"<1",7,20],
  ["steak", "Steak", "proteins", "4 oz",230,80,9,3,0,85,260,5,0,5,29],
  ["tofu", "Tofu", "proteins", "4 oz",150,90,10,1,0,0,250,8,"<1",5,10],
  ["bean-sprouts", "Bean Sprouts", "hot-toppings", "2 oz",30,10,1.5,0,0,0,170,3,"<1",2,2],
  ["black-beans", "Black Beans", "hot-toppings", "2 oz",45,5,"<1",0,0,0,150,9,2,4,2],
  ["curry-chickpeas", "Curry Chickpeas", "hot-toppings", "1.5 oz",45,10,1.5,1,0,0,90,6,2,0,2],
  ["potatoes", "Potatoes", "hot-toppings", "3 oz",90,10,1.5,0,0,0,640,18,2,"<1",2],
  ["roasted-brussels-sprouts", "Roasted Brussels Sprouts", "hot-toppings", "2 oz",40,15,2,0,0,0,190,6,2,2,2],
  ["roasted-sesame-broccoli", "Roasted Sesame Broccoli", "hot-toppings", "2 oz",60,45,5,"<1",0,0,170,4,1,"<1",2],
  ["avocado", "Avocado", "cold-toppings", "1.5 oz",80,60,7,1,0,0,55,4,3,0,"<1"],
  ["carrots", "Carrots", "cold-toppings", "0.9 oz",15,5,0.5,0,0,0,100,2,"<1","<1",0],
  ["cheese", "Cheese", "cold-toppings", "0.88 oz",90,70,8,5,0,20,150,0,0,0,6],
  ["cucumbers", "Cucumbers", "cold-toppings", "1 oz",0,0,0,0,0,0,0,1,0,0,0],
  ["corn", "Corn", "cold-toppings", "0.8 oz",20,0,0,0,0,0,65,4,0,1,"<1"],
  ["eggs", "Eggs", "cold-toppings", "0.9 oz",40,20,2.5,1,0,95,35,0,0,0,3],
  ["honey-citrus-kale", "Honey Citrus Kale", "cold-toppings", "0.3 oz",10,0,0,0,0,0,5,"<1",0,"<1",0],
  ["kimchi-topping", "Kimchi", "cold-toppings", "1 oz",10,0,0,0,0,0,270,3,1,2,0],
  ["pickled-red-onion", "Pickled Red Onion", "cold-toppings", "0.75 oz",15,0,0,0,0,0,5,3,0,3,0],
  ["pineapple-topping", "Pineapple", "cold-toppings", "3 oz",45,0,0,0,0,0,0,11,1,8,0],
  ["yum-yum", "Yum Yum", "sauces", "1 fl oz",140,135,15,2.5,0,10,220,2,0,2,0],
  ["teriyaki", "Teriyaki", "sauces", "1 fl oz",70,0,0,0,0,0,700,15,0,14,1],
  ["gochujang", "Gochujang", "sauces", "1 fl oz",70,9,1,0,0,0,640,14,1,10,1],
  ["spicy-sriracha", "Spicy Sriracha", "sauces", "1 fl oz",25,4.5,0.5,"<1",0,0,420,5,0,3,0],
  ["sesame-ginger", "Sesame Ginger", "sauces", "1 fl oz",100,63,7,1,0,0,450,7,0,6,1],
  ["sesame-oil", "Sesame Oil", "sauces", "0.25 fl oz",70,65,7,1,0,0,0,0,0,0,0],
  ["kimchi-side", "Kimchi", "sides", "3.5 oz",30,0,0,0,0,0,715,5,2,1,1],
  ["miso-soup", "Miso Soup", "sides", "6 oz",25,7,1,0,0,0,290,3,"<1","<1",2],
  ["pineapple-side", "Pineapple", "sides", "3.5 oz",60,0,0,0,0,0,0,6.3,"<1",6.3,"<1"],
  ["purple-rice-side", "Purple Rice Side", "sides", "6 oz",230,0,0,0,0,0,0,51,2,0,5],
  ["white-rice-side", "White Rice Side", "sides", "6 oz",270,0,0,0,0,0,0,61,2,0,5],
  ["noodles-side", "Noodles Side", "sides", "6 oz",210,35,4,0,0,0,310,42,"<1",3,"<1"],
  ["chocolate-chip-cookie", "Chocolate Chip Cookie", "desserts", "Not stated in PDF",380,170,19,8,0,30,210,54,3,33,4],
  ["snickerdoodle-cookie", "Snickerdoodle Cookie", "desserts", "Not stated in PDF",380,150,17,6,0,35,270,55,2,28,3],
  ["coca-cola-classic", "Coca-Cola Classic", "coke-beverages", "20 fl oz cup; 1/3 cup ice",220,0,0,0,0,0,55,55,0,55,0],
  ["diet-coca-cola", "Diet Coca-Cola", "coke-beverages", "20 fl oz cup; 1/3 cup ice",0,0,0,0,0,0,70,0,0,0,0],
  ["coca-cola-zero-sugar", "Coca-Cola Zero Sugar", "coke-beverages", "20 fl oz cup; 1/3 cup ice",0,0,0,0,0,0,0,0,0,0,0],
  ["coca-cola-cherry", "Coca-Cola Cherry", "coke-beverages", "20 fl oz cup; 1/3 cup ice",150,0,0,0,0,0,35,42,0,42,0],
  ["sprite", "Sprite", "coke-beverages", "20 fl oz cup; 1/3 cup ice",210,0,0,0,0,0,95,50,0,50,0],
  ["fanta-orange", "Fanta Orange", "coke-beverages", "20 fl oz cup; 1/3 cup ice",220,0,0,0,0,0,55,56,0,55,0],
  ["barqs-root-beer", "Barq's Root Beer", "coke-beverages", "20 fl oz cup; 1/3 cup ice",240,0,0,0,0,0,75,60,0,60,0],
  ["vitamin-water-xxx", "Vitamin Water XXX", "coke-beverages", "20 fl oz cup; 1/3 cup ice",60,0,0,0,0,0,0,20,0,19,0],
  ["hi-c-flashin-fruit-punch", "Hi-C Flashin' Fruit Punch", "coke-beverages", "20 fl oz cup; 1/3 cup ice",210,0,0,0,0,0,100,59,0,57,0],
  ["dr-pepper", "Dr Pepper", "coke-beverages", "20 fl oz cup; 1/3 cup ice",200,0,0,0,0,0,60,54,0,53,0],
  ["lemonade", "Lemonade", "teas-lemonades", "20 fl oz cup; 1/3 cup ice",210,0,0,0,0,0,0,54,0,52,0],
  ["passion-fruit-lemonade", "Passion Fruit Lemonade", "teas-lemonades", "20 fl oz cup; 1/3 cup ice",190,0,0,0,0,0,0,48,0,46,0],
  ["black-current-tea", "Black Current Tea", "teas-lemonades", "20 fl oz cup; 1/3 cup ice",0,0,0,0,0,0,0,0,0,0,0],
  ["sweetened-green-tea", "Sweetened Green Tea", "teas-lemonades", "20 fl oz cup; 1/3 cup ice",110,0,0,0,0,0,0,29,0,29,0],
  ["mixed-berry-omija-tea", "Mixed Berry Omija Tea", "teas-lemonades", "20 fl oz cup; 1/3 cup ice",120,0,0,0,0,0,0,32,0,31,0],
  ["honest-kids-appley-ever-after", "Honest Kids Appley Ever After", "honest-kids", "Not stated in PDF",35,0,0,0,0,0,15,9,0,8,0],
  ["honest-kids-super-fruit-punch", "Honest Kids Super Fruit Punch", "honest-kids", "Not stated in PDF",35,0,0,0,0,0,15,8,0,8,0],
  ["kombucha-ginger-lemon", "Kombucha - Ginger Lemon", "kombucha", "Not stated in PDF",50,0,0,0,0,"N/A",0,10,"N/A",10,0],
  ["kombucha-passionfruit-tangerine", "Kombucha - Passionfruit-Tangerine", "kombucha", "Not stated in PDF",50,0,0,0,0,"N/A",0,12,"N/A",11,0],
];

const allergenSets: Record<string, AllergenKey[]> = {
  "sweet-potato-noodles": ["soy","sesame","allium"],
  chicken:["soy","sesame","allium"], "korean-bbq-beef":["soy","sesame","allium"], "korean-crispy-chicken":["soy","sesame","allium"],
  "miso-glazed-salmon":["soy","sesame","fishShellfish","allium"], "spicy-chicken":["soy","sesame","allium"], steak:["soy","sesame","allium"], tofu:["soy","sesame","allium"],
  "bean-sprouts":["allium"], "curry-chickpeas":["treeNuts","allium"], potatoes:["allium"], "roasted-brussels-sprouts":["soy","allium"], "roasted-sesame-broccoli":["sesame"],
  carrots:["sesame"], cheese:["dairy"], eggs:["eggs"], "kimchi-topping":["allium"],
  "yum-yum":["dairy","eggs","soy","allium"], teriyaki:["soy","allium"], gochujang:["soy","sesame"], "spicy-sriracha":["soy","sesame","allium"], "sesame-ginger":["soy","sesame","allium"], "sesame-oil":["sesame"],
  "kimchi-side":["allium"], "miso-soup":["soy","fishShellfish","allium"], "noodles-side":["soy","sesame","allium"],
  "chocolate-chip-cookie":["eggs","soy"], "snickerdoodle-cookie":["eggs","soy"],
};
const veganIds = new Set(["crispy-romaine","lemon-turmeric-rice","purple-rice","sweet-potato-noodles","white-rice","tofu","bean-sprouts","black-beans","curry-chickpeas","potatoes","roasted-brussels-sprouts","roasted-sesame-broccoli","avocado","carrots","corn","kimchi-topping","pickled-red-onion","pineapple-topping","teriyaki","gochujang","spicy-sriracha","sesame-ginger","sesame-oil","kimchi-side","pineapple-side","purple-rice-side","white-rice-side","noodles-side"]);
const notListed = new Set(["cucumbers","honey-citrus-kale"]);

export const nutritionItems: NutritionItem[] = rows.map(([id,name,category,portion,...v]) => ({
  id, name, category, portion,
  aliases: id === "black-current-tea" ? ["Black Currant Tea"] : undefined,
  nutrients: { calories:t(v[0]), caloriesFromFat:t(v[1]), fatG:t(v[2]), saturatedFatG:t(v[3]), transFatG:t(v[4]), cholesterolMg:t(v[5]), sodiumMg:t(v[6]), carbsG:t(v[7]), fiberG:t(v[8]), sugarsG:t(v[9]), proteinG:t(v[10]) },
  allergens: Object.fromEntries((allergenSets[id] ?? []).map((key) => [key,true])),
  allergenDataStatus: notListed.has(id) ? "missing-from-official-matrix" : (["coke-beverages","teas-lemonades","honest-kids","kombucha"].includes(category) ? "not-provided-for-category" : "listed"),
  vegan: (["coke-beverages","teas-lemonades","honest-kids","kombucha"].includes(category) || notListed.has(id)) ? null : veganIds.has(id),
  source: { url: siteConfig.source.pdfUrl, version: siteConfig.source.version },
  notes: id === "black-current-tea" ? ["Official PDF spelling retained; commonly searched as Black Currant Tea."] : undefined,
}));

export const categoryLabels: Record<NutritionCategory,string> = {
  bases:"Bases", proteins:"Proteins", "hot-toppings":"Hot toppings", "cold-toppings":"Cold toppings", sauces:"Sauces", sides:"Sides", desserts:"Desserts", "coke-beverages":"Coke beverages", "teas-lemonades":"Teas and lemonades", "honest-kids":"Honest Kids juice", kombucha:"Health-Ade kombucha",
};
