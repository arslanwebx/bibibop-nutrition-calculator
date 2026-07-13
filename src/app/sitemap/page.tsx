import type {Metadata} from "next";
import Link from "next/link";
import PageShell from "@/components/content/PageShell";
import {allHumanRoutes} from "@/config/site";

export const metadata:Metadata={title:"Sitemap",description:"A human-readable directory of every public page on this website.",alternates:{canonical:"/sitemap/"}};
const names:Record<string,string>={
  "/":"BIBIBOP Nutrition Calculator",
  "/bibibop-nutrition-facts/":"BIBIBOP Nutrition Facts And Menu Calories",
  "/blog/":"Nutrition Guides",
  "/nutrition-calculators/":"Nutrition Calculators",
  "/nutrition-calculators/calorie-calculator/":"Calorie Calculator",
  "/nutrition-calculators/macro-calculator/":"Macro Calculator",
  "/nutrition-calculators/protein-calculator/":"Protein Calculator",
  "/nutrition-calculators/carb-calculator/":"Carbohydrate Calculator",
  "/nutrition-calculators/fat-intake-calculator/":"Fat Intake Calculator",
  "/nutrition-calculators/tdee-calculator/":"TDEE Calculator",
  "/nutrition-calculators/bmr-calculator/":"BMR Calculator",
  "/nutrition-calculators/bmi-calculator/":"BMI Calculator",
  "/nutrition-calculators/calorie-deficit-calculator/":"Calorie Deficit Calculator",
  "/about/":"About","/contact/":"Contact","/editorial-policy/":"Editorial Policy","/corrections-policy/":"Corrections Policy","/privacy-policy/":"Privacy Policy","/cookie-policy/":"Cookie Policy","/terms/":"Terms Of Use","/medical-disclaimer/":"Medical Disclaimer","/trademark-disclaimer/":"Trademark Disclaimer","/advertising-disclosure/":"Advertising Disclosure","/accessibility/":"Accessibility","/author/m-arslan/":"M. Arsalan - Author","/sitemap/":"Sitemap",
};

export default function Page(){return <PageShell title="Sitemap" description="Browse calculators, source documentation, contact options, and site policies."><ul>{allHumanRoutes.map(route=><li key={route}><Link href={route}>{names[route]}</Link></li>)}</ul><p>The empty Nutrition Guides archive appears here for people but remains excluded from the XML sitemap while it is set to noindex.</p></PageShell>}
