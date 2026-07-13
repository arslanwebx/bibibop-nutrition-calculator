import Link from "next/link";
import {calculatorHref,calculatorTools,type CalculatorSlug} from "@/data/health-calculators";

const featured=calculatorTools.slice(0,6);

function ToolIcon({type}:{type:CalculatorSlug}){
  const paths:Record<CalculatorSlug,React.ReactNode>={
    "calorie-calculator":<path d="M27 8c2 9-8 11-8 22 0 7 5 12 13 12s13-5 13-13c0-7-5-13-11-19 1 8-5 11-7 15-2-6 2-10 0-17Zm5 29c-4 0-7-3-7-7 0-3 3-6 7-10 4 4 7 7 7 10 0 4-3 7-7 7Z"/>,
    "macro-calculator":<><path d="M30 7a23 23 0 1 0 17 39L30 30V7Z"/><path d="M35 7v18h18A23 23 0 0 0 35 7Zm0 23 14 14a22 22 0 0 0 4-14H35Z" opacity=".55"/></>,
    "protein-calculator":<path d="M17 43c-5-7-3-17 4-21l6-3 4-10c1-3 5-3 7-1 2 2 1 5-1 8l-3 5c8 0 15 4 15 12v10H17Zm8-14c-3 2-4 5-3 8h21v-4c0-4-4-6-9-6h-6l-3 2Z"/>,
    "carb-calculator":<path d="M29 53V29M29 39c-8 0-14-5-14-12 8 0 14 5 14 12Zm0-10c0-8 5-14 12-14 0 8-5 14-12 14Zm0 21c-8 0-14-5-14-12 8 0 14 5 14 12Zm0-10c0-8 5-14 12-14 0 8-5 14-12 14Z" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>,
    "fat-intake-calculator":<path d="M32 7c-3 7-14 18-14 29a14 14 0 0 0 28 0C46 25 35 14 32 7Zm0 35c-4 0-7-3-7-7 0-3 3-8 7-14 4 6 7 11 7 14 0 4-3 7-7 7Z"/>,
    "tdee-calculator":<path d="M35 5 13 34h16l-2 25 24-34H35V5Z"/>,
    "bmr-calculator":<path d="M8 31h11l5-10 8 22 6-13h18M14 12h36v40H14z" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>,
    "bmi-calculator":<><rect x="10" y="12" width="44" height="42" rx="7"/><path d="M23 26a9 9 0 0 1 18 0H23Zm9-5 5-4" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round"/></>,
    "calorie-deficit-calculator":<path d="M12 48h8V30h-8v18Zm16 0h8V16h-8v32Zm16 0h8V7h-8v41Z"/>
  };
  return <span className={`showcase-icon icon-${type}`}><svg viewBox="0 0 64 64" aria-hidden="true">{paths[type]}</svg></span>;
}

function ArrowIcon(){
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13m-5-5 5 5-5 5"/></svg>;
}

export default function CalculatorShowcase(){return <section className="tools-showcase" aria-labelledby="more-calculators-heading"><div className="shell"><div className="showcase-heading"><h2 id="more-calculators-heading">More Nutrition Calculators</h2><p>Use focused tools for calories, macros, protein, carbohydrates, fat, and daily energy needs.</p></div><div className="showcase-grid">{featured.map(tool=><Link className="showcase-card" href={calculatorHref(tool.slug)} key={tool.slug}><div className="showcase-card-title"><ToolIcon type={tool.slug}/><h3>{tool.name}</h3></div><p>{tool.shortDescription}</p><span className="showcase-arrow" aria-hidden="true"><ArrowIcon/></span></Link>)}</div><Link className="button-secondary showcase-all-link" href="/nutrition-calculators/">View all nutrition calculators <span className="showcase-all-arrow" aria-hidden="true"><ArrowIcon/></span></Link></div></section>}
