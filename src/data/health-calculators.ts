export const calculatorTools = [
  {slug:"calorie-calculator",name:"Calorie Calculator",shortDescription:"Estimate maintenance calories and a practical daily calorie target for your selected goal."},
  {slug:"macro-calculator",name:"Macro Calculator",shortDescription:"Estimate calories and daily protein, carbohydrate, and fat grams from your profile, goal, or custom target."},
  {slug:"protein-calculator",name:"Protein Calculator",shortDescription:"Estimate a daily protein range from body weight, activity or goal, and preferred meal frequency."},
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
