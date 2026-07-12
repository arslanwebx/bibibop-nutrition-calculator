"use client";
import {useMemo,useState} from "react";
import {activityLabels,bmiCategory,bmiMetric,inchesToCm,poundsToKg,round,tdeeFromProfile,type ActivityLevel,type FormulaSex} from "@/lib/health-calculations";
import type {CalculatorSlug} from "@/data/health-calculators";

type UnitSystem="us"|"metric";
type Result={label:string;value:string;primary?:boolean};
const number=(value:string)=>Number(value)||0;

export default function HealthCalculator({type}:{type:CalculatorSlug}){
  const [units,setUnits]=useState<UnitSystem>("us");
  const [sex,setSex]=useState<FormulaSex>("male");const [age,setAge]=useState(30);const [weight,setWeight]=useState(165);const [height,setHeight]=useState(69);
  const [activity,setActivity]=useState<ActivityLevel>("moderate");const [goal,setGoal]=useState("maintain");
  const [calories,setCalories]=useState(2000);const [macroPlan,setMacroPlan]=useState("balanced");const [proteinFactor,setProteinFactor]=useState(0.8);
  const [carbPercent,setCarbPercent]=useState(50);const [fatPercent,setFatPercent]=useState(30);const [maintenance,setMaintenance]=useState(2200);const [deficit,setDeficit]=useState(500);
  const profileTypes=["calorie-calculator","tdee-calculator","bmr-calculator"] as CalculatorSlug[];
  const usesProfile=profileTypes.includes(type);const usesBody=usesProfile||type==="bmi-calculator"||type==="protein-calculator";
  const weightKg=units==="us"?poundsToKg(weight):weight;const heightCm=units==="us"?inchesToCm(height):height;
  const validBody=weightKg>0&&(!["protein-calculator"].includes(type)&&heightCm>0||type==="protein-calculator");
  const profile=useMemo(()=>tdeeFromProfile(weightKg,heightCm,age,sex,activity),[weightKg,heightCm,age,sex,activity]);
  const results=useMemo<Result[]>(()=>{
    if(usesBody&&!validBody||usesProfile&&(age<20||age>100))return[];
    if((["macro-calculator","carb-calculator","fat-intake-calculator"] as CalculatorSlug[]).includes(type)&&calories<=0)return[];
    if(type==="calorie-deficit-calculator"&&maintenance<=0)return[];
    if(type==="bmi-calculator"){const bmi=bmiMetric(weightKg,heightCm);return[{label:"Adult BMI",value:bmi.toFixed(1),primary:true},{label:"CDC screening category",value:bmiCategory(bmi)}]}
    if(type==="bmr-calculator")return[{label:"Estimated resting energy",value:`${round(profile.bmr).toLocaleString()} calories/day`,primary:true}];
    if(type==="tdee-calculator")return[{label:"Estimated TDEE",value:`${round(profile.tdee).toLocaleString()} calories/day`,primary:true},{label:"Estimated resting energy",value:`${round(profile.bmr).toLocaleString()} calories/day`},{label:"Activity multiplier",value:`${activityFactorsText(activity)}×`}];
    if(type==="calorie-calculator"){const adjustments:Record<string,number>={maintain:0,"lose-slow":-250,"lose":-500,"gain-slow":250};const target=profile.tdee+(adjustments[goal]??0);return[{label:"Daily calorie target",value:`${round(target).toLocaleString()} calories`,primary:true},{label:"Estimated maintenance",value:`${round(profile.tdee).toLocaleString()} calories/day`},{label:"Goal adjustment",value:`${(adjustments[goal]??0)>0?"+":""}${adjustments[goal]??0} calories/day`}];}
    if(type==="macro-calculator"){const plans:Record<string,[number,number,number]>={balanced:[30,40,30],amdr:[22.5,52.5,25],higherProtein:[35,35,30]};const [protein,carbs,fat]=plans[macroPlan]??plans.balanced;return[{label:"Protein",value:`${round(calories*protein/100/4)} g/day`,primary:true},{label:"Carbohydrate",value:`${round(calories*carbs/100/4)} g/day`},{label:"Fat",value:`${round(calories*fat/100/9)} g/day`},{label:"Selected split",value:`${protein}% / ${carbs}% / ${fat}%`}];}
    if(type==="protein-calculator")return[{label:"Estimated protein",value:`${round(weightKg*proteinFactor)} g/day`,primary:true},{label:"Body weight",value:`${weightKg.toFixed(1)} kg`},{label:"Selected factor",value:`${proteinFactor} g/kg/day`}];
    if(type==="carb-calculator")return[{label:"Carbohydrate",value:`${round(calories*carbPercent/100/4)} g/day`,primary:true},{label:"Calories from carbohydrate",value:`${round(calories*carbPercent/100).toLocaleString()} calories`},{label:"Selected share",value:`${carbPercent}% of daily calories`}];
    if(type==="fat-intake-calculator")return[{label:"Total fat",value:`${round(calories*fatPercent/100/9)} g/day`,primary:true},{label:"Calories from fat",value:`${round(calories*fatPercent/100).toLocaleString()} calories`},{label:"Selected share",value:`${fatPercent}% of daily calories`}];
    const target=Math.max(0,maintenance-deficit);return[{label:"Daily calorie target",value:`${round(target).toLocaleString()} calories`,primary:true},{label:"Maintenance entered",value:`${round(maintenance).toLocaleString()} calories/day`},{label:"Weekly energy deficit",value:`${round(deficit*7).toLocaleString()} calories`}];
  },[type,usesBody,validBody,weightKg,heightCm,profile,activity,goal,calories,macroPlan,proteinFactor,carbPercent,fatPercent,maintenance,deficit]);
  const goalAdjustment=({maintain:0,"lose-slow":-250,"lose":-500,"gain-slow":250} as Record<string,number>)[goal]??0;
  const lowTarget=type==="calorie-calculator"&&profile.tdee+goalAdjustment<1000||type==="calorie-deficit-calculator"&&maintenance-deficit<1000;
  const setUnitSystem=(next:UnitSystem)=>{if(next===units)return;if(next==="metric"){setWeight(Number(poundsToKg(weight).toFixed(1)));setHeight(Number(inchesToCm(height).toFixed(1)))}else{setWeight(Number((weight/0.45359237).toFixed(1)));setHeight(Number((height/2.54).toFixed(1)))}setUnits(next)};
  return <section className="health-calculator" aria-label={`${type.replaceAll("-"," ")} form`}>
    <div className="health-form">
      {usesBody&&<fieldset className="unit-toggle"><legend>Units</legend><label><input type="radio" checked={units==="us"} onChange={()=>setUnitSystem("us")}/> US units</label><label><input type="radio" checked={units==="metric"} onChange={()=>setUnitSystem("metric")}/> Metric</label></fieldset>}
      {usesProfile&&<div className="health-field-grid"><label>Equation sex coefficient<select value={sex} onChange={e=>setSex(e.target.value as FormulaSex)}><option value="male">Male (+5)</option><option value="female">Female (−161)</option></select></label><label>Age<input type="number" min="20" max="100" value={age} onChange={e=>setAge(number(e.target.value))}/></label></div>}
      {usesBody&&<div className="health-field-grid"><label>Weight ({units==="us"?"lb":"kg"})<input type="number" min="1" step="0.1" value={weight} onChange={e=>setWeight(number(e.target.value))}/></label>{type!=="protein-calculator"&&<label>Height ({units==="us"?"in":"cm"})<input type="number" min="1" step="0.1" value={height} onChange={e=>setHeight(number(e.target.value))}/></label>}</div>}
      {usesProfile&&<label className="health-field">Activity level<select value={activity} onChange={e=>setActivity(e.target.value as ActivityLevel)}>{Object.entries(activityLabels).map(([value,label])=><option value={value} key={value}>{label}</option>)}</select></label>}
      {type==="calorie-calculator"&&<label className="health-field">Goal<select value={goal} onChange={e=>setGoal(e.target.value)}><option value="maintain">Maintain weight</option><option value="lose-slow">Modest deficit, 250 calories/day</option><option value="lose">Standard deficit, 500 calories/day</option><option value="gain-slow">Modest surplus, 250 calories/day</option></select></label>}
      {type==="macro-calculator"&&<><label className="health-field">Daily calories<input type="number" min="1000" max="10000" step="50" value={calories} onChange={e=>setCalories(number(e.target.value))}/></label><label className="health-field">Macro split<select value={macroPlan} onChange={e=>setMacroPlan(e.target.value)}><option value="balanced">Balanced, 30% protein / 40% carbs / 30% fat</option><option value="amdr">AMDR midpoint, 22.5% / 52.5% / 25%</option><option value="higherProtein">Higher protein, 35% / 35% / 30%</option></select></label></>}
      {type==="protein-calculator"&&<label className="health-field">Protein factor<select value={proteinFactor} onChange={e=>setProteinFactor(number(e.target.value))}><option value="0.8">0.8 g/kg, adult RDA</option><option value="1">1.0 g/kg</option><option value="1.2">1.2 g/kg</option><option value="1.6">1.6 g/kg</option></select></label>}
      {type==="carb-calculator"&&<><label className="health-field">Daily calories<input type="number" min="1000" max="10000" step="50" value={calories} onChange={e=>setCalories(number(e.target.value))}/></label><label className="health-field">Calories from carbohydrate<select value={carbPercent} onChange={e=>setCarbPercent(number(e.target.value))}>{[45,50,55,60,65].map(value=><option value={value} key={value}>{value}%</option>)}</select></label></>}
      {type==="fat-intake-calculator"&&<><label className="health-field">Daily calories<input type="number" min="1000" max="10000" step="50" value={calories} onChange={e=>setCalories(number(e.target.value))}/></label><label className="health-field">Calories from fat<select value={fatPercent} onChange={e=>setFatPercent(number(e.target.value))}>{[20,25,30,35].map(value=><option value={value} key={value}>{value}%</option>)}</select></label></>}
      {type==="calorie-deficit-calculator"&&<><label className="health-field">Estimated maintenance calories<input type="number" min="1000" max="10000" step="50" value={maintenance} onChange={e=>setMaintenance(number(e.target.value))}/></label><label className="health-field">Daily calorie deficit<select value={deficit} onChange={e=>setDeficit(number(e.target.value))}><option value="250">250 calories</option><option value="500">500 calories</option><option value="750">750 calories</option></select></label></>}
      <p className="health-form-note">Results update instantly. Values stay in your browser and are not submitted.</p>
    </div>
    <aside className="health-results" aria-live="polite" aria-label="Calculator results"><p className="result-kicker">Estimated result</p>{results.length?<div className="health-result-list">{results.map(result=><div className={result.primary?"health-result primary":"health-result"} key={result.label}><span>{result.label}</span><strong>{result.value}</strong></div>)}</div>:<p>Enter valid adult values to see an estimate.</p>}{lowTarget&&<p className="health-low-warning"><strong>Very low target:</strong> This result is below 1,000 calories per day. Do not treat it as a routine self-directed target. Use qualified clinical guidance.</p>}<p className="health-caution">This educational estimate is not a diagnosis or an individualized nutrition prescription. Needs can differ with pregnancy, growth, medications, health conditions, and athletic training.</p></aside>
  </section>
}

function activityFactorsText(activity:ActivityLevel){return({sedentary:1.2,light:1.375,moderate:1.55,very:1.725,extra:1.9})[activity]}
