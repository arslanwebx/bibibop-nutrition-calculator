export const calculatorTools = [
  {slug:"calorie-calculator",name:"Calorie Calculator",shortDescription:"Estimate maintenance calories and a practical daily calorie target for your selected goal."},
  {slug:"macro-calculator",name:"Macro Calculator",shortDescription:"Convert a daily calorie target into protein, carbohydrate, and fat grams."},
  {slug:"protein-calculator",name:"Protein Calculator",shortDescription:"Estimate daily protein from body weight and a clearly labeled intake factor."},
  {slug:"carb-calculator",name:"Carbohydrate Calculator",shortDescription:"Turn a carbohydrate percentage into daily grams and calories."},
  {slug:"fat-intake-calculator",name:"Fat Intake Calculator",shortDescription:"Estimate daily fat grams from calories and a chosen percentage."},
  {slug:"tdee-calculator",name:"TDEE Calculator",shortDescription:"Estimate total daily energy expenditure from resting energy and activity."},
  {slug:"bmr-calculator",name:"BMR Calculator",shortDescription:"Estimate resting daily energy needs with the Mifflin–St Jeor equation."},
  {slug:"bmi-calculator",name:"BMI Calculator",shortDescription:"Calculate adult BMI and view the corresponding CDC screening category."},
  {slug:"calorie-deficit-calculator",name:"Calorie Deficit Calculator",shortDescription:"Subtract a selected energy deficit from estimated maintenance calories."},
] as const;

export type CalculatorSlug = typeof calculatorTools[number]["slug"];
export const calculatorBasePath = "/nutrition-calculators";
export const calculatorHref = (slug:CalculatorSlug) => `${calculatorBasePath}/${slug}/`;
export const calculatorBySlug = Object.fromEntries(calculatorTools.map(tool=>[tool.slug,tool])) as Record<CalculatorSlug,typeof calculatorTools[number]>;
